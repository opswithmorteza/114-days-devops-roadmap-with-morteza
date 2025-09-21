
# 📒 Day 13 Notes – Cron Jobs & Task Automation

## 🚀 Introduction

Automation is at the heart of DevOps. If Bash scripting is the *engine*, then **cron jobs** are the *scheduler* that keeps automation running on time. From log rotation and backups to database sync and monitoring, cron makes tasks repeatable and reliable.

Cron jobs are defined in **crontab** files, which tell the system *what to run* and *when to run it*.
Think of cron as your personal timekeeper for automation.

---

## 🧩 Cron Basics

* **Cron Daemon (`crond`)** → The background service that checks schedules.
* **Crontab File** → Configuration file containing the jobs.
* **Syntax Format (5 fields):**

```txt
* * * * * command_to_execute
- - - - -
| | | | |
| | | | +----- Day of the week (0-6, Sunday=0 or 7)
| | | +------- Month (1-12)
| | +--------- Day of month (1-31)
| +----------- Hour (0-23)
+------------- Minute (0-59)
```

Example:

```bash
30 2 * * * /home/user/backup.sh
```

➡ Runs backup.sh every day at 02:30 AM.

---

## 🔑 Important Cron Commands

### 1. View current cron jobs

```bash
crontab -l
```

➡ Lists all cron jobs for the current user.

### 2. Edit cron jobs

```bash
crontab -e
```

➡ Opens the cron configuration in the default editor.

### 3. Remove all cron jobs

```bash
crontab -r
```

### 4. Run cron job as another user (root only)

```bash
sudo crontab -u username -e
```

---

## ⚡ Common Cron Expressions

| Expression     | Meaning                           | Example Command                   |
| -------------- | --------------------------------- | --------------------------------- |
| `0 * * * *`    | Every hour                        | `echo "Hourly Job"`               |
| `0 0 * * 0`    | Every Sunday at midnight          | `systemctl restart nginx`         |
| `*/15 * * * *` | Every 15 minutes                  | `curl -s http://localhost/health` |
| `0 5 1 * *`    | On the 1st of every month at 5 AM | `tar -czf backup.tar.gz /var/www` |

---

## 🧑‍💻 Advanced Cron Techniques

### 1. Redirecting Output & Logging

```bash
0 3 * * * /usr/local/bin/backup.sh >> /var/log/backup.log 2>&1
```

➡ Saves both stdout and stderr to a log file.

### 2. Environment Variables in Cron

By default, cron jobs run in a minimal environment. Always specify paths:

```bash
PATH=/usr/local/bin:/usr/bin:/bin
```

### 3. Preventing Overlaps with `flock`

```bash
*/5 * * * * /usr/bin/flock -n /tmp/job.lock /usr/local/bin/script.sh
```

➡ Ensures the script doesn’t start again if the previous run hasn’t finished.

### 4. Using `anacron` for laptops/servers not always online

Unlike cron, `anacron` ensures missed jobs still run.

---

## 🧪 Hands-On Examples

### Example 1: Simple System Health Check

```bash
*/10 * * * * df -h >> /var/log/disk_check.log
```

➡ Logs disk usage every 10 minutes.

### Example 2: Automated Cleanup

```bash
0 1 * * * find /tmp -type f -mtime +2 -delete
```

➡ Deletes files older than 2 days from `/tmp` daily at 1 AM.

---

## 🛠️ Pro Tips

* Always test scripts manually before scheduling with cron.
* Use **absolute paths** in cron (e.g., `/usr/bin/python3` instead of `python3`).
* Redirect logs to track cron failures.
* Secure your cron jobs — don’t schedule sensitive tasks under normal users.

---

# 🧪 Projects

## 🔹 Project 1: Automated Log Rotation & Archiving

**Goal:** Keep `/var/log/app/` clean by compressing and archiving old logs.

**Script (`logrotate.sh`):**

```bash
#!/bin/bash
LOG_DIR="/var/log/app"
ARCHIVE_DIR="/var/log/archive"
DATE=$(date +%F)

mkdir -p $ARCHIVE_DIR
find $LOG_DIR -type f -name "*.log" -mtime +7 -exec tar -czf $ARCHIVE_DIR/logs_$DATE.tar.gz {} +
find $LOG_DIR -type f -name "*.log" -mtime +7 -delete
```

**Cron job:**

```bash
0 2 * * * /usr/local/bin/logrotate.sh >> /var/log/logrotate.log 2>&1
```

