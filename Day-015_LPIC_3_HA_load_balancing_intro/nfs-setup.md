# NFS Setup Guide (Server & Client)

## NFS Server (example on 192.168.56.101)
1. Install NFS server:
```bash
sudo apt update
sudo apt install -y nfs-kernel-server
```

2. Create export directory and set permissions:
```bash
sudo mkdir -p /srv/www_shared
sudo chown -R www-data:www-data /srv/www_shared
sudo chmod 2775 /srv/www_shared
```

3. Add export to /etc/exports:
```
/srv/www_shared 192.168.56.0/24(rw,sync,no_subtree_check)
```

4. Apply exports:
```bash
sudo exportfs -rav
sudo systemctl restart nfs-kernel-server
```

## NFS Client
1. Install client tools:
```bash
sudo apt install -y nfs-common
```

2. Mount on client:
```bash
sudo mkdir -p /var/www/shared
sudo mount 192.168.56.101:/srv/www_shared /var/www/shared
```

3. Persistent mount:
Add to `/etc/fstab`:
```
192.168.56.101:/srv/www_shared /var/www/shared nfs defaults 0 0
```
