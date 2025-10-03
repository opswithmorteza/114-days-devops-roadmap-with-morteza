# 📘 Day 25 – Performance Tuning II (Advanced Linux Performance Optimization)

## 🔹 Introduction

Performance tuning in Linux is not just about checking `top` and `free`.
It’s about **measuring**, **analyzing bottlenecks**, and **tuning system resources** (CPU, memory, disk, and network).
Yesterday (Day 24) we covered the basics.
Today (Day 25), we **push further** into **advanced tools, kernel tuning, and real-world stress testing**.

---

## 1. Advanced Monitoring Tools

### htop (advanced usage)

```bash
htop
```

* Press `F6` → sort by I/O, memory, CPU.
* Press `F2` → configure columns like **IO load**, **NUMA node**, etc.
* Press `H` → show threads.

✅ Helps identify which process is bottlenecking.

---

### atop – Historical Monitoring

```bash
sudo apt install atop -y
sudo atop
```

Unlike `htop`, `atop` logs system activity.
It can show **processes that already finished** and still consumed resources.

Example:

```bash
sudo atop -r /var/log/atop/atop_2025MMDD
```

✅ Useful for **post-incident analysis**.

---

### sar – Long-Term Metrics

```bash
sudo apt install sysstat -y
sar -u 1 5
```

Output:

```
12:05:01 AM     CPU     %user   %system  %iowait   %idle
12:05:02 AM     all     15.00    4.00     0.50     80.50
```

✅ Measures **user/system CPU usage** with historical data.

---

### dstat – Combined Metrics

```bash
dstat -cdngy --top-cpu --top-mem
```

Shows CPU, disk, network, and top processes **together**.

---

## 2. CPU Optimization

### CPU Affinity (taskset)

Pin process to a specific CPU:

```bash
taskset -c 0 ./myprocess
```

Check affinity:

```bash
taskset -cp 1234
```

✅ Ensures critical tasks don’t get interrupted.

---

### Scheduling Policies (chrt)

Default Linux scheduler = CFS.
But you can give **real-time priority**:

```bash
sudo chrt -f 99 ./critical_task
```

Check:

```bash
chrt -p 1234
```

✅ For **low-latency workloads** (e.g., VoIP, trading).

---

### Tuning CFS

```bash
cat /proc/sys/kernel/sched_latency_ns
```

Change scheduling latency:

```bash
echo 6000000 | sudo tee /proc/sys/kernel/sched_latency_ns
```

✅ Fine-tunes process switching.

---

## 3. Memory Optimization

### Transparent HugePages (THP)

THP allows memory pages of **2MB instead of 4KB** → less TLB misses.
Check:

```bash
cat /sys/kernel/mm/transparent_hugepage/enabled
```

Disable (sometimes needed for DBs):

```bash
echo never | sudo tee /sys/kernel/mm/transparent_hugepage/enabled
```

---

### NUMA Awareness

Check NUMA nodes:

```bash
numactl --hardware
```

Run process bound to NUMA node 0:

```bash
numactl --cpunodebind=0 --membind=0 ./mydb
```

✅ Reduces latency in multi-socket systems.

---

### Dropping Cache

```bash
sudo sh -c "echo 3 > /proc/sys/vm/drop_caches"
```

✅ Useful for **testing performance without cached data**.

---

## 4. Disk & I/O Optimization

### Disk Scheduler

Check scheduler:

```bash
cat /sys/block/sda/queue/scheduler
```

Set to deadline:

```bash
echo deadline | sudo tee /sys/block/sda/queue/scheduler
```

✅ `noop` for SSD, `deadline` for DBs, `cfq` for desktops.

---

### fio Benchmark

```bash
fio --name=randrw --ioengine=libaio --rw=randrw --bs=4k --size=1G --numjobs=4 --runtime=60 --group_reporting
```

✅ Simulates **random read/write** workload like databases.

---

## 5. Network Optimization

### TCP Congestion Control

Check current:

```bash
sysctl net.ipv4.tcp_congestion_control
```

Set BBR:

```bash
sudo sysctl -w net.ipv4.tcp_congestion_control=bbr
```

✅ BBR increases **throughput** and reduces latency.

---

### Increase Buffer Sizes

```bash
sudo sysctl -w net.core.rmem_max=134217728
sudo sysctl -w net.core.wmem_max=134217728
```

✅ Helps with **high-bandwidth connections**.

---

## 6. Stress Testing

### stress-ng

CPU:

```bash
stress-ng --cpu 4 --timeout 30s
```

Memory:

```bash
stress-ng --vm 2 --vm-bytes 512M --timeout 30s
```

---

### sysbench – Database Benchmark

Install:

```bash
sudo apt install sysbench -y
```

Prepare DB:

```bash
sysbench --db-driver=mysql --mysql-user=root --mysql-password=123 --mysql-db=testdb oltp_read_write prepare
```

Run benchmark:

```bash
sysbench --db-driver=mysql --mysql-user=root --mysql-password=123 --mysql-db=testdb oltp_read_write run
```

✅ Measures transactions per second (TPS).

---

# 🚀 Projects

### Project 1 – Web Server Load Test with Optimization

1. Deploy Nginx.
2. Run stress test:

```bash
ab -n 10000 -c 200 http://localhost/
```

3. Monitor with `htop`, `sar`.
4. Apply optimizations:

   * CPU affinity (`taskset`)
   * Enable BBR
   * Change I/O scheduler

**Deliverable**: Improved requests/sec, reduced response time.

---

### Project 2 – Database Tuning with sysbench

1. Run MySQL with default settings.
2. Benchmark with sysbench.
3. Apply:

   * Enable HugePages
   * Pin DB to specific CPU (`taskset`)
   * Increase I/O buffers
4. Benchmark again.

**Deliverable**: Higher TPS, lower latency.

---
