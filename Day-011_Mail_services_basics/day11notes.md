
# 📘 Day 11 – Networking Fundamentals (Deep Dive Training)

## 1. Introduction to Networking Fundamentals

Networking is the backbone of any IT and DevOps environment. Without networking, servers, applications, and services cannot communicate. Understanding IP, DNS, routing, and connectivity troubleshooting is essential for DevOps engineers.

---

## 2. IP Addressing

* **IPv4**: 32-bit address, written as `192.168.1.1`
* **IPv6**: 128-bit address, written as `2001:db8::1`
* **Private vs Public IPs**:

  * Private ranges: `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`
  * Public IPs are globally routable.
* **Subnetting**:

  * `192.168.1.0/24` → 256 IPs, 254 usable.
  * CIDR notation (`/24`, `/16`) defines subnet size.

🔹 **Pro Tip**: Always reserve the first IP in a subnet as the **network address** and the last as the **broadcast address**.

---

## 3. DNS (Domain Name System)

DNS converts domain names into IP addresses.
Steps:

1. User types `www.example.com`
2. Browser checks local cache
3. Query goes to DNS resolver
4. Resolver checks root → TLD (.com) → authoritative server
5. Returns IP to the browser

### Useful commands:

```bash
dig example.com
nslookup example.com
host example.com
```

🔹 **Pro Tip**: Always use tools like `dig +trace` to debug complex DNS issues.

---

## 4. Connectivity & Troubleshooting

### Key Tools

* **ping**: Tests connectivity

  ```bash
  ping google.com
  ```
* **traceroute**: Shows the path packets take

  ```bash
  traceroute google.com
  ```
* **netstat / ss**: Displays active connections

  ```bash
  ss -tulnp
  ```
* **curl / wget**: Tests HTTP(S) endpoints

  ```bash
  curl -I https://google.com
  ```

🔹 **Pro Tip**: Combine `ping`, `traceroute`, and `dig` to quickly isolate whether the problem is DNS, routing, or connectivity.

---

## 5. Routing

* **Static routing**: Manually configured.
* **Dynamic routing**: Handled by routing protocols (OSPF, BGP, RIP).
* **Default Gateway**: Sends traffic to outside networks.

Example (Linux):

```bash
ip route show
sudo ip route add 192.168.2.0/24 via 192.168.1.1
```

🔹 **Pro Tip**: Always check the routing table when packets don’t reach their destination.

---

## 6. Advanced Concepts

* **MTU (Maximum Transmission Unit)**: Controls packet size.
* **NAT (Network Address Translation)**: Translates private IPs into public ones.
* **Load Balancing**: Distributes traffic across multiple servers.
* **Reverse DNS (PTR records)**: Maps IP → domain name.

---
