# Day 16 – Deep Dive Notes on KVM Virtualization

## 1. KVM Installation & Verification
```bash
sudo apt install qemu-kvm libvirt-daemon-system virt-manager -y
lsmod | grep kvm
```
Output:
```
kvm_intel             327680  0
kvm                   1060864 1 kvm_intel
```

## 2. Create a Virtual Machine
```bash
virt-install  --name devops-web  --ram 2048  --disk path=/var/lib/libvirt/images/devops-web.img,size=10  --vcpus 2  --os-type linux  --os-variant ubuntu20.04  --network network=devops-net  --graphics none  --cdrom /var/lib/libvirt/boot/ubuntu.iso
```

## 3. Custom Networking with XML
vm-network.xml defines a NAT network:
```xml
<network>
  <name>devops-net</name>
  <bridge name='virbr1' stp='on' delay='0'/>
  <ip address='192.168.100.1' netmask='255.255.255.0'>
    <dhcp>
      <range start='192.168.100.2' end='192.168.100.254'/>
    </dhcp>
  </ip>
</network>
```

## 4. Snapshots
```bash
virsh snapshot-create-as devops-web pre-update
virsh snapshot-list devops-web
```

## 5. Live Migration (example)
```bash
virsh migrate --live devops-web qemu+ssh://node2/system
```

---
