
# # Day 14 — Final Capstone: Integrating Storage, Auth, Security & Automation

**Goal:** Build a production-style environment that demonstrates LPIC-1/LPIC-2 competencies: Nginx with SSL, shared storage (NFS + Samba + autofs), LDAP auth, SSH hardening, firewall, fail2ban, GPG-encrypted automated backups, and robust Bash automation (cron + safe scripts).

What you’ll get in this document:

* Complete conceptual explanations for each area.
* Step-by-step commands (server & client).
* Example outputs and verification commands.
* Troubleshooting tips and best practices.
* Several production-ready Bash scripts (well documented).
* Cron examples to automate everything.
* A final integration checklist.

> NOTE: Run commands on **test VMs** first. Don’t blindly paste production firewall or iptables rules — adapt to your IPs and environment.

---

## Table of contents

1. File Services: NFS, Samba, autofs
2. Centralized Authentication: LDAP (OpenLDAP) — server & client basics
3. Mail basics (Postfix quick notes)
4. Firewall (ufw & firewalld) — policies and rules for services
5. SSH hardening & key management
6. Intrusion mitigation: fail2ban configuration & examples
7. Backups + Encryption (GPG) — secure automated backups
8. Advanced Bash scripting (production patterns)
9. Cron & task automation — safe scheduling patterns
10. Final Project: full integration plan + scripts + verification
11. Appendix: troubleshooting & references

---

## 1) File Services — NFS, Samba, autofs

### Why file services matter

* Shared storage is often required for web apps, backup targets, home directories, and cross-platform file sharing. NFS is native to UNIX/Linux for low-latency shares. Samba provides CIFS/SMB for Windows interoperability. autofs mounts on demand to save resources.

### A. NFS — concepts & modes

* **Server** exports directories via `/etc/exports`.
* **Client** mounts remote exports using `mount` or `autofs`.
* Options: `rw/ro`, `sync/async`, `no_root_squash`/`root_squash`, `subtree_check`/`no_subtree_check`, `proto=tcp|udp`, `noacl`.

#### 1. NFS server (example: Ubuntu/Debian)

```bash
# Install
sudo apt update
sudo apt install -y nfs-kernel-server

# Prepare export
sudo mkdir -p /srv/data
sudo chown nobody:nogroup /srv/data
sudo chmod 2775 /srv/data      # setgid so new files keep group

# Export to a network (example: 192.168.56.0/24)
echo "/srv/data 192.168.56.0/24(rw,sync,no_subtree_check)" | sudo tee -a /etc/exports

# Apply and show exported FS
sudo exportfs -rav
sudo exportfs -v
```

**Sample `exportfs -v` output**

```
/srv/data 192.168.56.0/24(rw,sync,no_subtree_check)
```

#### 2. NFS client

```bash
sudo apt install -y nfs-common
sudo mkdir -p /mnt/data
sudo mount -t nfs 192.168.56.101:/srv/data /mnt/data
mount | grep /mnt/data
```

**Sample mount output**

```
192.168.56.101:/srv/data on /mnt/data type nfs (rw,relatime,vers=4.2,...)
```

#### 3. Options explained (practical)

* `sync` — NFS server writes requests synchronously (safer, slower).
* `async` — faster but riskier on crashes.
* `no_root_squash` — maps root on client to root on server (dangerous). Prefer `root_squash` (default) to map to `nobody`.
* `no_subtree_check` — reduces server overhead when moving exported directories.

#### 4. Security & best practice

* Use `firewall` to allow NFS ports (2049 for NFSv4; for legacy, rpcbind uses dynamic ports).
* Prefer **NFSv4**; it is stateful and secures better. Export with `fsid=0` for root export if needed.
* Consider `idmapd`/Kerberos for authentication in bigger environments.

#### 5. Troubleshooting

* If mount fails: `sudo showmount -e 192.168.56.101` on client to list exports.
* Check server logs:`sudo journalctl -u nfs-server` or `/var/log/syslog`.
* `rpcinfo -p` shows rpc services.

---

### B. Samba — concepts & quick server

* Samba maps SMB/CIFS clients (Windows) to Unix shares. Two common modes: guest/public and authenticated.

#### 1. Install & basic public share (Ubuntu)

```bash
sudo apt install -y samba
sudo mkdir -p /srv/samba/share
sudo chown nobody:nogroup /srv/samba/share
sudo chmod 2775 /srv/samba/share

# Append share config
sudo tee -a /etc/samba/smb.conf <<'EOF'
[public]
   path = /srv/samba/share
   browsable = yes
   read only = no
   guest ok = yes
EOF

sudo systemctl restart smbd
```

