
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

---

## 💡 Mentor Tips

* Always use **UUIDs** in `/etc/fstab` to avoid mounting issues caused by device name changes.
* Use `lsblk -f` to view device filesystems and UUIDs together.
* Unmount a partition before formatting it.
* Always backup `/etc/fstab` before editing.
* Use `mount -a` to verify `/etc/fstab` entries before reboot.



