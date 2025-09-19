
## 📂 Project 1: DNS Troubleshooting Lab

**Task**:

1. Setup a VM.
2. Configure `/etc/resolv.conf` to use Google DNS (8.8.8.8).
3. Use `dig`, `nslookup`, and `host` to resolve `github.com`.
4. Compare results.
5. Test what happens when DNS is unreachable.

**Solution**:

```bash
# Set Google DNS
echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf

# DNS lookup using dig
dig github.com

# DNS lookup using nslookup
nslookup github.com

# DNS lookup using host
host github.com

# Test DNS failure
sudo mv /etc/resolv.conf /etc/resolv.conf.bak
ping github.com   # will fail
```

**Outcome**:

* You’ll understand how DNS resolution works.
* You’ll simulate a DNS outage.

---

## 📂 Project 2: Routing & Connectivity Debugging

**Task**:

1. Create two VMs (VM1 and VM2) in VirtualBox or a cloud provider.
2. Assign static IPs in different subnets:

   * VM1 → `192.168.1.10/24`
   * VM2 → `192.168.2.10/24`
3. Add a router VM with two NICs to connect both networks.
4. Configure static routes on both VMs.
5. Verify connectivity using `ping` and `traceroute`.

**Solution**:

```bash
# On VM1
sudo ip route add 192.168.2.0/24 via 192.168.1.1

# On VM2
sudo ip route add 192.168.1.0/24 via 192.168.2.1

# Test
ping 192.168.2.10
traceroute 192.168.2.10
```

**Outcome**:

* You’ll learn static routing setup.
* You’ll visualize how packets travel across networks.

---
