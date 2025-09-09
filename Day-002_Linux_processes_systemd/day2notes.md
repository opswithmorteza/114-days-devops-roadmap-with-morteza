
# 📒 Day 2: FHS, Partitions, Mount/Unmount, fstab

---

## 📂 Filesystem Hierarchy Standard (FHS)

The **Filesystem Hierarchy Standard (FHS)** defines the directory structure and the contents of directories in Linux systems.

### Key Directories:

| Directory          | Description                        |
| ------------------ | ---------------------------------- |
| `/bin`             | Essential user binaries (commands) |
| `/boot`            | Static files for the bootloader    |
| `/dev`             | Device files                       |
| `/etc`             | System-wide configuration files    |
| `/home`            | User home directories              |
| `/mnt` or `/media` | Mount points for removable media   |
| `/var`             | Variable data like logs, caches    |

> **Tip:**
> For mounting extra storage devices, use `/mnt` or create dedicated directories like `/data` to keep your root filesystem organized.

---

## 🔧 Partitions and Filesystem Types

Disk partitioning divides a physical disk into logical segments called **partitions**, each can contain a filesystem or swap space.

### Common Filesystems:

| Filesystem     | Description                                     |
| -------------- | ----------------------------------------------- |
| `ext4`         | Default Linux filesystem — reliable, journaling |
| `xfs`          | High-performance for large files                |
| `btrfs`        | Advanced, supports snapshots and compression    |
| `swap`         | Virtual memory space, not a filesystem          |
| `ntfs`, `vfat` | Windows-compatible filesystems                  |

---

## 🔑 UUID (Universally Unique Identifier)

A **UUID** uniquely identifies a partition or filesystem. Unlike device names like `/dev/sda1` which may change on reboot, UUIDs remain consistent.

Example:

```
UUID=123e4567-e89b-12d3-a456-426614174000
```

sudo blkid /dev/sda2


Output:

/dev/sda2: UUID="abcd-efgh" TYPE="ext4"


UUIDs are stable across reboots → recommended for /etc/fstab.
---

## 🧰 Essential Commands with Examples

---

### 1. `lsblk` — List block devices

```bash
$ lsblk -o NAME,FSTYPE,SIZE,MOUNTPOINT,UUID
NAME   FSTYPE   SIZE MOUNTPOINT UUID
sda             100G            
├─sda1 ext4     96G  /          1111-2222-3333-4444
├─sda2 swap     4G               5555-6666-7777-8888
sdb             50G             
└─sdb1 ext4     50G  /data      9999-aaaa-bbbb-cccc
```

---

### 2. `blkid` — Show device attributes

```bash
$ sudo blkid /dev/sdb1
/dev/sdb1: UUID="9999-aaaa-bbbb-cccc" TYPE="ext4" PARTUUID="abcd-1234"
```

---

### 3. `df` — Report disk space usage

```bash
$ df -h /data
Filesystem      Size  Used Avail Use% Mounted on
/dev/sdb1        50G   1G   49G   2% /data
```

---

### 4. `du` — Estimate directory size

```bash
$ du -sh /data/projects
2.5G    /data/projects
```

* `-s` summary
* `-h` human-readable

---

### 5. `mount` — Mount filesystem

```bash
$ sudo mount /dev/sdb1 /data
$ mount | grep /data
/dev/sdb1 on /data type ext4 (rw,relatime,data=ordered)
```

---

### 6. `umount` — Unmount filesystem

```bash
$ sudo umount /data
$ mount | grep /data
# No output means unmounted
```

---

### 7. `mount -a` — Mount all filesystems from `/etc/fstab`

```bash
$ sudo mount -a
```
Perfect ✅
---

### `mount -a` – Apply `/etc/fstab`

```bash
sudo mount -a
```

(If no errors → fstab is valid ✅)

---

## 5. fstab (Persistent Mounts)

Edit `/etc/fstab`:

```bash
UUID=1234-5678   /        ext4   defaults        0 1
UUID=abcd-efgh   /data    ext4   defaults,noatime 0 2
UUID=8765-4321   none     swap   sw             0 0
```

* `UUID` → stable identifier
* `/data` → mount point
* `ext4` → filesystem type
* `defaults,noatime` → mount options
* `0 1` / `0 2` → fsck order

---

## 6. 🔍 The `find` Command

The **`find`** command searches for files and directories based on name, type, size, permissions, and more.

### Syntax:

```bash
find [path] [options] [expression]
```

---

### 1. Find file by name

```bash
find /etc -name passwd
```

```
/etc/passwd
```

---

### 2. Find directories

```bash
find /var -type d -name log
```

```
/var/log
```

---

### 3. Find files by size

```bash
find /var/log -type f -size +10M
```

```
/var/log/syslog.1
```

---

### 4. Find files by user

```bash
find /home -user alice
```

```
/home/alice/.bashrc
/home/alice/Documents/report.txt
```

---

### 5. Find by permissions

```bash
find /tmp -perm 777
```

```
/tmp/test.sh
```

---

### 6. Find recently modified files

```bash
find / -mtime -1
```

(Shows files modified in the last 24h)

---

### 7. Execute a command on results

```bash
find /var/log -type f -name "*.log" -exec ls -lh {} \;
```

```
-rw-r--r-- 1 root root  20K Sep  9 10:00 /var/log/syslog
-rw-r--r-- 1 root root  50M Sep  8 23:55 /var/log/kern.log
```

---

## 💡 Mentor Tips

* Always use **UUIDs** in `/etc/fstab` to avoid mounting issues caused by device name changes.
* Use `lsblk -f` to view device filesystems and UUIDs together.
* Unmount a partition before formatting it.
* Always backup `/etc/fstab` before editing.
* Use `mount -a` to verify `/etc/fstab` entries before reboot.



