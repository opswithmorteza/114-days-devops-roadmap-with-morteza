# 📘 Day 17 – Security: SELinux & AppArmor

## 1. Introduction

Security in Linux is not just about firewalls and users. At the kernel level, we have **Mandatory Access Control (MAC)** systems like **SELinux (Security-Enhanced Linux)** and **AppArmor**.

* **Discretionary Access Control (DAC):** The classic Linux model — file owners decide who can access their files.
* **Mandatory Access Control (MAC):** The system enforces rules regardless of user ownership. Even root is limited.

👉 Think of it like **an airport**:

* DAC = You have your ticket (permissions).
* MAC = Security gate + scanners (SELinux/AppArmor) enforce extra checks.

---

## 2. SELinux Basics

### Modes of SELinux

```bash
getenforce
```

Output:

```
Enforcing
```

* **Enforcing:** SELinux is active and enforcing rules.
* **Permissive:** SELinux logs violations but doesn’t block them.
* **Disabled:** SELinux is off.

Switch mode temporarily:

```bash
sudo setenforce 0   # Permissive
sudo setenforce 1   # Enforcing
```

### File Contexts

Every file has a **security context** (label).
Check with:

```bash
ls -Z /var/www/html/
```

Example output:

```
-rw-r--r--. root root system_u:object_r:httpd_sys_content_t:s0 index.html
```

Here:

* `httpd_sys_content_t` → this file is labeled for web server access.

If the label is wrong, Apache won’t read it even if permissions allow.
Fix with:

```bash
sudo restorecon -Rv /var/www/html/
```

---

## 3. SELinux Advanced Example

### Scenario: Apache serving files from `/srv/web`

```bash
sudo mkdir -p /srv/web
echo "Hello SELinux" | sudo tee /srv/web/index.html
sudo chown -R apache:apache /srv/web
```

Try to serve it → Apache fails because SELinux blocks it.
Solution:

```bash
# Add the right label
sudo semanage fcontext -a -t httpd_sys_content_t "/srv/web(/.*)?"
sudo restorecon -Rv /srv/web
```

Now it works ✅

---

## 4. AppArmor Basics

### Checking AppArmor

```bash
sudo aa-status
```

Output:

```
apparmor module is loaded.
11 profiles are loaded.
5 profiles are in enforce mode.
```

### Modes in AppArmor

* **Enforce:** Blocks actions not allowed by the profile.
* **Complain:** Logs actions but does not block.

Switch mode:

```bash
sudo aa-complain /etc/apparmor.d/usr.bin.man
sudo aa-enforce /etc/apparmor.d/usr.bin.man
```

---

## 5. Writing a Simple AppArmor Profile

Example: Restrict `ping` to only be able to read `/etc/resolv.conf`.

```bash
sudo aa-genprof /bin/ping
```

This launches an interactive tool:

* Run `ping google.com` in another terminal.
* AppArmor will ask: allow or deny?
* Save → profile created at `/etc/apparmor.d/bin.ping`.

---

## 6. SELinux vs AppArmor

| Feature     | SELinux                            | AppArmor                      |
| ----------- | ---------------------------------- | ----------------------------- |
| Granularity | Very fine-grained (labels & types) | Easier, path-based profiles   |
| Complexity  | Steeper learning curve             | More beginner-friendly        |
| Default in  | RHEL, CentOS, Fedora               | Ubuntu, Debian                |
| Use case    | Enterprise security, multi-service | Quick application confinement |

---

## 7. Intermediate & Advanced Examples

### Example 1: Checking SELinux logs

```bash
sudo ausearch -m avc -ts recent
```

Shows denials (AVC = Access Vector Cache).

### Example 2: Allow Apache to connect to DB

```bash
sudo setsebool -P httpd_can_network_connect_db on
```

This toggles a Boolean to permit Apache to talk to MySQL.

### Example 3: AppArmor restricting MySQL

Edit `/etc/apparmor.d/usr.sbin.mysqld` → restrict file paths MySQL can access. Reload:

```bash
sudo systemctl restart apparmor
```

---



---
