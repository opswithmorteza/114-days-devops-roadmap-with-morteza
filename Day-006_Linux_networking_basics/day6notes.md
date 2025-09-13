
### 📌 Day 6 – Linux Networking Basics

---

## 🔹 What we’ll cover today

On **Day 6**, our focus is **Linux Networking Essentials** — the foundation for every SysAdmin, DevOps engineer, and cloud architect.
We’ll cover:

1. **Network configuration basics**

   * IP addresses (IPv4/IPv6)
   * Subnet mask, Gateway, DNS
2. **Checking & troubleshooting connectivity**

   * `ping`, `traceroute`, `curl`, `wget`
3. **Viewing & managing network interfaces**

   * `ifconfig` (legacy)
   * `ip addr`, `ip link`, `ip route` (modern replacement)
4. **Testing open ports & services**

   * `netstat`, `ss`, `telnet`, `nc` (netcat)
5. **Domain name resolution**

   * `nslookup`, `dig`, `/etc/resolv.conf`
6. **Network monitoring**

   * `tcpdump`, `iftop`, `nload`
7. **Firewall basics (intro for later)**

   * `iptables`, `ufw`

At the end, we’ll build **two practical projects** combining everything from **Day 1 to Day 6**.

---

## 🔹 Commands with Explanation + Examples

### 1. **Check your IP address**

```bash
ip addr show
```

* Displays all network interfaces & IPs.
* Example output:

  ```
  2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500
      inet 192.168.1.15/24 brd 192.168.1.255 scope global eth0
  ```

  → `inet 192.168.1.15/24` means the system IP is `192.168.1.15` with a `/24` subnet.

---

### 2. **Check connectivity**

```bash
ping -c 4 google.com
```

* Sends 4 ICMP packets to test reachability.
* Success example:

  ```
  64 bytes from 142.250.64.110: icmp_seq=1 ttl=115 time=12.3 ms
  ```
* Failure example → "Destination Host Unreachable" → usually a routing/DNS/firewall issue.

---

### 3. **Trace the route**

```bash
traceroute google.com
```

* Shows hops between you and the destination. Helps identify where latency or failures happen.

---

### 4. **Download test**

```bash
curl -I https://example.com
```

* `-I` only fetches headers (faster).
* Example:

  ```
  HTTP/1.1 200 OK
  Content-Type: text/html; charset=UTF-8
  ```

---

### 5. **Check open ports**

```bash
ss -tulnp
```

* Modern replacement for `netstat`.
* Example output:

  ```
  Netid  State   Local Address:Port   Process
  tcp    LISTEN  0.0.0.0:22           sshd
  tcp    LISTEN  127.0.0.1:3306       mysqld
  ```

  → Shows SSH running on port `22` and MySQL on `3306`.

---

### 6. **DNS lookup**

```bash
dig google.com
```

* Resolves IP addresses.
* Example:

  ```
  ;; ANSWER SECTION:
  google.com.  300 IN A 142.250.74.14
  ```

---

### 7. **Monitor live traffic**

```bash
sudo tcpdump -i eth0
```

* Captures packets from interface `eth0`. Useful for debugging.

---

### 8. **Firewall basics**

```bash
sudo ufw status
sudo ufw allow 22/tcp
```

* Show firewall rules, allow SSH traffic.

---