**Access:** `\\192.168.56.101\public` from Windows Explorer.

#### 2. Authenticated Samba user

```bash
sudo useradd sambauser -M -s /sbin/nologin
sudo smbpasswd -a sambauser
sudo chown sambauser:sambauser /srv/samba/share
# In smb.conf for auth shares, remove guest ok and add valid users = sambauser
```

#### 3. Samba security tips

* Use `valid users` directive to restrict.
* Prefer SMB3 and encrypted transports for cross-network traffic.
* On mixed networks, map Unix permissions carefully; use `force user`/`force group` where appropriate.

---

### C. autofs — on-demand mounts

* autofs mounts export only on first access; reduces mounts and network traffic.

#### 1. Example autofs config

```bash
# install
sudo apt install -y autofs

# /etc/auto.master add:
# /- /etc/auto.direct

# /etc/auto.direct content:
# /mnt/data -fstype=nfs 192.168.56.101:/srv/data

sudo systemctl restart autofs
```

**Behavior:** When `/mnt/data` is accessed, autofs mounts `192.168.56.101:/srv/data` automatically. Use for many dynamic mounts or large federations.

---

## 2) Centralized Authentication — LDAP (OpenLDAP) basics

### Why LDAP?

* Centralized identity store — users and groups defined once, used across many servers.
* Common for `/home` automounting, authentication for services.

### A. Quick conceptual flow

* **OpenLDAP server (slapd)** stores directory tree (DNs).
* **Clients** use `nss_ldap`/`sssd` or `libnss-ldap` + PAM modules to allow login with LDAP credentials.
* For production, use TLS (LDAPS) or StartTLS to encrypt LDAP traffic.

### B. Minimal OpenLDAP server (concept)

On a server, `slapd` is configured with a suffix (e.g., `dc=example,dc=com`) and a root DN. Adding users is via `ldapadd` with LDIF.

**Example ldif to add a user**

```ldif
dn: uid=alice,ou=People,dc=example,dc=com
objectClass: inetOrgPerson
cn: Alice Example
sn: Example
uid: alice
userPassword: {SSHA}...hashed...
```

**Commands**

```bash
sudo apt install -y slapd ldap-utils
# Reconfigure or use debconf to set admin password
ldapadd -x -D "cn=admin,dc=example,dc=com" -W -f user.ldif
ldapsearch -x -b "dc=example,dc=com" "(uid=alice)"
```

**Sample `ldapsearch` output**

```
dn: uid=alice,ou=People,dc=example,dc=com
cn: Alice Example
sn: Example
uid: alice
```

### C. LDAP client (authenticate to LDAP)

You can configure clients with `sssd` (recommended) or `libnss-ldap` + PAM.

**sssd example (Ubuntu)**

```bash
sudo apt install -y sssd libnss-sss libpam-sss
# /etc/sssd/sssd.conf
# [sssd]
# domains = example.com
# [domain/example.com]
# id_provider = ldap
# ldap_uri = ldap://192.168.56.110
# ldap_search_base = dc=example,dc=com
sudo chmod 600 /etc/sssd/sssd.conf
sudo systemctl restart sssd
getent passwd alice   # should return LDAP user entry
```

### D. Best practices & security

* Always use TLS for LDAP (StartTLS or LDAPS) in production.
* Use group mapping and restrict what groups are allowed to login (PAM account module).
* Use sudoers entries in LDAP for central sudo policy (or `sudo` LDAP schema).

---

## 3) Mail basics (brief) — Postfix quick starter

You said "Mail" in your plan. For LPIC scope, treat postfix as MTA basics: accept local mail, relay out.

**Install basic Postfix (send-only)**

```bash
sudo apt install -y postfix
# choose "Internet Site" and set system mail name
echo "Subject: Test" | sendmail -v root
```

**Useful tests**

* `mail` or `mailx` to read local mail.
* `/var/log/mail.log` for debugging.

**Notes**

* For full mail infra you need MX records, spam filtering, DKIM, SPF — out of scope for one day but note them.

---

## 4) Firewall — ufw & firewalld (policies, examples)

### A. Principles

* Default deny incoming, allow outgoing is a good baseline.
* Open only required service ports (SSH, HTTP, HTTPS, NFS, Samba ports if needed).

### B. ufw (Ubuntu example)

