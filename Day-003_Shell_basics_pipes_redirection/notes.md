حتماً! ابتدا مرور کنیم برنامه‌ای که برای **روز سوم** نوشتی چی بود

### ✅ **Day 3 – File permissions, ownership, SUID/SGID, sticky bit**

#### 🧠 **Conceptual Overview**:

* Permissions enforce access control via kernel checks on open/read/write.
* Each file has an **inode** with `uid/gid/mode`.
* **Mode**: 9 bits (rwx for user/group/other) + special bits:

  * **SUID**: Executes as file owner (e.g., `/usr/bin/passwd`)
  * **SGID**: Inherits group on directories
  * **Sticky Bit**: Prevents users from deleting others' files in shared dirs (e.g., `/tmp`)

#### 🔧 **Commands & Options**:

* `chmod 755 file` → sets mode bits (octal: 7=rwx,5=rx)
* `chmod u+x,g-w file` → symbolic change
* `chown user:group file -R` → change ownership recursively
* `umask 022` → default permission mask

#### 🛠️ **ACLs**:

* `setfacl -m u:user:rwx file` → set ACL
* `getfacl file` → view ACL
* Default ACLs for inheritance in directories

#### ⚙️ **Infrastructure Insights**:

* Kernel enforces permissions at syscall level
* Extended attributes (`xattr`) store ACLs
* Concept: Least privilege, secure defaults
---

# 📚 Day 3 – Linux File Permissions, Ownership, SUID/SGID, Sticky Bit, and ACLs

## 🧠 Conceptual Learning

### 🔐 Understanding Permissions

Linux enforces file-level access control through **permissions** set on each file/directory. These permissions are managed by the kernel and stored in the file's **inode**.

Each file has:

* **Owner (UID)**
* **Group (GID)**
* **Permission bits (Mode)**

Permission bits follow this structure:
`rwxrwxrwx` → User | Group | Others

Example:

```bash
ls -l file.txt
-rwxr-xr-- 1 user group 1234 Sep 10 14:32 file.txt
```

* `user` can read/write/execute
* `group` can read/execute
* `others` can only read

---

### 🔢 Numeric (Octal) Permissions

| Permission | Binary | Octal |
| ---------- | ------ | ----- |
| rwx        | 111    | 7     |
| rw-        | 110    | 6     |
| r--        | 100    | 4     |
| ---        | 000    | 0     |

Example:

```bash
chmod 755 script.sh
# 7 (rwx) for user, 5 (r-x) for group, 5 (r-x) for others
```

---

### ✍️ Symbolic Mode

```bash
chmod u+x file.sh     # Add execute for user
chmod g-w file.sh     # Remove write for group
chmod o=r file.sh     # Set read-only for others
```

---

### 👤 Changing Ownership

```bash
chown alice:devs report.txt      # Change owner to alice, group to devs
chown -R root:admin /etc/nginx   # Recursive change
```

---

### 🧰 umask – Default File Permissions

The `umask` subtracts permissions from the system default (666 for files, 777 for dirs):

```bash
umask                       # View current umask (e.g., 0022)
umask 007                   # Restrict others completely
```

---

## 🧨 Special Permission Bits

### 🔸 SUID (Set User ID)

If a file has SUID, it runs as the file **owner**, not the user who ran it.

```bash
ls -l /usr/bin/passwd
-rwsr-xr-x 1 root root ...
```

* `s` in user execute place means **SUID** is set.
* Use with binaries that need temporary root access.

Set with:

```bash
chmod u+s script.sh
```

---

### 🔸 SGID (Set Group ID)

* On **files**: run as group
* On **directories**: new files inherit the directory’s group

```bash
chmod g+s /shared
ls -ld /shared
drwxr-sr-x 2 user devs ...
```

---

### 🔸 Sticky Bit

Used on **shared directories** (like `/tmp`) to prevent users from deleting files they don’t own.

```bash
chmod +t /shared
ls -ld /shared
drwxrwxrwt ...
```

---

## 🔐 ACLs (Access Control Lists)

ACLs extend the basic permission model to allow **per-user/per-group** rules.

Enable ACL support on a mounted filesystem (check `mount | grep acl` or `/etc/fstab`).

### ✅ Set ACL:

```bash
setfacl -m u:john:rwx project/
```

### ✅ View ACL:

```bash
getfacl project/
```

### ✅ Default ACL (applied to new files in dir):

```bash
setfacl -d -m g:devs:rw /shared
```

---

## 🧠 Infrastructure Insight

* Kernel checks permissions at syscall level (e.g., `open()`, `write()`)
* ACLs stored in extended attributes (xattr)
* SUID/SGID execute in different **security contexts**

