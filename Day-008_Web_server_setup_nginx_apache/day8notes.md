
# 📒 Day 8 Notes – Linux System Monitoring & Performance Tuning

## 🔹 What You Will Learn Today

Today is all about **monitoring system performance and tuning Linux for efficiency**.
We’ll cover:

* System monitoring basics (CPU, memory, disk, processes)
* Important tools: `top`, `htop`, `vmstat`, `iostat`, `sar`, `dstat`
* Log monitoring with `journalctl` & `/var/log/`
* Performance tuning: `sysctl`, `ulimit`, kernel parameters
* Advanced tools: `atop`, `iotop`, `nmon`, `perf`, `strace`
* Best practices for proactive monitoring

---

## 🔹 Core Monitoring Commands

### 1. `top`

Interactive real-time process monitoring.

```bash
top
```

* Shows CPU, memory usage, process IDs
* Press `M` to sort by memory, `P` to sort by CPU

---

### 2. `htop` (improved top)

```bash
htop
```

* Colorful, scrollable, easier to use
* Allows killing processes with F9
* Displays CPU cores individually

---

### 3. `vmstat`

Reports memory, CPU, and process statistics.

```bash
vmstat 2 5
```

* Refresh every 2s, 5 times

---

### 4. `iostat`

Monitor CPU load & disk I/O stats.

```bash
iostat -xz 2
```

* `-x` gives extended stats
* `-z` hides unused devices

---

### 5. `sar`

System activity reports over time.

```bash
sar -u 5 3
```

* CPU usage every 5s, 3 samples

---

### 6. `dstat`

Versatile monitoring tool.

```bash
dstat -c --top-mem --top-cpu
```

* Shows CPU + top processes

---

### 7. `journalctl` & `/var/log/`

```bash
journalctl -xe
tail -f /var/log/syslog
```

* Check logs in real time

---

## 🔹 Performance Tuning

### 1. `ulimit`

Control per-user resource limits.

```bash
ulimit -n 65535    # max open files
ulimit -u 4096     # max processes
```

---

### 2. `sysctl`

Modify kernel parameters at runtime.

```bash
sysctl -a                 # list all parameters
sysctl -w net.ipv4.ip_forward=1
```

Make permanent in `/etc/sysctl.conf`.

---

### 3. Swap tuning

```bash
sysctl -w vm.swappiness=10
```

* Lower swappiness makes system prefer RAM over swap

---

### 4. CPU affinity

```bash
taskset -c 0,1 <command>
```

* Pin process to CPU cores

---

### 5. Process tracing

```bash
strace -p <PID>
```

* Debug system calls

---

## 🔹 Advanced Tools

* `atop` → detailed resource usage (logging supported)
* `iotop` → per-process I/O monitoring
* `nmon` → interactive performance dashboard
* `perf` → kernel-level performance profiler

---

## 🔹 Best Practices

1. Always monitor before tuning → “Don’t fix what you can’t measure.”
2. Automate log rotation & monitoring alerts
3. Use `sar`/`atop` for historical analysis
4. Use `sysctl` & `ulimit` carefully (test before production)

---

