
# 📘 Day 16 – Virtualization with KVM (Kernel-based Virtual Machine)

---

## 🔹 Part 1 – Basics of Virtualization

### What is Virtualization?

Virtualization means running multiple isolated operating systems (VMs) on a single physical machine.
With **KVM**, Linux itself acts as a hypervisor.

---

### Step 1: Check if CPU supports virtualization

```bash
egrep -c '(vmx|svm)' /proc/cpuinfo
```

**Example Output:**

```
8
```

👉 If the output is `0`, your CPU does not support hardware virtualization.
👉 If greater than `0`, virtualization is supported.

---

### Step 2: Install KVM & Tools (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils virt-manager -y
```

**Verify installation:**

```bash
kvm --version
```

**Output:**

```
QEMU emulator version 6.2.0 (Debian 1:6.2+dfsg-2ubuntu6.14)
```

---

### Step 3: Verify KVM is loaded

```bash
lsmod | grep kvm
```

**Output:**

```
kvm_intel             372736  0
kvm                  1114112  1 kvm_intel
```

👉 If you see `kvm_intel` (Intel CPU) or `kvm_amd` (AMD CPU), the module is loaded.

---

## 🔹 Part 2 – Creating a Virtual Machine

### Method 1: Simple VM Creation

```bash
virt-install \
 --name testvm \
 --ram 1024 \
 --disk path=/var/lib/libvirt/images/testvm.img,size=5 \
 --vcpus 1 \
 --os-variant ubuntu22.04 \
 --network network=default \
 --graphics none \
 --cdrom /iso/ubuntu-22.04.iso
```

**What happens?**

* Creates a VM named `testvm`.
* Allocates 1 CPU, 1GB RAM, and 5GB disk.
* Boots installer from Ubuntu ISO.

---

### Method 2: GUI Management (Beginner Friendly)

Run:

```bash
virt-manager
```

👉 Opens Virtual Machine Manager (GUI) → create VM by clicking **New**.

---

## 🔹 Part 3 – Networking

### Create a custom NAT network

File: `vm-network.xml`

```xml
<network>
  <name>devops-net</name>
  <bridge name="virbr50"/>
  <forward mode="nat"/>
  <ip address="192.168.50.1" netmask="255.255.255.0">
    <dhcp>
      <range start="192.168.50.100" end="192.168.50.200"/>
    </dhcp>
  </ip>
</network>
```

Apply it:

```bash
virsh net-define vm-network.xml
virsh net-start devops-net
virsh net-autostart devops-net
```

**Check networks:**

```bash
virsh net-list --all
```

**Output:**

```
 Name        State    Autostart   Persistent
-------------------------------------------------
 default     active   yes         yes
 devops-net  active   yes         yes
```

---

## 🔹 Part 4 – Multi-VM DevOps Lab (Applied Example)

We will build **3 connected VMs**:

1. `webserver` → Runs Nginx.
2. `dbserver` → Runs MySQL.
3. `fileserver` → Provides shared storage via NFS.

---

### Step 1: Create the VMs

Example:

```bash
virt-install \
 --name webserver \
 --ram 2048 \
 --disk path=/var/lib/libvirt/images/webserver.img,size=10 \
 --vcpus 2 \
 --os-variant ubuntu22.04 \
 --network network=devops-net \
 --graphics none \
 --cdrom /iso/ubuntu-22.04.iso
```

Repeat for `dbserver` and `fileserver`.

---

### Step 2: Configure the Services

#### On Webserver

```bash
sudo apt install nginx -y
echo "Hello from Web Server" | sudo tee /var/www/html/index.html
curl http://localhost
```

**Output:**

```
Hello from Web Server
```

#### On DBserver

```bash
sudo apt install mysql-server -y
mysql -u root -e "CREATE DATABASE devops;"
mysql -u root -e "SHOW DATABASES;"
```

**Output:**

```
+--------------------+
| Database           |
+--------------------+
| devops             |
| information_schema |
| mysql              |
+--------------------+
```

#### On Fileserver

```bash
sudo apt install nfs-kernel-server -y
sudo mkdir -p /srv/share
echo "/srv/share *(rw,sync,no_subtree_check)" | sudo tee -a /etc/exports
sudo systemctl restart nfs-server
```

On Webserver, mount NFS:

```bash
sudo apt install nfs-common -y
sudo mount 192.168.50.103:/srv/share /mnt
```

Test:

```bash
touch /mnt/test.txt
ls /mnt
```

**Output:**

```
test.txt
```

---

## 🔹 Part 5 – Advanced Features

### Snapshots

```bash
virsh snapshot-create-as webserver "pre-upgrade"
virsh snapshot-list webserver
```

### Live Migration (between hosts)

```bash
virsh migrate --live webserver qemu+ssh://otherhost/system
```

### Resource Limits

```bash
virsh setmem webserver 1024M --config
virsh setvcpus webserver 1 --config
```

--
