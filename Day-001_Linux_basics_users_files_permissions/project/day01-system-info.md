
---

## 📘 `projects/day01-system-info.md`

```markdown
# 📂 Day 001 Project – System Info Script

## 🎯 Goal
Build a simple **bash script** that displays basic system information:
- Hostname
- Uptime
- Disk usage

---

## 📜 Script: `system-info.sh`

```bash
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


▶️ How to Use

Make the script executable:

chmod +x system-info.sh


Run the script:

./system-info.sh

📊 Example Output
=============================
   Linux System Information
=============================

📌 Hostname: devops-vm
⏱️  Uptime: up 2 hours, 14 minutes

💾 Disk Usage:
/dev/sda1        50G   15G   33G  30% /

✅ Key Takeaways
Learned how to create and run a shell script

Practiced using hostname, uptime, and df

Combined commands into a reusable tool

Learned how to create and run a shell script

Practiced using hostname, uptime, and df

Combined commands into a reusable tool
