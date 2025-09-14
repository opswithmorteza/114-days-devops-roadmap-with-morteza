
**Project 1 – Multi-Tool Installer**
Write a script that installs common tools (`curl`, `git`, `htop`) automatically, detecting the package manager of the system.

```bash
#!/bin/bash
if command -v apt >/dev/null; then
    sudo apt update && sudo apt install -y curl git htop
elif command -v yum >/dev/null; then
    sudo yum install -y curl git htop
elif command -v dnf >/dev/null; then
    sudo dnf install -y curl git htop
elif command -v pacman >/dev/null; then
    sudo pacman -Syu --noconfirm curl git htop
elif command -v zypper >/dev/null; then
    sudo zypper install -y curl git htop
else
    echo "Unsupported package manager."
fi
```

**Project 2 – Auto Updater with Logging**
A script that updates and upgrades your system, then logs output to `/var/log/system-updates.log`.

```bash
#!/bin/bash
LOGFILE="/var/log/system-updates.log"
{
    echo "==== Update started at $(date) ===="
    if command -v apt >/dev/null; then
        sudo apt update && sudo apt upgrade -y
    elif command -v yum >/dev/null; then
        sudo yum update -y
    elif command -v dnf >/dev/null; then
        sudo dnf upgrade -y
    elif command -v pacman >/dev/null; then
        sudo pacman -Syu --noconfirm
    elif command -v zypper >/dev/null; then
        sudo zypper update -y
    fi
    echo "==== Update finished at $(date) ===="
} >> $LOGFILE 2>&1
```

\#DevOps #Linux #PackageManagement #APT #YUM #DNF #Pacman #Zypper #SysAdmin #Roadmap #114Days #Day7

---

Do you want me to now design the **Day 7 infographic image** (like Day 5 & 6) with the title on top and your GitHub link at the bottom?
