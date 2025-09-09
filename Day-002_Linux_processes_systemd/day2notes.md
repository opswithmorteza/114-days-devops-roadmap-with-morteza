Day 2: FHS, Partitions, Mount/Unmount, fstab
1. Note.md — Detailed Explanation with Commands and Outputs
📂 Filesystem Hierarchy Standard (FHS)

The FHS defines the directory structure and directory contents in Linux systems.

Key directories include:

/bin — essential user binaries

/boot — static files for boot loader

/dev — device files

/etc — system configuration files

/home — user home directories

/mnt or /media — mount points for removable media

/var — variable files like logs

Tip: Always mount additional storage under /mnt or create dedicated directories like /data to keep the hierarchy clean.

🔧 Partitions and Filesystem Types

Disk partitioning divides a physical disk into multiple partitions — logical segments with independent filesystems.

Common filesystems:

ext4: default, reliable, journaling

xfs: high performance for large files

btrfs: advanced with snapshots, compression

swap: for virtual memory

ntfs, vfat: for Windows compatibility

🔑 UUID (Universally Unique Identifier)

A UUID uniquely identifies a partition or filesystem, e.g.,
