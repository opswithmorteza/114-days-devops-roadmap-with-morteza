## ✅ Two Integrated Projects (Days 1 to 4)

---

### Project 1: Create “dev” group, users with sudo access, and PAM lockout policy

**Objectives:**

* Create a group called `dev`
* Create users `dev1`, `dev2`, and `admin`
* Add these users to `dev` and `sudo` groups
* Set passwords for these users
* Configure PAM to lock accounts after 3 failed login attempts (unlock after 15 minutes)

---

**Complete setup script:**

```bash
#!/bin/bash

set -e

echo "Creating 'dev' group..."
if ! getent group dev > /dev/null; then
  sudo groupadd dev
  echo "Group 'dev' created."
else
  echo "Group 'dev' already exists."
fi

users=("dev1" "dev2" "admin")

for user in "${users[@]}"; do
  if ! id -u "$user" > /dev/null 2>&1; then
    echo "Creating user $user..."
    sudo useradd -m -G dev,sudo "$user"
    echo "$user:Passw0rd123!" | sudo chpasswd
    echo "User $user created with password 'Passw0rd123!' and added to dev,sudo groups."
  else
    echo "User $user already exists."
  fi
done

echo "Configuring PAM lockout policy..."
if ! grep -q "pam_tally2.so deny=3" /etc/pam.d/common-auth; then
  echo "auth required pam_tally2.so deny=3 onerr=fail unlock_time=900" | sudo tee -a /etc/pam.d/common-auth
  echo "PAM lockout policy added."
else
  echo "PAM lockout policy already configured."
fi

echo "Setup complete."
```

---

### Project 2: Audit users, groups, sudo permissions, and PAM lockout status

**Objectives:**

* List all members of `dev` group
* Check if the `dev` group has sudo access
* Show PAM lockout statistics for each user in the `dev` group

---

**Audit script:**

```bash
#!/bin/bash

echo "🔍 Audit Report for group 'dev'"

users=$(getent group dev | awk -F: '{print $4}' | tr ',' ' ')
echo -e "\nUsers in 'dev': $users"

echo -e "\nSudoers entries related to 'dev' group:"
sudo grep -r "%dev" /etc/sudoers /etc/sudoers.d/ || echo "No sudoers entries found for group dev."

echo -e "\nPAM lockout status per user:"
for user in $users; do
  echo "User: $user"
  sudo pam_tally2 --user="$user" || echo "No failure record for $user"
done
```
