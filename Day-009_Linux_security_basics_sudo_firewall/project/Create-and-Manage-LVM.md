
# 📂 Project 1: Create and Manage LVM (Logical Volume Manager)

### Project Goal

Set up a new **LVM-based storage system**, extend it dynamically, and test resizing.

### Steps & Solution

```bash
# Step 1: Create partitions on two disks (example: /dev/sdb and /dev/sdc)
sudo fdisk /dev/sdb
# create new partition -> type "8e" (Linux LVM)
sudo fdisk /dev/sdc

# Step 2: Create Physical Volumes (PV)
sudo pvcreate /dev/sdb1 /dev/sdc1

# Step 3: Create a Volume Group (VG)
sudo vgcreate datavg /dev/sdb1 /dev/sdc1

# Step 4: Create Logical Volumes (LV)
sudo lvcreate -L 2G -n datalv datavg
sudo lvcreate -L 1G -n backuplv datavg

# Step 5: Format logical volumes
sudo mkfs.ext4 /dev/datavg/datalv
sudo mkfs.ext4 /dev/datavg/backuplv

# Step 6: Mount the file systems
sudo mkdir /mnt/data /mnt/backup
sudo mount /dev/datavg/datalv /mnt/data
sudo mount /dev/datavg/backuplv /mnt/backup

# Step 7: Extend a logical volume (example: add +1G)
sudo lvextend -L +1G /dev/datavg/datalv
sudo resize2fs /dev/datavg/datalv
```

✅ **Outcome:** You now have a flexible storage system using **LVM**, where space can be expanded dynamically.

---

# 📂 Project 2: Disk Quota Management for Users

### Project Goal

Implement disk quotas on a partition to restrict how much space each user can use.

### Steps & Solution

```bash
# Step 1: Install quota package
sudo apt install quota -y   # (Debian/Ubuntu)
sudo yum install quota -y   # (RHEL/CentOS)

# Step 2: Enable quota on a partition (example: /dev/sdb1 mounted at /mnt/data)
sudo mount -o remount,usrquota,grpquota /mnt/data

# Step 3: Create quota database
sudo quotacheck -cum /mnt/data
sudo quotaon /mnt/data

# Step 4: Assign quota to user "devuser"
sudo setquota -u devuser 500M 600M 0 0 /mnt/data

# Step 5: Verify quota
quota -u devuser
```

✅ **Outcome:** User `devuser` is restricted to **500MB soft limit** and **600MB hard limit** on `/mnt/data`.


