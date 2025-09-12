
# 📒 Day 5 Notes – Linux Process Management

## 🔹 1. Introduction: What is a Process?

* A **process** is a running instance of a program.
* Each process has:

  * **PID (Process ID):** Unique identifier.
  * **PPID (Parent Process ID):** The process that spawned it.
  * **UID/GID:** User & group ownership.
  * **State:** Running, sleeping, stopped, zombie, etc.
* Linux is a **multi-tasking** OS → multiple processes run concurrently.

---

## 🔹 2. Important Commands

### **`ps` – Process Status**

Shows running processes.

```bash
ps
ps -e        # show all processes
ps -ef       # full format (UID, PID, PPID, CMD)
ps -u user   # processes by specific user
```

**Output example:**

```
UID   PID  PPID  C STIME TTY          TIME CMD
root     1     0  0 09:00 ?        00:00:02 systemd
morteza 1234  1200  0 09:10 pts/0  00:00:00 bash
```

---

### **`top` – Real-time Process Monitoring**

Interactive tool to monitor CPU, memory, and process usage.

```bash
top
```

* Press **q** → quit
* Press **k** → kill a process
* Press **h** → help

---

### **`htop` – Enhanced Top**

More user-friendly (colorful, scrollable).

```bash
htop
```

* Requires installation: `sudo apt install htop`

---

### **`kill` – Sending Signals**

Terminate processes by PID.

```bash
kill 1234          # default signal TERM (15)
kill -9 1234       # force kill (SIGKILL)
kill -STOP 1234    # pause process
kill -CONT 1234    # resume process
```

---

### **`pkill` – Kill by Name**

```bash
pkill firefox     # kills all firefox processes
```

---

### **`jobs`, `fg`, `bg` – Job Control**

* Run a process in background with `&`:

```bash
sleep 1000 &
```

* List jobs:

```bash
jobs
```

* Bring job to foreground:

```bash
fg %1
```

* Send job to background:

```bash
bg %1
```

---

### **`nice` and `renice` – Process Priority**

* **Nice value** (-20 to 19) → lower value = higher priority.

```bash
nice -n 10 command   # run command with lower priority
renice -n -5 -p 1234 # change priority of PID 1234
```

---

## 🔹 3. Process States

* **R:** Running
* **S:** Sleeping
* **T:** Stopped
* **Z:** Zombie (process finished but parent didn’t collect it)

Example:

```bash
ps -o pid,stat,cmd
```

---

## 🔹 4. Signals (Common)

* **SIGTERM (15):** Graceful termination.
* **SIGKILL (9):** Force kill.
* **SIGSTOP:** Pause.
* **SIGCONT:** Resume.

---



