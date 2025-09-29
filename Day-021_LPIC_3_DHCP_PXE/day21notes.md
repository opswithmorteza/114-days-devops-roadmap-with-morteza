# 📘 Day 21 – DHCP & PXE Boot (From Beginner to Advanced)

---

## 1. What is DHCP? (Beginner Level)

### Concept

* **Without DHCP** → Admin must configure IP, subnet, gateway, DNS **manually** on each device.
* **With DHCP** → The server automatically assigns this info.

**DHCP Workflow (DORA):**

1. **D**iscover → Client broadcasts: "Who can give me an IP?"
2. **O**ffer → Server offers an IP.
3. **R**equest → Client requests that IP.
4. **A**ck → Server acknowledges.

---

### Example 1: Installing a DHCP Server (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install isc-dhcp-server -y
```

### Example 2: Basic DHCP Config (`/etc/dhcp/dhcpd.conf`)

```conf
default-lease-time 600;
max-lease-time 7200;
authoritative;

subnet 192.168.10.0 netmask 255.255.255.0 {
  range 192.168.10.100 192.168.10.200;
  option routers 192.168.10.1;
  option subnet-mask 255.255.255.0;
  option domain-name-servers 8.8.8.8, 1.1.1.1;
}
```

### Start & Verify

```bash
sudo systemctl enable isc-dhcp-server --now
sudo systemctl status isc-dhcp-server
```

**Output Example:**

```
● isc-dhcp-server.service - ISC DHCP IPv4 server
     Loaded: loaded (/lib/systemd/system/isc-dhcp-server.service; enabled)
     Active: active (running) since Mon 2025-09-29 14:20:10 UTC
```

---

### Example 3: DHCP Logs

```bash
journalctl -u isc-dhcp-server -f
```

**Output (client requesting an IP):**

```
DHCPDISCOVER from 08:00:27:4e:1d:5b via eth0
DHCPOFFER on 192.168.10.101 to 08:00:27:4e:1d:5b via eth0
DHCPREQUEST for 192.168.10.101 from 08:00:27:4e:1d:5b via eth0
DHCPACK on 192.168.10.101 to 08:00:27:4e:1d:5b via eth0
```

---

## 2. Static IP Reservation (Intermediate)

You can reserve an IP for a specific MAC address:

```conf
host webserver1 {
  hardware ethernet 08:00:27:aa:bb:cc;
  fixed-address 192.168.10.50;
}
```

✅ Ensures the same client always gets the same IP.

---

## 3. What is PXE? (Beginner to Advanced)

* **PXE (Preboot Execution Environment)** → Client boots an OS **over the network** instead of local disk.
* PXE needs:

  * DHCP (to tell client "where is the bootloader?")
  * TFTP (to send the bootloader, kernel, initrd)
  * Installer image (HTTP, NFS, FTP)

---

## 4. PXE Workflow (with DHCP + TFTP)

1. Client boots → sends DHCP request.
2. DHCP replies with **IP + boot filename + TFTP server address**.
3. Client downloads **pxelinux.0** (bootloader) from TFTP.
4. Bootloader loads kernel + initrd.
5. OS installer starts.

---

## 5. Configuring DHCP with PXE Options

Edit `/etc/dhcp/dhcpd.conf`:

```conf
subnet 192.168.10.0 netmask 255.255.255.0 {
  range 192.168.10.100 192.168.10.150;
  option routers 192.168.10.1;
  option subnet-mask 255.255.255.0;
  option domain-name-servers 8.8.8.8;

  filename "pxelinux.0";
  next-server 192.168.10.5;   # IP of TFTP server
}
```

---

## 6. Installing & Configuring TFTP Server

```bash
sudo apt install tftpd-hpa syslinux pxelinux -y
```

Config: `/etc/default/tftpd-hpa`

```conf
TFTP_USERNAME="tftp"
TFTP_DIRECTORY="/var/lib/tftpboot"
TFTP_ADDRESS="0.0.0.0:69"
TFTP_OPTIONS="--secure"
```

Restart:

```bash
sudo systemctl restart tftpd-hpa
```

---

## 7. PXE Bootloader Setup

```bash
sudo mkdir -p /var/lib/tftpboot/pxelinux.cfg
sudo cp /usr/lib/PXELINUX/pxelinux.0 /var/lib/tftpboot/
sudo cp /usr/lib/syslinux/modules/bios/ldlinux.c32 /var/lib/tftpboot/
```

### Config file: `/var/lib/tftpboot/pxelinux.cfg/default`

```conf
DEFAULT menu.c32
PROMPT 0
TIMEOUT 50
ONTIMEOUT local

LABEL ubuntu
  MENU LABEL ^Install Ubuntu
  KERNEL ubuntu-installer/amd64/linux
  APPEND vga=normal initrd=ubuntu-installer/amd64/initrd.gz
```

---

## 8. Debugging Tools

### Check DHCP traffic

```bash
sudo tcpdump -i eth0 port 67 or port 68
```

Output:

```
DHCP Discover → Offer → Request → ACK
```

### Check TFTP traffic

```bash
sudo tcpdump -i eth0 port 69
```

Output:

```
TFTP RRQ "pxelinux.0"
```

---

## 9. Advanced PXE Features

* **Diskless booting** → Client runs Linux over NFS (no local disk).
* **Multi-OS PXE menus** → Add Ubuntu, CentOS, Debian boot entries.
* **Kickstart/Preseed automation** → Fully automated OS install with no manual input.

---

## 10. Projects 🚀

### 🔹 Project 1: PXE Multi-OS Deployment

* Configure DHCP + TFTP.
* PXE boot menu includes:

  * Ubuntu
  * CentOS
  * Debian
* Each boots into installer.

✅ Deliverable: Client can pick which OS to install from network boot.

---

### 🔹 Project 2: Diskless Linux with PXE + NFS Root

* DHCP provides bootloader.
* TFTP loads kernel + initrd.
* Root filesystem is mounted via NFS.
* Client boots Linux **without a hard drive**.

✅ Deliverable: A VM that runs Linux completely diskless.
