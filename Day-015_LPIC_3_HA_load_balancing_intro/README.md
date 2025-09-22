# Day 15 – High Availability & Clustering (LPIC-3)

## Overview
This lab sets up a production-grade HA cluster:
- 2 HAProxy load balancers (Keepalived for failover)
- 3 backend Nginx web servers
- Shared NFS storage (optional)
- Firewall hardening

This package includes configs and provisioning scripts to reproduce the environment on virtual machines.

## Files
- `haproxy.cfg` → HAProxy config (frontend, backends, health checks, stats)
- `keepalived-master.conf` → Keepalived config for MASTER node
- `keepalived-backup.conf` → Keepalived config for BACKUP node
- `nfs-setup.md` → Steps to setup NFS server & client
- `firewall-rules.sh` → Example firewall rules (UFW)
- `provision-web.sh` → Provision script for backend web nodes (nginx + index)
- `provision-haproxy.sh` → Provision script for haproxy nodes (haproxy + keepalived)
- `backup-sync.sh` → Example encrypted backup transfer script
- `web-index-web1.html`, `web-index-web2.html`, `web-index-web3.html` → sample site pages

## Quick Usage (example)
1. Create VMs:
   - web1: 192.168.56.101
   - web2: 192.168.56.102
   - web3: 192.168.56.103
   - haproxy1: 192.168.56.201 (MASTER)
   - haproxy2: 192.168.56.202 (BACKUP)
   - virtual IP: 192.168.56.200 (kept by Keepalived)

2. On each web VM: upload `provision-web.sh`, make it executable and run:
   ```bash
   sudo bash provision-web.sh web1 192.168.56.101 web-index-web1.html
   ```
   adjust args for web2/web3.

3. On haproxy nodes: upload `provision-haproxy.sh`, `haproxy.cfg`, `keepalived-master.conf` (or backup version), make executable and run:
   ```bash
   sudo bash provision-haproxy.sh master 192.168.56.200
   # on backup
   sudo bash provision-haproxy.sh backup 192.168.56.200
   ```

4. Test:
   - Visit http://192.168.56.200/ (virtual IP)
   - Stop HAProxy/Keepalived on MASTER to test failover:
     ```bash
     sudo systemctl stop keepalived
     # or
     sudo systemctl stop haproxy
     ```
   - Requests should continue served by BACKUP.

## Notes & Safety
- These scripts are for **lab/testing** only. Review and adapt for production.
- Keepalived uses VRRP; running multiple instances on same network may conflict—ensure unique virtual_router_id on shared networks.
- For SSL in production, use Let's Encrypt or a proper CA.

