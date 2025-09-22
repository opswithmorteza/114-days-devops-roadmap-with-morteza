#!/bin/bash
# provision-haproxy.sh <role(master|backup)> <virtual-ip>
set -euo pipefail
ROLE=${1:-master}
VIP=${2:-192.168.56.200}

apt update
DEBIAN_FRONTEND=noninteractive apt install -y haproxy keepalived

# place haproxy config (assumes haproxy.cfg is present in cwd)
cp haproxy.cfg /etc/haproxy/haproxy.cfg
systemctl enable haproxy
systemctl restart haproxy

# install keepalived config based on role
if [ "$ROLE" = "master" ]; then
  cp keepalived-master.conf /etc/keepalived/keepalived.conf
else
  cp keepalived-backup.conf /etc/keepalived/keepalived.conf
fi

systemctl enable keepalived
systemctl restart keepalived

echo "Provisioned HAProxy node ($ROLE) with VIP $VIP"
