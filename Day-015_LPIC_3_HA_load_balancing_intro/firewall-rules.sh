#!/bin/bash
# Example UFW firewall rules for HA cluster nodes
# Run as root

ufw --force reset

ufw default deny incoming
ufw default allow outgoing

# Allow SSH from admin network (adjust to your network)
ufw allow from 192.168.56.0/24 to any port 22 proto tcp

# Allow HTTP/HTTPS (only on load balancers)
ufw allow 80/tcp
ufw allow 443/tcp

# Allow NFSv4 between internal hosts
ufw allow from 192.168.56.0/24 to any port 2049

ufw enable
ufw status verbose
