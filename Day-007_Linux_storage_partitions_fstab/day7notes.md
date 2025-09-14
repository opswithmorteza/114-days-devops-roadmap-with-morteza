## 📒 Day 7 Notes – Linux Package Management

### 🔹 What You’ll Learn Today

Today is all about **Linux package management** — one of the most important daily tasks for any DevOps engineer or sysadmin.
We’ll cover:

* What package managers are and why they matter
* Differences between **source installation** vs. **package installation**
* Understanding **repositories** and dependencies
* Package management across different Linux families:

  * Debian-based: `apt`, `dpkg`
  * Red Hat-based: `yum`, `dnf`, `rpm`
  * Arch-based: `pacman`
  * SUSE-based: `zypper`
* Common commands: install, remove, update, upgrade, search, hold
* Two hands-on projects to combine everything from Day 1 to Day 7

---

### 🔹 Core Concepts

1. **Package Manager Basics**
   A package manager automates the process of installing, upgrading, configuring, and removing software.
   It ensures dependencies are met and keeps your system consistent.

2. **Source vs. Package Install**

* *Source install*: Compile from source code (flexible but complex).
* *Package install*: Precompiled binaries from repositories (faster, safer, easier to manage).

3. **Repositories (Repos)**

* Online databases of software packages.
* Maintained by Linux distros or third-party vendors.
* Configurable through `/etc/apt/sources.list`, `/etc/yum.repos.d/`, etc.

  خیلی عالی 👌
پس برای **Day 7 – Linux Package Management**، برنامه‌ی کامل آموزش رو به این شکل می‌چینم (انگلیسی – جامع، حرفه‌ای، با مثال و خروجی):

---

# 📌 Day 7 – Linux Package Management

Today we’ll dive deep into **package management** in Linux, covering both Debian-based (APT) and RHEL-based (RPM/YUM/DNF) systems. You’ll also learn how to manage repositories, handle advanced scenarios, and even automate package installations with scripts.

---

## 🔹 1. What is Package Management?

A **package** is a compressed archive that contains:

* The software binaries
* Metadata (dependencies, version info)
* Configuration files

A **package manager** is the tool that:

* Installs, updates, and removes packages
* Resolves dependencies
* Manages repositories

---

## 🔹 2. Debian-based Systems (APT)

### ✅ Basic Commands:

```bash
sudo apt update        # Refresh package lists
sudo apt upgrade       # Upgrade all installed packages
sudo apt install nginx # Install a package
sudo apt remove nginx  # Remove a package
sudo apt purge nginx   # Remove + config files
```

### ✅ Searching for Packages:

```bash
apt search apache2
apt show apache2
```

### ✅ Locking Versions:

```bash
sudo apt-mark hold nginx
sudo apt-mark unhold nginx
```

---

## 🔹 3. RHEL-based Systems (RPM, YUM, DNF)

### ✅ Working with RPM:

```bash
rpm -ivh package.rpm    # Install
rpm -Uvh package.rpm    # Upgrade
rpm -e package_name     # Remove
rpm -qa | grep nginx    # Query installed packages
```

### ✅ Using YUM/DNF:

```bash
sudo yum install httpd      # CentOS 7
sudo dnf install httpd      # CentOS 8/RHEL 8+
sudo yum remove httpd
sudo yum update
```

### ✅ Searching & Info:

```bash
yum search nginx
yum info nginx
```

---

## 🔹 4. Repository Management

### ✅ Debian:

Add a new repository:

```bash
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
```

### ✅ RHEL:

Create a new repo file:

```bash
sudo vi /etc/yum.repos.d/custom.repo
```

Content:

```
[custom-repo]
name=Custom Repo
baseurl=http://mirror.example.com/centos/7/os/x86_64/
enabled=1
gpgcheck=1
gpgkey=http://mirror.example.com/RPM-GPG-KEY-CentOS-7
```

Then:

```bash
sudo yum repolist
```

---

## 🔹 5. Advanced Package Management

* **Clean cache**:

  ```bash
  sudo apt clean && sudo apt autoclean
  sudo yum clean all
  ```

* **Check dependencies**:

  ```bash
  apt-cache depends nginx
  repoquery --requires nginx
  ```

* **Verify package integrity**:

  ```bash
  rpm -V nginx
  ```

---

## 🔹 6. Automating Package Management with Scripts

Example **Bash script** to install multiple packages:

```bash
#!/bin/bash
packages=(nginx git curl vim)

for pkg in "${packages[@]}"; do
  if ! dpkg -l | grep -q $pkg; then
    echo "Installing $pkg..."
    sudo apt install -y $pkg
  else
    echo "$pkg already installed"
  fi
done
```

Make executable and run:

```bash
chmod +x install.sh
./install.sh
```

---

## 🔹 7. Best Practices

* Always update before installing:

  ```bash
  sudo apt update && sudo apt upgrade -y
  ```
* Use **version pinning** to prevent breaking changes.
* Keep a **list of installed packages**:

  ```bash
  dpkg --get-selections > packages.list
  rpm -qa > packages.list
  ```
* Automate configuration with **Ansible** for large-scale environments.

---

✅ By the end of today, you should be able to:

* Install, update, and remove packages on Debian and RHEL systems
* Manage repositories and verify package integrity
* Automate package management with scripts
