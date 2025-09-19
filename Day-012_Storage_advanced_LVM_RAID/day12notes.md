
# 📒 Day 12 – Bash Scripting Basics (Deep Dive)

## 🔹 Why Bash Scripting Matters

Bash (Bourne Again SHell) is the **default shell in most Linux systems** and the **glue of automation in DevOps**. With Bash you can:

* Automate repetitive tasks (backups, monitoring, deployments)
* Create system setup scripts for servers
* Integrate tools like Docker, Kubernetes, or Ansible
* Build CI/CD pipelines at the shell level

Without scripting, you’re typing commands manually. With Bash, you’re **documenting logic + automating workflows**.

---

## 🔹 Core Concepts

### 1. The Shebang (`#!`)

The first line of any script tells the OS which interpreter to use.

```bash
#!/bin/bash
```

👉 Always include this at the top.

---

### 2. Variables

```bash
#!/bin/bash
NAME="Morteza"
AGE=27
echo "My name is $NAME and I am $AGE years old."
```

👉 Variables can hold strings, numbers, and command output.

---

### 3. Command Substitution

Run commands inside variables:

```bash
DATE=$(date +%F)
echo "Today is $DATE"
```

---

### 4. Arguments

```bash
#!/bin/bash
echo "Script name: $0"
echo "First arg: $1"
echo "Second arg: $2"
```

👉 `$@` = all args, `$#` = number of args.

---

### 5. Input from User

```bash
#!/bin/bash
read -p "Enter your username: " USERNAME
echo "Welcome $USERNAME!"
```

---

### 6. Conditionals

```bash
#!/bin/bash
if [ -f "/etc/passwd" ]; then
  echo "passwd exists"
else
  echo "passwd not found"
fi
```

👉 Use `[ -f ]` for files, `[ -d ]` for directories, `[ -z ]` for empty string.

---

### 7. Loops

**For loop:**

```bash
for i in {1..5}; do
  echo "Count: $i"
done
```

**While loop:**

```bash
count=1
while [ $count -le 3 ]; do
  echo "Iteration $count"
  ((count++))
done
```

---

### 8. Functions

```bash
#!/bin/bash
greet() {
  echo "Hello $1"
}
greet "DevOps"
```

---

### 9. Exit Codes & Error Handling

```bash
#!/bin/bash
ls /etc > /dev/null
echo "Exit code: $?"
```

👉 `0` = success, `1+` = error.
Pro tip: Use `set -e` at the top to stop script on first error.

---

### 10. Logging

```bash
#!/bin/bash
echo "Starting backup..." | tee -a backup.log
```

👉 `tee` logs to file + prints to screen.

---

### 11. Scheduling (cron + scripts)

Scripts become powerful when combined with **cron jobs**:

```bash
0 2 * * * /home/morteza/backup.sh
```

👉 Runs backup every night at 2 AM.

---

### 12. Advanced Tips

* Use `trap` to catch signals (e.g., clean temp files on exit).
* Always validate input with `[[ ]]`.
* Combine with `awk`, `sed`, `grep` for data processing.
* Write modular scripts (functions + configs).
* Use `shellcheck` to lint scripts.

---
