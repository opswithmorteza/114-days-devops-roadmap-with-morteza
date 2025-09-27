
## 6. Projects

### 🛠 Project 1: Secure LDAP Integration

**Goal**: Configure a client machine to authenticate via LDAP with TLS encryption.

**Steps**:

1. Configure `/etc/ldap.conf` with `ssl start_tls`.
2. Import LDAP server’s CA certificate.
3. Test secure connection:

   ```bash
   ldapsearch -H ldaps://ldap.example.com -x -b "dc=example,dc=com"
   ```

✅ Deliverable: A Linux VM where LDAP authentication only works with TLS.

---

### 🛠 Project 2: Hybrid Authentication System

**Goal**: Configure a Linux machine where:

* Local `sudo` access is only for local users.
* Normal login works only for LDAP users.

**Steps**:

1. Configure `/etc/nsswitch.conf` → `passwd: files ldap`.
2. In `/etc/sudoers`, allow only local group `sudo`.
3. Test with:

   * `localadmin` → can `sudo`
   * `john@ldap` → can log in but not `sudo`

✅ Deliverable: A Linux VM with mixed authentication rules.

---