➡ Runs daily at 2 AM, archives logs older than 7 days, deletes originals.

---

## 🔹 Project 2: Website Uptime Monitor with Alerts

**Goal:** Check if a website is online; send alert if down.

**Script (`uptime_check.sh`):**

```bash
#!/bin/bash
URL="https://example.com"
LOGFILE="/var/log/uptime_check.log"

if curl -s --head $URL | grep "200 OK" > /dev/null; then
    echo "$(date): $URL is UP" >> $LOGFILE
else
    echo "$(date): $URL is DOWN" >> $LOGFILE
    echo "Website $URL is DOWN!" | mail -s "ALERT" admin@example.com
fi
```

**Cron job:**

```bash
*/5 * * * * /usr/local/bin/uptime_check.sh
```

➡ Runs every 5 minutes, logs status, emails admin if site is down.

---


---

# 📘 Training – Day 13: Advanced Bash Scripting

Bash is the heart of automation in DevOps. Today, we go beyond basics and explore **advanced features** that make Bash powerful for real-world automation.

---

## 🔹 Core Advanced Topics

1. **Functions in Bash**

   * Encapsulate reusable logic.

   ```bash
   # function with arguments
   greet() {
       echo "Hello, $1! Welcome to DevOps."
   }
   greet "Morteza"
   ```

2. **Exit Codes & Error Handling**

   * Every command returns a status code (`$?`).
   * `0 = success`, anything else = error.

   ```bash
   ls /not/here
   echo $?   # returns non-zero (error)
   ```

   * Use `set -e` (exit on error) or trap failures.

   ```bash
   set -e
   command_that_might_fail
   echo "This won’t run if the command fails"
   ```

3. **Traps (signal handling)**

   * Clean up resources when script exits.

   ```bash
   trap "echo 'Cleaning up…'; rm -f temp.txt" EXIT
   ```

4. **Arrays**

   ```bash
   devops_tools=("Docker" "Kubernetes" "Ansible")
   for tool in "${devops_tools[@]}"; do
       echo "Learning $tool"
   done
   ```

5. **Regex and Pattern Matching**

   ```bash
   email="opswithmorteza@gmail.com"
   if [[ $email =~ ^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$ ]]; then
       echo "Valid email"
   else
       echo "Invalid email"
   fi
   ```

6. **HereDocs & HereStrings**

   ```bash
   cat <<EOF > config.txt
   server {
       listen 80;
       server_name example.com;
   }
   EOF
   ```

7. **Parallel Execution (Background jobs)**

   ```bash
   ping -c 2 google.com &
   ping -c 2 github.com &
   wait
   echo "All pings completed"
   ```

---

## 🔹 Pro Tips for DevOps Engineers

* **Always validate input** to avoid script injection risks.
* **Use `set -euo pipefail`** in production scripts for safe execution.
* **Log everything** with timestamps:

  ```bash
  echo "$(date) – INFO: Starting backup..."
  ```
* **Combine Bash with other tools** (e.g., `jq`, `awk`, `sed`) for super-powerful automation.
* **Prefer idempotent scripts** — running them multiple times should not break the system.

💡 **Mindset:** *"A good Bash script is predictable, reusable, and safe."*

---

# 🧪 Projects (with solutions)

### ✅ Project 1: Log File Analyzer

**Goal:** Parse `/var/log/syslog` and count occurrences of each log level (INFO, ERROR, WARN).

**Script (log-analyzer.sh):**

```bash
#!/bin/bash
set -euo pipefail

logfile="/var/log/syslog"

declare -A count

while read -r line; do
  if [[ $line =~ (INFO|ERROR|WARN) ]]; then
    level="${BASH_REMATCH[1]}"
    ((count[$level]++))
  fi
done < "$logfile"

echo "Log summary:"
for key in "${!count[@]}"; do
  echo "$key: ${count[$key]}"
done
```

---

### ✅ Project 2: Parallel Backup Script

**Goal:** Backup multiple directories to `/tmp/backup/` in parallel.

**Script (backup.sh):**

```bash
#!/bin/bash
set -euo pipefail

dirs=("/etc" "/var/log" "/home")
backup_dir="/tmp/backup"
mkdir -p "$backup_dir"

for d in "${dirs[@]}"; do
    tar -czf "$backup_dir/$(basename $d).tar.gz" "$d" &
done

wait
echo "All backups completed successfully!"
```