```bash
sudo apt install -y ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH    # or "22/tcp"
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
# for NFSv4:
sudo ufw allow from 192.168.56.0/24 to any port nfs
sudo ufw enable
sudo ufw status verbose
```

### C. firewalld (RHEL/CentOS)

```bash
sudo systemctl start firewalld
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

### D. NFS specifics

* For NFSv4 only port 2049 needs to be opened; older versions require rpcbind and dynamic ports.

### E. Troubleshooting

* `sudo ufw status numbered` and `sudo firewall-cmd --list-all` help debug.
* If clients cannot mount, check if firewall blocked rpcbind or mountd ports.

---

## 5) SSH hardening & key management

### A. Key basics

* Generate a key pair on client: `ssh-keygen -t ed25519 -C "morteza@work"`.
* Copy public key to server: `ssh-copy-id -i ~/.ssh/id_ed25519.pub user@server`.

### B. `sshd_config` sensible hardening (server)

Edit `/etc/ssh/sshd_config`:

```
Port 2222                      # optional - nonstandard port
PermitRootLogin no
PasswordAuthentication no
ChallengeResponseAuthentication no
UsePAM yes
AllowUsers devops opsadmin     # explicit allow list
LoginGraceTime 30
MaxAuthTries 3
PermitEmptyPasswords no
ClientAliveInterval 300
ClientAliveCountMax 2
```

Then restart: `sudo systemctl restart sshd`.

### C. Additional protections

* Use **Fail2ban** (see next section) to ban repeated attempts.
* Consider `AllowGroups` instead of `AllowUsers` to manage large teams.

### D. Troubleshooting

* If you lock yourself out: have console access or maintain root password or alternative user. Test config before applying: `sshd -t` to check syntax.

---

## 6) fail2ban — detect & block brute force

### A. Quick install & jail

```bash
sudo apt install -y fail2ban
sudo systemctl enable --now fail2ban
```

Create `/etc/fail2ban/jail.local` with:

```
[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 600
```

Restart: `sudo systemctl restart fail2ban`.

### B. Verify

```
sudo fail2ban-client status sshd
```

**Sample output**

```
Status for the jail: sshd
|- Filter
|  |- Currently failed: 0
|  `- Total failed: 12
`- Actions
   |- Currently banned: 1
   `- Total banned: 3
```

### C. Add nginx jail (example for brute force on login forms)

* Create a custom filter for the specific log pattern in `/etc/fail2ban/filter.d/` and add corresponding jail.

---

## 7) Backups + Encryption (GPG) — robust approach

### A. GPG key basics

```bash
gpg --batch --gen-key <<'EOF'
%no-protection
Key-Type: RSA
Key-Length: 4096
Name-Real: Backup Key
Name-Comment: automated backups
Name-Email: backup@yourdomain.local
Expire-Date: 0
EOF
```

> For production, **do not** use `%no-protection`. Use passphrases or a secure key management practice (YubiKey or KMS).

List keys: `gpg --list-keys`.

### B. Symmetric vs asymmetric encryption

* **Symmetric** (`gpg -c`) uses a passphrase — simpler for one-off.
* **Asymmetric** (public/private keys) — better for automated backups: encrypt with recipient public key; only holder of private key can decrypt.

### C. Example: encrypt backup with recipient public key (non-interactive)

Assume server has public key `backup@example.com`.

```bash
# create tar
tar -czf /backup/etc-$(date +%F).tar.gz /etc

# encrypt with recipient pubkey
gpg --encrypt --recipient 'backup@example.com' --output /backup/etc-$(date +%F).tar.gz.gpg /backup/etc-$(date +%F).tar.gz

# Optionally remove plaintext:
shred -u /backup/etc-$(date +%F).tar.gz
```

**To decrypt (recipient):**

```bash
gpg --output etc-2025-09-17.tar.gz --decrypt etc-2025-09-17.tar.gz.gpg
```

### D. Automating GPG in scripts

* Use gpg agent with key unlocked on dedicated backup host.
* Or use asymmetric encryption to avoid storing passphrase in scripts.

---

## 8) Advanced Bash scripting — production patterns

This section contains coding patterns and a full, commented script you can reuse.

### A. Safe header

```bash
#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'
```

* `set -e` exit on error.
* `set -u` treat unset variables as errors.
* `set -o pipefail` failures in pipelines are detected.

### B. Logging helper

```bash
log() { echo "$(date --iso-8601=seconds) - $*" >&2; }
```

### C. Locking to avoid overlap

Use `flock` to ensure only one instance runs:

```bash
(
  flock -n 9 || { log "Another instance running, exiting"; exit 0;}
  # critical section
) 9>/var/lock/myjob.lock
```

### D. Trapping cleanup

```bash
cleanup() {
  log "Cleaning up..."
  rm -f "$TMPFILE"
}
trap cleanup EXIT
```

### E. Argument parsing with getopts

```bash
while getopts ":s:t:" opt; do
  case ${opt} in
    s) SRC="$OPTARG" ;;
    t) TARGET="$OPTARG" ;;
    *) echo "Usage: $0 -s src -t target"; exit 1 ;;
  esac
done
```

---

### F. Example production backup script (`/usr/local/bin/backup-sync.sh`)

```bash
#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

LOG="/var/log/backup-sync.log"
TMPDIR="$(mktemp -d)"
LOCK="/var/lock/backup-sync.lock"
RECIPIENT="backup@yourdomain.local"
REMOTE="backup@192.168.56.50:/data/backups/"

log(){ echo "$(date --iso-8601=seconds) - $*" | tee -a "$LOG"; }

# simple lock
exec 9>"$LOCK"
flock -n 9 || { log "Another backup is running. Exiting."; exit 0; }

trap 'rm -rf "$TMPDIR"; log "Cleanup done."' EXIT

SRC="/home/projects"
ARCHIVE="$TMPDIR/projects-$(date +%F).tar.gz"

log "Starting backup for $SRC -> $ARCHIVE"
tar -C / -czf "$ARCHIVE" "${SRC#/}"  # tar relative path
log "Archive created, encrypting for $RECIPIENT"
gpg --output "$ARCHIVE.gpg" --encrypt --recipient "$RECIPIENT" "$ARCHIVE"
log "Encrypted. Transferring to remote: $REMOTE"
rsync -avz --remove-source-files "$ARCHIVE.gpg" "$REMOTE" >>"$LOG" 2>&1
log "Backup finished successfully."

exit 0
```

**How to schedule:** add to crontab:

```
0 2 * * * /usr/local/bin/backup-sync.sh
```

---

## 9) Cron & task automation — safe scheduling patterns

### A. Environment awareness

Crontab runs with a minimal PATH. Use absolute paths or define `PATH` at top of crontab:

```
PATH=/usr/local/bin:/usr/bin:/bin
MAILTO=admin@example.com
```

### B. Logging & rotated logs

* Always redirect stdout/stderr to log files.
* Use `logrotate` to rotate cron logs or use systemd timers and journal.

### C. Use flock to avoid overlapping scheduled runs (example earlier).

### D. Use `anacron` for occasional tasks on hosts that are not always on.

---

## 10) Final Project — Full Integration (step-by-step plan & scripts)

**Goal:** On two app servers + storage server, implement:

* Nginx with SSL as reverse proxy
* App servers mount NFS share for static content
* Users authenticate via LDAP
* Fail2ban + firewall + SSH hardening enabled
* Daily encrypted backups stored on NFS share
* Automation orchestrated with cron and robust Bash scripts

### A. Architecture (textual)

* **Storage VM**: NFS exports `/srv/data`, stores backups in `/backups`.
* **Auth VM**: OpenLDAP with users, optionally home directories exported.
* **Web VMs (x2)**: Nginx as reverse proxy + app, mounts NFS for uploads.
* **Admin workstation**: push scripts, manage keys.

### B. Example checklist & high-level commands (run in order)

1. **Prepare storage server**

   * Create `/srv/data`, configure `/etc/exports`, start nfs-server (see earlier NFS section).
   * Create `/backups`, set retention policy (rotate backups).

2. **Prepare LDAP server**

   * Install `slapd`, define base domain `dc=example,dc=com`, add OU `People` and test users.

3. **Prepare web/app servers**

   * Install `nfs-common`, mount NFS share at `/var/www/uploads` or `/srv/data`.
   * Install `nginx`, create server block to serve app and act as reverse proxy.
   * Generate self-signed TLS for testing or use Let’s Encrypt (certbot) for real domains.

4. **Configure SSH & firewall**

   * Harden `sshd_config` (deny root, disable password, allow keys).
   * Open only necessary firewall ports (22, 80, 443, NFS if needed).

5. **Install fail2ban**

   * Add `sshd` jail — test by repeated bad logins and verify bans are applied.

6. **Backup automation**

   * Deploy `/usr/local/bin/backup-sync.sh` on one host (or storage host).
   * Schedule cron: `0 2 * * * root /usr/local/bin/backup-sync.sh`.

7. **Test disaster recovery**

   * Restore sample backup: copy `.gpg` from NFS share, `gpg --decrypt` with private key, `tar -xzf` to restore.

### C. Example combined provisioning script (skeleton)

> This provisioning script will be long. For safety, run on *test* hosts and adapt paths/IPs.

`provision-web-node.sh` (skeleton)

```bash
#!/usr/bin/env bash
set -euo pipefail
# usage: sudo ./provision-web-node.sh <NFS_SERVER_IP>
NFS_SERVER=${1:-192.168.56.101}
NFS_EXPORT="/srv/data"
MOUNTPOINT="/var/www/uploads"

apt update
apt install -y nginx nfs-common fail2ban ufw

# mount NFS
mkdir -p $MOUNTPOINT
echo "${NFS_SERVER}:${NFS_EXPORT} $MOUNTPOINT nfs defaults 0 0" | tee -a /etc/fstab
mount -a

# nginx site
tee /etc/nginx/sites-available/app <<'EOF'
server {
  listen 80;
  server_name example.local;
  root /var/www/html;
  location /uploads {
    alias /var/www/uploads;
  }
}
EOF
ln -s /etc/nginx/sites-available/app /etc/nginx/sites-enabled/app
nginx -t && systemctl reload nginx

# SSH hardening
sed -i 's/^#Port 22/Port 2222/' /etc/ssh/sshd_config
sed -i 's/^PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/^#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
systemctl restart sshd

# firewall
ufw default deny incoming
ufw default allow outgoing
ufw allow 2222/tcp
ufw allow http
ufw allow https
ufw --force enable

echo "Provisioning completed. Mounts and services are configured."
```

**After provisioning**:

* Ensure NFS mount is present (`mount | grep /var/www/uploads`).
* Confirm nginx serves static content from NFS.

---

## 11) Appendix: Troubleshooting & verification commands

### Useful verification commands

* NFS: `showmount -e SERVER`, `mount | grep nfs`, `sudo exportfs -v`
* Samba: `smbclient -L //SERVER -U%` (list shares), `testparm` (validate config)
* LDAP: `ldapsearch -x -b dc=example,dc=com "(uid=alice)"`
* Fail2ban: `sudo fail2ban-client status sshd`
* Firewall: `ufw status verbose` / `firewall-cmd --list-all`
* SSH: `sshd -t` to validate config; `journalctl -u sshd -f` to tail logs
* Cron: `grep CRON /var/log/syslog` (or systemd journal)
* GPG verify: `gpg --list-keys`, `gpg --decrypt file.gpg`

### Common problems

* **NFS: permission denied** → check UNIX permissions and `root_squash` and `no_root_squash` settings; check export network mask.
* **Mount times out** → firewall blocking ports or NFS server not running.
* **LDAP logins fail** → check `/var/log/auth.log` on client, ensure SSSD/nss configured and `getent passwd <ldapuser>` works.
* **fail2ban not banning** → ensure `logpath` in `jail.local` points to correct log file and filter regex matches logs.
* **crontab job not running** → check PATH, use absolute paths, check mail to root or `syslog` for cron error messages.

---

## Final integration checklist (before calling it done)

1. NFS exports working on storage host; clients mounted and persistent on reboot.
2. Samba share accessible from Windows clients or SMB clients.
3. autofs configured where appropriate for on-demand mounts.
4. LDAP server reachable, clients authenticate, `getent passwd` returns LDAP users.
5. Nginx serving content + SSL enabled (self-signed or Let’s Encrypt).
6. Firewall set to default deny + rules for required services.
7. SSH configured to key-only access, root disabled, and test user allowed.
8. fail2ban jails active and blocking repeated login attempts.
9. Backup script tested: produces encrypted archive, transfers to remote (or stores on NFS), and restore works.
10. Cron scheduled tasks in place, log rotation configured.

---

## Example: Full production-grade backup + restore (example commands)

**Backup**

```bash
sudo /usr/local/bin/backup-sync.sh
# check log
tail -n 50 /var/log/backup-sync.log
# verify file on NFS or remote server
ssh backup@192.168.56.50 ls -l /data/backups/
```

**Restore**

```bash
# fetch file from remote
scp backup@192.168.56.50:/data/backups/projects-2025-09-17.tar.gz.gpg /tmp/
gpg --decrypt /tmp/projects-2025-09-17.tar.gz.gpg > /tmp/projects-2025-09-17.tar.gz
tar -xzf /tmp/projects-2025-09-17.tar.gz -C /restore_path
```

---



