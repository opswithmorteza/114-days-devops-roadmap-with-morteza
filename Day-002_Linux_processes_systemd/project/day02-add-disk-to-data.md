📘 projects/day02-add-disk-to-data.md

````markdown
# 📂 Day 002 Project – Add New Disk and Mount at /data Using UUID

## 🎯 Goal

Add a new disk to the system, format it with `ext4`, and configure it to mount automatically at `/data` using the disk’s UUID in `/etc/fstab`.

---

## Step 1: Identify the New Disk

```bash
$ lsblk
NAME   FSTYPE   SIZE MOUNTPOINT
sda             100G /
sdb             50G
````

---

## Step 2: Create a Partition on the Disk

```bash
$ sudo fdisk /dev/sdb

Command (m for help): n
Partition type:
   p primary (0 primary, 0 extended, 4 free)
   e extended
Select (default p): p
Partition number (1-4, default 1): 1
First sector (default 2048): [ENTER]
Last sector (default ...): +50G

Command (m for help): w
The partition table has been altered.
```

---

## Step 3: Format the Partition to ext4

```bash
$ sudo mkfs.ext4 /dev/sdb1
mke2fs 1.45.5 (07-Jan-2020)
Creating filesystem with 13107200 4k blocks and 3276800 inodes
Filesystem UUID: 9999-aaaa-bbbb-cccc
```

---

## Step 4: Find the UUID of the Partition

```bash
$ sudo blkid /dev/sdb1
/dev/sdb1: UUID="9999-aaaa-bbbb-cccc" TYPE="ext4"
```

---

## Step 5: Create the Mount Point

```bash
$ sudo mkdir /data
```

---

## Step 6: Mount the Partition Manually

```bash
$ sudo mount /dev/sdb1 /data

$ df -h /data
Filesystem      Size  Used Avail Use% Mounted on
/dev/sdb1        50G   0G   50G   0% /data
```

---

## Step 7: Add Entry to `/etc/fstab`

Edit `/etc/fstab` with your preferred editor, e.g.,

```bash
sudo nano /etc/fstab
```

Add this line:

```
UUID=9999-aaaa-bbbb-cccc /data ext4 defaults 0 2
```

---

## Step 8: Test Mounts without Rebooting

Unmount and remount all fstab filesystems:

```bash
sudo umount /data
sudo mount -a

$ df -h /data
Filesystem      Size  Used Avail Use% Mounted on
/dev/sdb1        50G   0G   50G   0% /data
```

---

✅ **Key Takeaways**

* Learned to partition a new disk using `fdisk`.
* Formatted partition with `ext4` filesystem.
* Retrieved UUID using `blkid`.
* Configured automatic mount using UUID in `/etc/fstab`.
* Verified mount operation with `mount -a`.
