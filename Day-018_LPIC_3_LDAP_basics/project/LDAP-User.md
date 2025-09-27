
## 🔹 7. Projects

### 🧪 Project 1: LDAP User & Group Directory

* Create an OU for **People** and **Groups**.
* Add 3 users (`john`, `alice`, `bob`).
* Create 2 groups (`admins`, `developers`).
* Assign users to groups.
* Verify using `ldapsearch`.

---

### 🧪 Project 2: Centralized Authentication Lab

* Deploy **two Linux VMs**:

  * VM1 → LDAP server
  * VM2 → LDAP client
* Configure VM2 to authenticate via LDAP.
* Test by logging into VM2 with LDAP users.

Expected result:

* You can log into **VM2** using `john@example.com` credentials.
* Groups (`admins`, `developers`) control sudo access.

---

## 🔹 8. Key Insights

* LDAP is the **backbone of enterprise authentication**.
* Works seamlessly with **Kerberos, NFS, Samba, Jenkins, Kubernetes**.
* Using LDIF files makes configuration reproducible (IaC approach).
* Once mastered, you can scale it for hundreds of servers.

---
