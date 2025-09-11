

# 📅 Day 4 – Users & Groups, Sudo, PAM Basics

---

## ✅ Learning Checklist

---

### 1. User Management

**Users** are the foundation of Linux system security and resource access. Each user is identified by a **UID** and has associated data stored mainly in:

* `/etc/passwd` — stores username, UID, GID, home directory, default shell, etc. (world-readable)
* `/etc/shadow` — stores hashed passwords and password policies (root-only readable)

**Example `/etc/passwd` entry:**

```
alice:x:1001:1001:Alice User:/home/alice:/bin/bash
```

| Field       | Description              |
| ----------- | ------------------------ |
| alice       | Username                 |
| x           | Placeholder for password |
| 1001        | UID                      |
| 1001        | GID                      |
| Alice User  | Comment/Full name        |
| /home/alice | Home directory           |
| /bin/bash   | Default shell            |

---

#### Core Commands:

| Command   | Purpose                                      | Example                                                 |
| --------- | -------------------------------------------- | ------------------------------------------------------- |
| `useradd` | Create new user                              | `sudo useradd -m alice` (creates home directory)        |
| `usermod` | Modify user (e.g., add groups, change shell) | `sudo usermod -aG sudo alice` (add alice to sudo group) |
| `passwd`  | Set or change user password                  | `sudo passwd alice`                                     |
| `userdel` | Remove user and optionally home directory    | `sudo userdel -r alice`                                 |

---

#### Examples:

```bash
# Create user bob with home directory and default shell
sudo useradd -m bob

# Set bob’s password
sudo passwd bob

# Add bob to sudo group for admin rights
sudo usermod -aG sudo bob

# Change bob’s shell to zsh
sudo usermod -s /bin/zsh bob

# Delete bob and remove home directory
sudo userdel -r bob
```

---

### 2. Group Management

Groups help manage permissions for multiple users collectively. Group info is stored in `/etc/group`.

**Example `/etc/group` line:**

```
dev:x:1002:alice,bob
```

| Field     | Description          |
| --------- | -------------------- |
| dev       | Group name           |
| x         | Password placeholder |
| 1002      | GID                  |
| alice,bob | Users in the group   |

---

#### Core Commands:

| Command    | Purpose                 | Example                                |
| ---------- | ----------------------- | -------------------------------------- |
| `groupadd` | Create a new group      | `sudo groupadd dev`                    |
| `groupdel` | Delete a group          | `sudo groupdel dev`                    |
| `gpasswd`  | Manage group membership | `sudo gpasswd -a alice dev` (add user) |

---

#### Examples:

```bash
# Create a group dev
sudo groupadd dev

# Add alice to dev group
sudo gpasswd -a alice dev

# Remove alice from dev group
sudo gpasswd -d alice dev

# Show members of dev group
getent group dev
```

---

### 3. Sudo (SuperUser DO)

`s`udo lets users execute commands with elevated privileges without giving them full root access. It enforces the **Principle of Least Privilege**, granting only necessary permissions.

* The sudo configuration is stored in `/etc/sudoers` and should always be edited with `visudo` to avoid syntax errors that could lock out users.

**Common sudoers entries:**

```bash
%sudo   ALL=(ALL:ALL) ALL    # Debian/Ubuntu style group-based sudo
%wheel  ALL=(ALL)       ALL   # RHEL/CentOS style group-based sudo
```

---

#### Examples:

```bash
# Run a command as root
sudo apt update

# Add alice to sudo group (Debian/Ubuntu)
sudo usermod -aG sudo alice

# Edit sudoers safely
sudo visudo
```

---

### 4. PAM (Pluggable Authentication Modules) Basics

PAM provides a modular and flexible authentication system for Linux. It allows administrators to configure authentication policies for different services without modifying the applications themselves.

* PAM config files live under `/etc/pam.d/`
* Each service (e.g., `sshd`, `login`, `sudo`) has a config file specifying which PAM modules to load and in what order.

---

#### Common PAM modules:

| Module          | Purpose                                                         |
| --------------- | --------------------------------------------------------------- |
| `pam_unix.so`   | Standard Unix authentication with `/etc/passwd` & `/etc/shadow` |
| `pam_tally2.so` | Tracks failed login attempts and locks accounts on threshold    |
| `pam_faildelay` | Adds delay to failed login attempts                             |
| `pam_deny.so`   | Denies access if reached                                        |

---

#### Example: Lock user accounts after 3 failed login attempts (unlock after 15 minutes)

Add this line to `/etc/pam.d/common-auth` (Debian/Ubuntu) or `/etc/pam.d/system-auth` (RHEL):

```bash
auth required pam_tally2.so deny=3 onerr=fail unlock_time=900
```

* `deny=3`: Lock after 3 failed attempts
* `unlock_time=900`: Lock lasts 900 seconds (15 minutes)

---

#### Check account failure info:

```bash
sudo pam_tally2 --user=alice
```

---

## 📝 Important Notes

* Password hashes are stored securely in `/etc/shadow` (root-only readable).
* Always edit `/etc/sudoers` using `visudo` to avoid syntax errors that could lock you out.
* On Debian-based distros, the `sudo` group controls sudo access; on RHEL-based systems, it’s usually the `wheel` group.
* PAM is a powerful, flexible system for enforcing complex authentication rules—understanding it is critical for Linux security hardening.

