#!/bin/bash
# provision-web.sh <name> <ip> <index-file>
set -euo pipefail
NAME=${1:-web}
IP=${2:-127.0.0.1}
INDEX=${3:-web-index.html}

echo "Provisioning web node: $NAME ($IP)"
apt update
DEBIAN_FRONTEND=noninteractive apt install -y nginx

# create site content
sudo mkdir -p /var/www/html
sudo cp "$INDEX" /var/www/html/index.html

# simple health endpoint
echo "OK" | sudo tee /var/www/html/health

systemctl enable --now nginx
echo "Provision complete for $NAME"
