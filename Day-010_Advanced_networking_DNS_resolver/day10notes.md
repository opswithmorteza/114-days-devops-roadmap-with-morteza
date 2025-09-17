# 📘 **Day 10 – Linux Process Management & System Monitoring 

---

## 🔹 **1. Process Basics**

* **Process:** A running program → identified by a PID (Process ID).

* **View running processes:**

  ```bash
  ps aux
  top
  htop
  ```

* **Foreground vs Background:**

  ```bash
  ping google.com &    # run in background
  jobs                 # list background jobs
  fg %1                # bring job to foreground
  ```

* **Process Tree Visualization:**

  ```bash
  pstree -p
  ```

👉 **Pro Tip:** Process trees help identify *orphaned or stuck services* after crashes.

---

## 🔹 **2. Lifecycle of a Process**

* **States:** New → Ready → Running → Waiting → Terminated.
* **Special States:** Zombie (Z), Orphan.

Cleaning zombies:

```bash
ps aux | grep Z
kill -HUP <parent-PID>
```

---

## 🔹 **3. Scheduling & Prioritization**

* **Nice Values:** `-20` (highest priority) → `19` (lowest priority).

* **Change priority:**

  ```bash
  nice -n 10 sleep 100 &
  renice -n -5 -p <PID>
  ```

* **Realtime Scheduling (for production-critical apps):**

  ```bash
  chrt -r -p 1234   # show scheduling policy
  chrt -f -p 1234   # set FIFO scheduling
  ```

👉 **Pro Tip:** Databases often get higher priority; backups should get lower.

---

## 🔹 **4. Load Average Deep Dive**

* Represents number of **running + waiting processes**.
* **Interpretation:**

  * Load = 4 on **1 CPU system** → overloaded.
  * Load = 4 on **8-core system** → normal.
* Example:

  ```bash
  uptime
  ```

👉 Rule of thumb: **Load > number of CPUs = system under pressure**.

---

## 🔹 **5. Monitoring Tools**

* **top / htop:** CPU & RAM usage.
* **iotop:** disk I/O.
* **atop:** CPU + Memory + Disk + Network combined.
* **dstat:** real-time multi-resource monitor.
* **sar (sysstat):** historical logs.
* **systemd-cgtop:** resource usage per cgroup (useful in containerized environments).

Examples:

```bash
sar -n DEV 5 10    # network stats
atop -c -m         # memory stats
```

---

## 🔹 **6. Resource Bottlenecks**

* **CPU bound?** → High `%sy` (system time).
* **I/O bound?** → High `%wa` (I/O wait).
* **Memory Pressure?** → Check OOM killer logs:

  ```bash
  dmesg | grep -i kill
  ```

---

## 🔹 **7. Cgroups for Process Control**

* Limit resources with systemd:

  ```bash
  systemd-run --scope -p MemoryMax=500M myapp
  ```

👉 Docker and Kubernetes rely on these mechanisms behind the scenes.

---

## 🔹 **8. Containers & Processes**

* Containers use **namespaces + cgroups**.
* Container processes are still visible in the host kernel (try `htop`).

---

## 🔹 **Professional Notes & Tricks**

* **OOM Killer:** kills memory-hungry processes first.
* **Zombie vs Orphan:** Zombie = entry in process table, Orphan = adopted by PID 1.
* **Monitoring Strategy:** Combine `sar` (historical) + `atop` (real-time) + Prometheus exporters.

---


Do you also want me to prepare this **as a ready-to-paste `README.md`** file for GitHub so you don’t have to edit anything?
