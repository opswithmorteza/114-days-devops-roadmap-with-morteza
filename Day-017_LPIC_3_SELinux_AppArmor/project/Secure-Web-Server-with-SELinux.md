## 8. Two Projects

### 🛠 Project 1 – Secure Web Server with SELinux

**Goal:** Deploy Apache with custom directory + SELinux policy.

Steps:

1. Install Apache:

   ```bash
   sudo dnf install httpd -y
   sudo systemctl enable --now httpd
   ```
2. Create custom directory `/srv/web`.
3. Configure Apache to serve it.
4. Apply SELinux labels:

   ```bash
   sudo semanage fcontext -a -t httpd_sys_content_t "/srv/web(/.*)?"
   sudo restorecon -Rv /srv/web
   ```
5. Test with browser → Works only after SELinux policy applied.

---

### 🛠 Project 2 – Restrict a Program with AppArmor

**Goal:** Prevent `curl` from writing files to disk.

Steps:

1. Install AppArmor utilities:

   ```bash
   sudo apt install apparmor apparmor-utils -y
   ```
2. Generate profile:

   ```bash
   sudo aa-genprof /usr/bin/curl
   ```
3. Run `curl https://example.com -o /tmp/test.html`.
4. AppArmor logs → Deny write.
5. Put profile in enforce mode → curl cannot save to disk.
