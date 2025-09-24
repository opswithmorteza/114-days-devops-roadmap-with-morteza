# Day 16 – Virtualization with KVM

This project explores virtualization with **KVM (Kernel-based Virtual Machine)** as part of the **114 Days DevOps Roadmap**.

## 📚 What I Learned
- KVM installation & verification
- VM creation with `virt-install` and `virt-manager`
- Custom NAT networking with libvirt XML
- Snapshots, migration, and resource management

## 🛠️ Project Setup
- Built a 3-node VM environment (Webserver + DB + Fileserver)
- Configured shared storage via NFS
- Automated networking with `virsh`
- Practiced snapshots & live migration

## 🚀 How to Use
1. Install KVM and libvirt on your host machine.
2. Import the `vm-network.xml` file using:
   ```bash
   virsh net-define vm-network.xml
   virsh net-start devops-net
   virsh net-autostart devops-net
   ```
3. Run the automation script:
   ```bash
   bash project-setup.sh
   ```

## 🔗 LinkedIn Post
See my Day 16 reflection on LinkedIn!
