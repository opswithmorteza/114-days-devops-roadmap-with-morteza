# 📘 Day 19 – LPIC-3: LDAP Client Integration

## 1. Introduction

LDAP (Lightweight Directory Access Protocol) is a protocol used to access and maintain distributed directory services, such as user accounts and authentication.
In enterprises, instead of managing local users on each machine, you integrate the system with a central LDAP server.

This ensures:

* **Centralized authentication** (single account across all systems)
* **Easier user management**
* **Better security** (policies applied globally)

---

## 2. Core Concepts

* **LDAP Server**: Holds directory info (users, groups, policies).
* **LDAP Client**: A Linux machine that connects to LDAP for authentication.
* **nslcd / sssd**: Services that connect to LDAP for user info.
* **PAM (Pluggable Authentication Module)**: Linux system that handles authentication logic.
* **NSS (Name Service Switch)**: Resolves users and groups via LDAP.

---

## 3. Step-by-Step Integration

### 🔹 Step 1: Install required packages

On Debian/Ubuntu:

```bash
sudo apt update
sudo apt install libnss-ldap libpam-ldap ldap-utils nscd -y
```

On RHEL/CentOS:

```bash
sudo yum install openldap-clients nss-pam-ldapd -y
```

---

### 🔹 Step 2: Configure LDAP client

Run the configuration helper:

```bash
sudo dpkg-reconfigure ldap-auth-config
```

Example answers:

* LDAP URI: `ldap://ldap.example.com`
* Distinguished name (DN) of search base: `dc=example,dc=com`
* LDAP version: `3`
* Make configuration database readable/writeable: Yes

---

### 🔹 Step 3: Configure NSS (Name Service Switch)

Edit `/etc/nsswitch.conf`:

```text
passwd:     files ldap
group:      files ldap
shadow:     files ldap
```

This means: First check local files (`/etc/passwd`), then LDAP.

---

### 🔹 Step 4: Configure PAM for authentication

Run:

```bash
sudo pam-auth-update
```

Enable:

* `Unix authentication`
* `LDAP Authentication`

---

### 🔹 Step 5: Test LDAP query

```bash
ldapsearch -x -b "dc=example,dc=com" "(uid=john)"
```

**Output example:**

```text
dn: uid=john,ou=People,dc=example,dc=com
uid: john
cn: John Doe
sn: Doe
mail: john@example.com
```

---

### 🔹 Step 6: Test login via LDAP user

Switch to LDAP user:

```bash
su - john
```

If LDAP integration is correct, it should allow login.

---

## 4. Advanced Configuration

* Use **SSSD** instead of nslcd (more secure, caches credentials).

```bash
sudo apt install sssd libpam-sss libnss-sss
```

`/etc/sssd/sssd.conf` example:

```ini
[sssd]
services = nss, pam
config_file_version = 2
domains = LDAP

[domain/LDAP]
id_provider = ldap
auth_provider = ldap
ldap_uri = ldap://ldap.example.com
ldap_search_base = dc=example,dc=com
```

Enable and restart:

```bash
sudo systemctl enable sssd
sudo systemctl start sssd
```

---

## 5. Example Scenarios

### Example 1: Check if LDAP user is recognized

```bash
getent passwd john
```

**Output:**

```text
john:x:10001:10001:John Doe:/home/john:/bin/bash
```

---

### Example 2: Restrict access to only LDAP users in a group

Edit `/etc/security/access.conf`:

```text
+ : (ldapadmins) : ALL
- : ALL : ALL
```

This means: Only users in group `ldapadmins` can log in.

---
