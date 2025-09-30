
# 📘 Day 22 – File Sharing (NFS & SMB)

---

## 1. Introduction (Conceptual Understanding)

File sharing in Linux is mainly done via:

* **NFS (Network File System):**

  * Native to UNIX/Linux.
  * Uses RPC (Remote Procedure Calls).
  * Good for Linux-to-Linux file sharing.

* **SMB/CIFS (Server Message Block / Common Internet File System):**

  * Originally for Windows.
  * Implemented in Linux using **Samba**.
  * Great for Linux ↔ Windows interoperability.

---

## 2. NFS (Beginner → Advanced)

### 2.1 Install NFS

On server:

```bash
sudo apt update
sudo apt install nfs-kernel-server -y
```

### 2.2 Configure NFS Export

Edit `/etc/exports`:

```conf
/srv/nfs/share  192.168.1.0/24(rw,sync,no_subtree_check)
```

* `rw` → Read/Write
* `sync` → Synchronous writes
* `no_subtree_check` → Avoid subtree validation

Apply config:

```bash
sudo exportfs -ra
```

### 2.3 Check Exports

```bash
showmount -e localhost
```

**Output:**

```
Export list for localhost:
/srv/nfs/share 192.168.1.0/24
```

### 2.4 Client Mount

On client:

```bash
sudo apt install nfs-common -y
sudo mount -t nfs 192.168.1.10:/srv/nfs/share /mnt
```

Verify:

```bash
df -h | grep nfs
```

Output:

```
192.168.1.10:/srv/nfs/share  20G  4G  16G  20% /mnt
```

---

### 2.5 Automount with autofs (Intermediate)

Install:

```bash
sudo apt install autofs -y
```

Config `/etc/auto.master`:

```
/- /etc/auto.nfs
```

Create `/etc/auto.nfs`:

```
/mnt/nfs  -fstype=nfs,rw  192.168.1.10:/srv/nfs/share
```

Reload:

```bash
sudo systemctl restart autofs
```

Now `/mnt/nfs` mounts **on demand**.

---

### 2.6 Advanced NFS Security

* Use `root_squash` to map root → nobody:

```conf
/srv/nfs/share 192.168.1.0/24(rw,sync,no_subtree_check,root_squash)
```

* Combine with **firewall** to limit access:

```bash
sudo ufw allow from 192.168.1.0/24 to any port nfs
```

---

## 3. SMB / Samba (Beginner → Advanced)

### 3.1 Install Samba

On server:

```bash
sudo apt install samba -y
```

### 3.2 Configure Samba Share

Edit `/etc/samba/smb.conf`:

```conf
[global]
   workgroup = WORKGROUP
   server string = Samba Server
   security = user

[share]
   path = /srv/smb/share
   writable = yes
   browsable = yes
   guest ok = no
   valid users = sambauser
```

### 3.3 Create Samba User

```bash
sudo mkdir -p /srv/smb/share
sudo useradd -M -s /sbin/nologin sambauser
sudo smbpasswd -a sambauser
sudo chown -R sambauser:sambauser /srv/smb/share
```

Restart:

```bash
sudo systemctl restart smbd
```

---

### 3.4 Access from Linux Client

```bash
sudo apt install smbclient cifs-utils -y
smbclient -L //192.168.1.10/share -U sambauser
```

Output:

```
Sharename       Type      Comment
---------       ----      -------
share           Disk      Samba Share
```

Mount:

```bash
sudo mount -t cifs //192.168.1.10/share /mnt -o username=sambauser
```

---

### 3.5 Access from Windows Client

* Open `\\192.168.1.10\share` in File Explorer.
* Enter `sambauser` credentials.

---

### 3.6 Advanced Samba Features

* **Integration with LDAP/AD** for central authentication.
* **VFS modules** (e.g., recycle bin, auditing).
* **Performance tuning** (socket options, async IO).

---

## 4. Projects 🚀

### 🔹 Project 1: Unified File Server with NFS + SMB

* Setup NFS for Linux clients.
* Setup Samba for Windows clients.
* Both point to the same shared folder `/srv/shared_data`.

✅ Deliverable: Linux mounts via NFS, Windows via SMB, both see the same files.

---

### 🔹 Project 2: Secure File Sharing with Authentication

* Samba share with user authentication (sambauser).
* NFS share with `root_squash` enabled + firewall restricted to one subnet.
* Automount for clients with `autofs`.

✅ Deliverable: Only authenticated users can access, security applied at both protocol + OS level.

