#!/bin/bash
# Project setup script for Day 16 - KVM Virtualization

# Create 3 VMs automatically (web, db, fileserver)
for vm in web db fileserver; do
  virt-install    --name devops-$vm    --ram 1024    --disk path=/var/lib/libvirt/images/devops-$vm.img,size=10    --vcpus 1    --os-type linux    --os-variant ubuntu20.04    --network network=devops-net    --graphics none    --cdrom /var/lib/libvirt/boot/ubuntu.iso    --noautoconsole
done

echo "✅ 3 VMs created (web, db, fileserver) on devops-net"
