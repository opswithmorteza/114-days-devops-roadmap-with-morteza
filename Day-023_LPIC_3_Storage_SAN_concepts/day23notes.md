

# 📘 Day 23 – Storage: SAN (Storage Area Network) Concepts

---

## 1. Introduction (Conceptual Understanding)

### 1.1 What is SAN?

* **SAN (Storage Area Network)** → A dedicated high-speed network that provides block-level storage to servers.
* Unlike **NAS (Network Attached Storage)**:

  * **NAS**: File-level access (via NFS/SMB).
  * **SAN**: Block-level access (server sees it like a local disk).

### 1.2 Why SAN?

* Centralized storage management.
* High availability & scalability.
* Ideal for virtualization, databases, high-performance apps.

---

## 2. SAN Components

1. **Initiator (Client / Host):**

   * Server requesting storage (e.g., Linux host).

2. **Target (Storage Device):**

   * Disk arrays, storage servers, etc.

3. **Fabric:**

   * The network (usually Fibre Channel or iSCSI).

4. **Protocols:**

   * **Fibre Channel (FC)** → Expensive, enterprise-level.
   * **iSCSI (Internet Small Computer System Interface)** → Uses TCP/IP over Ethernet.

---

## 3. iSCSI (Beginner → Advanced)

### 3.1 Setup iSCSI Target (Storage Server)

Install:

```bash
sudo apt update
sudo apt install tgt -y
```

Configure `/etc/tgt/conf.d/iscsi.conf`:

```conf
<target iqn.2025-10.com.example:storage.target1>
    backing-store /srv/iscsi-disk1.img
    initiator-address 192.168.1.100
    write-cache off
</target>
```

Create virtual disk:

```bash
sudo dd if=/dev/zero of=/srv/iscsi-disk1.img bs=1M count=1024
```

Restart service:

```bash
sudo systemctl restart tgt
```

---

### 3.2 Setup iSCSI Initiator (Client/Host)

Install:

```bash
sudo apt install open-iscsi -y
```

Discover targets:

```bash
sudo iscsiadm -m discovery -t sendtargets -p 192.168.1.10
```

Output:

```
192.168.1.10:3260,1 iqn.2025-10.com.example:storage.target1
```

Login:

```bash
sudo iscsiadm -m node --targetname iqn.2025-10.com.example:storage.target1 -p 192.168.1.10 --login
```

Check new disk:

```bash
lsblk
```

Output:

```
sdb    8:16   0  1G  0 disk
```

Format & mount:

```bash
sudo mkfs.ext4 /dev/sdb
sudo mkdir /mnt/iscsi
sudo mount /dev/sdb /mnt/iscsi
```

---

### 3.3 Advanced iSCSI Features

* **CHAP Authentication** (for secure login):

```conf
<target iqn.2025-10.com.example:storage.target1>
    backing-store /srv/iscsi-disk1.img
    incominguser iscsiuser StrongPassword123
    initiator-address 192.168.1.100
</target>
```

Client login with credentials:

```bash
sudo iscsiadm -m node -T iqn.2025-10.com.example:storage.target1 -p 192.168.1.10 --op=update -n node.session.auth.authmethod -v CHAP
sudo iscsiadm -m node -T iqn.2025-10.com.example:storage.target1 -p 192.168.1.10 --op=update -n node.session.auth.username -v iscsiuser
sudo iscsiadm -m node -T iqn.2025-10.com.example:storage.target1 -p 192.168.1.10 --op=update -n node.session.auth.password -v StrongPassword123
sudo iscsiadm -m node -T iqn.2025-10.com.example:storage.target1 -p 192.168.1.10 --login
```

---

## 4. Multipathing (Intermediate → Advanced)

To avoid single-point failure, SANs use **multipath I/O**.

Install multipath tools:

```bash
sudo apt install multipath-tools -y
```

Start service:

```bash
sudo systemctl enable multipathd
sudo systemctl start multipathd
```

Check multipath devices:

```bash
multipath -ll
```

---

## 5. Projects 🚀

### 🔹 Project 1: Build a Virtual SAN with iSCSI

* Server = iSCSI target.
* Client = Linux host connecting to it.
* Create 2 iSCSI LUNs (virtual disks).
* Format one with `ext4`, other with `xfs`.
* Mount both on client.

✅ Deliverable: Client sees both LUNs as local disks.

---

### 🔹 Project 2: Secure SAN with Authentication + Multipath

* Configure iSCSI with CHAP authentication.
* Add two network paths between server & client.
* Enable multipath on client.
* Simulate a network failure → verify client still sees the disk.

✅ Deliverable: High-availability SAN storage.

