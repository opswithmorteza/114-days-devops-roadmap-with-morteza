# 📘 Day 18 – LDAP Basics (Setup OpenLDAP Server)

## 🔹 1. Introduction to LDAP

**LDAP (Lightweight Directory Access Protocol)** is an open, vendor-neutral protocol for accessing and managing directory services.
Think of it as a **phonebook for your network** — it stores information about users, groups, computers, and policies in a hierarchical tree.

* **Common Use Cases:**

  * Centralized authentication (login once, use everywhere).
  * Storing organizational information (users, groups, printers, policies).
  * Integrating with services like Samba, NFS, Kubernetes, Jenkins, GitLab.

* **Directory Tree Structure (DIT – Directory Information Tree):**

  ```
  dc=example,dc=com
  ├── ou=People
  │   ├── cn=Alice
  │   ├── cn=Bob
  └── ou=Groups
      ├── cn=Admins
      ├── cn=Developers
  ```

---

## 🔹 2. LDAP Core Concepts

* **DN (Distinguished Name):** Unique path to an entry (e.g., `cn=Alice,ou=People,dc=example,dc=com`).
* **RDN (Relative DN):** Single component (e.g., `cn=Alice`).
* **Attributes:** Key-value pairs (e.g., `mail=alice@example.com`).
* **ObjectClass:** Defines what attributes an entry must/can have.

Example entry (LDIF format):

```ldif
dn: cn=Alice,ou=People,dc=example,dc=com
objectClass: inetOrgPerson
cn: Alice
sn: Smith
mail: alice@example.com
uid: alice
userPassword: secret123
```

---

## 🔹 3. Installing OpenLDAP on Linux

### On Ubuntu/Debian:

```bash
sudo apt update
sudo apt install slapd ldap-utils -y
sudo dpkg-reconfigure slapd
```

During setup:

* Omit OpenLDAP server config → **No**
* DNS domain name → `example.com`
* Organization name → `ExampleOrg`
* Admin password → `StrongPassword123`
* Database backend → MDB
* Allow LDAPv2 protocol → No

Verify service:

```bash
systemctl status slapd
```

---

## 🔹 4. Adding LDAP Entries

### Step 1: Create a People OU

`people.ldif`

```ldif
dn: ou=People,dc=example,dc=com
objectClass: organizationalUnit
ou: People
```

Apply:

```bash
ldapadd -x -D "cn=admin,dc=example,dc=com" -W -f people.ldif
```

### Step 2: Add a User

`user.ldif`

```ldif
dn: uid=john,ou=People,dc=example,dc=com
objectClass: inetOrgPerson
uid: john
sn: Doe
cn: John Doe
mail: john@example.com
userPassword: {SSHA}hashedPasswordHere
```

Generate hashed password:

```bash
slappasswd
```

Add user:

```bash
ldapadd -x -D "cn=admin,dc=example,dc=com" -W -f user.ldif
```

### Step 3: Verify

```bash
ldapsearch -x -LLL -b "dc=example,dc=com" "(uid=john)" cn mail
```

Output:

```
dn: uid=john,ou=People,dc=example,dc=com
cn: John Doe
mail: john@example.com
```

---

## 🔹 5. LDAP Authentication

To enable Linux system login via LDAP:

1. Install auth packages:

   ```bash
   sudo apt install libnss-ldapd libpam-ldapd nscd -y
   ```
2. Configure `/etc/nsswitch.conf`:

   ```
   passwd:         files systemd ldap
   group:          files systemd ldap
   shadow:         files ldap
   ```
3. Restart services:

   ```bash
   sudo systemctl restart nscd
   ```

Now users in LDAP can log into Linux systems.

---

## 🔹 6. Practical Examples

### Example 1 – Add a Group

`group.ldif`

```ldif
dn: cn=developers,ou=Groups,dc=example,dc=com
objectClass: posixGroup
cn: developers
gidNumber: 5000
```

Add with:

```bash
ldapadd -x -D "cn=admin,dc=example,dc=com" -W -f group.ldif
```

### Example 2 – Add User to Group

Update `john` entry:

```ldif
dn: uid=john,ou=People,dc=example,dc=com
changetype: modify
add: memberOf
memberOf: cn=developers,ou=Groups,dc=example,dc=com
```

---

