# 📘 Day 24 – Performance Tuning (Part I)

---

## 1. Introduction

Performance tuning in Linux is about identifying bottlenecks and improving:

* **CPU usage**
* **Memory management**
* **Disk I/O**
* **Network throughput**

Goal: achieve optimal performance without wasting resources.

---

## 2. Basic Monitoring Tools (Beginner Level)

### 2.1 CPU Usage

Check CPU load:

```bash
uptime
```

Output:

```
 10:32:45 up 5 days,  4:11,  2 users,  load average: 0.25, 0.42, 0.30
```

* **Load average** → 1, 5, 15 min average.
* A rule of thumb: if load > number of CPUs → system is overloaded.

Check CPU details:

```bash
lscpu
```

Real-time monitoring:

```bash
top
```

Press `1` in `top` → per-CPU usage.

---

### 2.2 Memory Usage

```bash
free -h
```

Output:

```
              total        used        free      shared  buff/cache   available
Mem:           15Gi       3.5Gi       7.0Gi       120Mi       4.5Gi        11Gi
Swap:         2.0Gi       0.0Gi       2.0Gi
```

Check memory-intensive processes:

```bash
ps aux --sort=-%mem | head
```

---

### 2.3 Disk I/O

Check I/O performance:

```bash
iostat -x 1 3
```

Check disk usage:

```bash
df -h
```

Identify heavy processes:

```bash
iotop
```

---

### 2.4 Network Usage

Check bandwidth usage:

```bash
iftop
```

Ping latency:

```bash
ping -c 5 google.com
```

---

## 3. Intermediate Tuning Techniques

### 3.1 Process Priorities (Nice & Renice)

Start a process with lower priority:

```bash
nice -n 10 ./myscript.sh
```

Change priority of running process:

```bash
renice +5 -p 1234
```

Check:

```bash
ps -o pid,comm,nice -p 1234
```

---

### 3.2 Swap Tuning

Check swappiness:

```bash
cat /proc/sys/vm/swappiness
```

Default = `60`. Lowering to 10 reduces swap usage:

```bash
sudo sysctl -w vm.swappiness=10
```

Persist:

```bash
echo "vm.swappiness=10" | sudo tee -a /etc/sysctl.conf
```

---

### 3.3 Filesystem Mount Options

Mount with `noatime` (don’t update access time → faster reads):

```bash
sudo mount -o remount,noatime /dev/sda1 /
```

---

## 4. Advanced Tuning (Pro Level)

### 4.1 Kernel Parameters (sysctl)

Check all runtime parameters:

```bash
sysctl -a
```

Optimize TCP for high-throughput servers:

```bash
sudo sysctl -w net.core.somaxconn=1024
sudo sysctl -w net.ipv4.tcp_fin_timeout=10
```

Persist in `/etc/sysctl.conf`.

---

### 4.2 Performance Profiling with `perf`

Install:

```bash
sudo apt install linux-tools-common linux-tools-generic -y
```

Profile CPU:

```bash
sudo perf stat ls
```

Record & analyze:

```bash
sudo perf record -g ls
sudo perf report
```

---

### 4.3 Cgroups & Resource Control

Limit CPU usage of a process:

```bash
cgcreate -g cpu:/limited
cgset -r cpu.shares=200 limited
cgexec -g cpu:/limited ./myprocess
```

---

## 5. Projects 🚀

### 🔹 Project 1: Web Server Performance Tuning

1. Install Apache or Nginx.
2. Use `ab` (Apache Benchmark) to simulate load:

   ```bash
   ab -n 1000 -c 50 http://localhost/
   ```
3. Monitor with `top`, `iotop`, `iftop`.
4. Tune:

   * Adjust worker processes in Nginx config.
   * Reduce `vm.swappiness`.
   * Add `noatime` mount option.

✅ Deliverable: Improved response time under load.

---

### 🔹 Project 2: Database Performance Optimization

1. Install MySQL or PostgreSQL.
2. Insert large dataset.
3. Monitor memory usage with `free -h`.
4. Tune:

   * Increase cache size in DB config.
   * Limit I/O with `ionice`.
   * Optimize queries (EXPLAIN).

✅ Deliverable: Faster query execution after tuning.
