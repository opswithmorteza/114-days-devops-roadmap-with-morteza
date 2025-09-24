# 🧪 **Project 1 – Deploy a 3-VM Lab with Shared Network**

### Problem:

Create 3 virtual machines (`web`, `db`, `client`) using KVM. They should communicate over a private NAT network. The `web` server runs Nginx, `db` runs MySQL, and the `client` can curl the web service.

### Solution:

#### Step 1 – Create a custom virtual network

```bash
cat > vm-net.xml <<EOF
<network>
  <name>lab-net</name>
  <bridge name="virbr10"/>
  <forward mode="nat"/>
  <ip address="192.168.50.1" netmask="255.255.255.0">
  </ip>
</network>
EOF

virsh net-define vm-net.xml
virsh net-start lab-net
virsh net-autostart lab-net
```

✅ This creates a NAT network `192.168.50.0/24`.

---

#### Step 2 – Define and install VMs

```bash
# Example for 'web' VM
virt-install \
  --name web \
  --ram 1024 \
  --vcpus 1 \
  --disk path=/var/lib/libvirt/images/web.qcow2,size=10 \
  --os-variant ubuntu22.04 \
  --network network=lab-net \
  --cdrom /var/lib/libvirt/boot/ubuntu-22.04.iso \
  --graphics none
```

Repeat with `--name db` and `--name client`.

---

#### Step 3 – Configure services

On **web VM**:

```bash
sudo apt update
sudo apt install -y nginx
echo "Hello from KVM Web VM" | sudo tee /var/www/html/index.html
```

On **db VM**:

```bash
sudo apt install -y mysql-server
sudo systemctl enable --now mysql
```

On **client VM**:

```bash
curl http://192.168.50.10  # replace with web VM IP
```

✅ If you see the message, networking works!

---

# 🧪 **Project 2 – VM Snapshot & Rollback with Automation**

### Problem:

We want the ability to quickly roll back a VM (e.g., `web`) to a clean state using **snapshots**.

### Solution:

#### Step 1 – Create snapshot

```bash
virsh snapshot-create-as --domain web clean-install \
  "Clean installation snapshot" --atomic
```

Check snapshots:

```bash
virsh snapshot-list web
```

---

#### Step 2 – Make changes (simulate)

```bash
ssh user@web "echo 'Hacked!' | sudo tee /var/www/html/index.html"
curl http://192.168.50.10
# Output: "Hacked!"
```

---

#### Step 3 – Roll back to snapshot

```bash
virsh snapshot-revert web clean-install --running
```

Check again:

```bash
curl http://192.168.50.10
# Output: "Hello from KVM Web VM"
```

✅ System is restored instantly.

---
