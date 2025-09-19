
### ✅ Project 1: Automated Backup Script

```bash
#!/bin/bash
set -e
BACKUP_DIR="/tmp/backups"
mkdir -p $BACKUP_DIR
tar -czf $BACKUP_DIR/etc-backup-$(date +%F).tar.gz /etc
echo "Backup completed: $BACKUP_DIR/etc-backup-$(date +%F).tar.gz"
```

**What it does:**

* Compresses `/etc`
* Appends current date
* Stops if error occurs (`set -e`)

---

### ✅ Project 2: User Provisioning from File

```bash
#!/bin/bash
set -e
INPUT="users.txt"
while read user; do
  if id "$user" &>/dev/null; then
    echo "User $user already exists"
  else
    useradd $user
    echo "User $user created"
  fi
done < $INPUT
```

**users.txt:**

```
alice
bob
charlie
```

**What it does:**

* Reads usernames from file
* Adds them if they don’t exist
* Useful for onboarding automation

---

### ✅ Bonus Pro Project (Extra) – Log Monitor with Alerts

```bash
#!/bin/bash
LOG="/var/log/syslog"
KEYWORD="error"
tail -Fn0 $LOG | while read line; do
  echo "$line" | grep "$KEYWORD" && echo "ALERT: Error found!"
done
```

👉 Streams logs and prints alert when keyword appears.

---

# 💡 Key Professional Takeaways

* Bash scripting is the **entry-point to Infrastructure as Code (IaC)**.
* Always **modularize and validate inputs** to avoid production issues.
* Use Bash for **light automation**, but move to **Python or Ansible** for large-scale automation.
* Scripts + cron jobs = **hands-free sysadmin work**.

