#!/bin/bash
# Simple system information script

echo "============================="
echo "   Linux System Information  "
echo "============================="
echo
echo "📌 Hostname: $(hostname)"
echo "⏱️  Uptime: $(uptime -p)"
echo
echo "💾 Disk Usage:"
df -h | grep '^/dev/'
