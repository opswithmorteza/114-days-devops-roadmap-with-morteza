
# 🛠 Day 8 Projects – Linux Monitoring & Performance

## Project 1 – Monitor and Tune a Web Server

### Goal:

Ensure a running Apache/Nginx server can handle load efficiently.

### Steps:

1. Start a simple web server (e.g., `nginx`).
2. Run `ab -n 1000 -c 50 http://localhost/` to simulate load.
3. Monitor with:

   ```bash
   top
   iostat -xz 2
   sar -u 2 5
   ```
4. Tune:

   * Increase `ulimit -n 65535` for file descriptors
   * Adjust `/etc/sysctl.conf`:

     ```ini
     net.core.somaxconn=65535
     net.ipv4.tcp_fin_timeout=10
     ```
5. Test again with `ab` and compare performance.

### Expected Output:

* Lower response time
* More stable CPU & memory usage

---

## Project 2 – System Resource Dashboard Script

### Goal:

Automate system monitoring into a single script.

### Example Script:

```bash
#!/bin/bash
echo "==== System Resource Dashboard ===="
echo "CPU Load:"
uptime
echo
echo "Top Processes by CPU & MEM:"
ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%cpu | head
echo
echo "Disk I/O:"
iostat -xz 1 3
echo
echo "Memory Usage:"
free -h
echo
echo "Network Stats:"
sar -n DEV 1 3
```

Run:

```bash
chmod +x monitor.sh
./monitor.sh
```

### Expected Output:

* One dashboard with CPU, MEM, Disk, Network stats

---

📌 **Mantra of the day**:
*"Monitoring is measurement before tuning. If you can’t measure it, you can’t improve it."*
