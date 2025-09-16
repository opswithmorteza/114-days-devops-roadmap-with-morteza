# 📘 Day 9 – Linux Disk Management & File Systems

Today we focus on **disk management, partitions, file systems, and storage optimization**.
This is one of the most important topics in Linux because DevOps engineers must manage servers where storage efficiency, data integrity, and scalability are critical.

---

## 🔹 1. Understanding Disks and Partitions

* **Disk (`/dev/sda`, `/dev/nvme0n1`)**: Represents the physical storage device.
* **Partition (`/dev/sda1`, `/dev/nvme0n1p1`)**: A logical section of a disk.
* **MBR vs GPT**:

  * **MBR (Master Boot Record)**: Older, supports up to 2TB and 4 partitions.
  * **GPT (GUID Partition Table)**: Modern, supports large disks and unlimited partitions.

👉 **Command to list disks & partitions:**

```bash
lsblk
```

👉 **Detailed partition info:**

```bash
sudo fdisk -l
```

---

## 🔹 2. Creating and Managing Partitions

* Use **fdisk** (for MBR) or **parted** (for GPT).

Example – create a new partition:

```bash
sudo fdisk /dev/sdb
# n → new partition
# w → write changes
```

👉 After creating, verify with:

```bash
lsblk /dev/sdb
```

---

## 🔹 3. File System Types

* **ext4** → most common in Linux.
* **xfs** → better for large files, high performance.
* **btrfs** → snapshotting, advanced features.
* **zfs** → enterprise-level, advanced data protection.

👉 Format partition with ext4:

```bash
sudo mkfs.ext4 /dev/sdb1
```

👉 Format partition with xfs:

```bash
sudo mkfs.xfs /dev/sdb1
```

---

## 🔹 4. Mounting and Unmounting

* Mount a partition:

```bash
sudo mount /dev/sdb1 /mnt/mydisk
```

* Unmount:

```bash
sudo umount /mnt/mydisk
```

👉 To make it permanent, add entry in `/etc/fstab`:

```
/dev/sdb1  /mnt/mydisk  ext4  defaults  0  2
```

---

## 🔹 5. Disk Usage & Monitoring

* **Check disk usage:**

```bash
df -h
```

* **Check inode usage (for millions of small files):**

```bash
df -i
```

* **Find big files:**

```bash
du -sh /var/*
```

👉 Pro Tip: Use `ncdu` for interactive disk usage analysis.

---

## 🔹 6. Logical Volume Manager (LVM) – Advanced

LVM allows **flexible disk management**:

* Add new disks without downtime.
* Resize partitions dynamically.

👉 Example – Create LVM setup:

```bash
# Create physical volume
sudo pvcreate /dev/sdb1

# Create volume group
sudo vgcreate myvg /dev/sdb1

# Create logical volume
sudo lvcreate -L 5G -n mylv myvg

# Format & mount
sudo mkfs.ext4 /dev/myvg/mylv
sudo mount /dev/myvg/mylv /mnt/mylv
```

👉 Resize LVM (expand):

```bash
sudo lvextend -L +2G /dev/myvg/mylv
sudo resize2fs /dev/myvg/mylv
```

---

## 🔹 7. Disk Health Monitoring (Pro-Level)

* **SMART Monitoring:**

```bash
sudo smartctl -a /dev/sda
```

* **I/O performance test:**

```bash
sudo hdparm -Tt /dev/sda
```

---

## 🔹 8. Professional Tips

* Always use **LVM** or **ZFS** in production for flexibility.
* Use **RAID (mdadm)** for redundancy. Example: RAID-1 mirrors data.
* Regularly monitor with `iostat`, `iotop`, and `smartctl`.
* Use **tune2fs** to adjust ext4 parameters. Example: disable access time updates for performance:

```bash
sudo tune2fs -o noatime /dev/sdb1
```

---

# 🛠️ Practical Examples

### ✅ Example 1 – Mount a New Disk for Application Logs

1. Add a new disk `/dev/sdb`.
2. Partition & format:

```bash
sudo fdisk /dev/sdb
sudo mkfs.ext4 /dev/sdb1
```

3. Mount permanently:

```
/dev/sdb1 /var/log ext4 defaults 0 2
```

4. Move logs:

```bash
sudo rsync -av /var/log/ /mnt/logs/
```

---

### ✅ Example 2 – Resize Storage Without Downtime

1. Create LVM with `/dev/sdb1`.
2. Application runs on `/mnt/appdata`.
3. Add new disk `/dev/sdc`, extend volume group:

```bash
sudo pvcreate /dev/sdc
sudo vgextend myvg /dev/sdc
sudo lvextend -L +10G /dev/myvg/mylv
sudo resize2fs /dev/myvg/mylv
```

👉 Application now has **10GB extra space without downtime**.

---

# 🚀 Professional Projects

### 🔹 Project 1: Setup Production-Grade LVM with Snapshots

* Create an LVM for `/var/lib/mysql`.
* Enable **daily snapshots** before backup.
* Restore snapshot in case of failure.

👉 Example:

```bash
sudo lvcreate -L 1G -s -n mysql_snap /dev/myvg/mysql
```

---

### 🔹 Project 2: Design RAID + LVM Hybrid Storage

* Use **RAID-1** (mirror) for redundancy.
* Use **LVM** on top of RAID for flexibility.
* Store Docker volumes inside LVM.

👉 Key Outcome: **High availability + flexible resizing + safe data.**

