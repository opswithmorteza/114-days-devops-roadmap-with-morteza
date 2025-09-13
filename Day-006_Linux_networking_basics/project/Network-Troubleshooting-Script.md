## 🔹 Projects

### 🧪 Project 1 – Network Troubleshooting Script

**Goal:** Automate basic network health checks.
**Steps:**

1. Check IP (`ip addr`)
2. Test DNS (`dig google.com`)
3. Test connectivity (`ping`)
4. Test default route (`ip route`)
5. Save results in a log file

**Example script (`netcheck.sh`):**

```bash
#!/bin/bash
echo "=== Network Check Report ==="
date
echo
ip addr | grep inet
ping -c 2 google.com
dig google.com +short
ip route show
```

**Run:**

```bash
bash netcheck.sh
```

→ Produces a health report for quick troubleshooting.

---

### 🧪 Project 2 – Local Web Service Test

**Goal:** Combine networking + processes + permissions from Days 1–6.

1. Start a simple web server:

   ```bash
   python3 -m http.server 8080 &
   ```

   → Runs HTTP server on port 8080.

2. Verify it’s running:

   ```bash
   ss -tulnp | grep 8080
   ```

3. Test access:

   ```bash
   curl http://localhost:8080
   ```

4. Restrict access with firewall:

   ```bash
   sudo ufw deny 8080/tcp
   ```

5. Test again (should fail).

✅ This project teaches **process management, ports, firewalls, and monitoring in one go**.

---

👉 So Day 6 will give you both **theory (networking fundamentals)** and **hands-on troubleshooting projects** that are real-world useful.
