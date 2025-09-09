# 📅 Day 001 – Linux Basics

## 🎯 Learning Goals
- Understand Linux file system structure
- Practice basic navigation and file management commands
- Learn file permissions and ownership
- Create a small hands-on project

---
🐧 Linux Architecture Overview

Linux is a Unix-like operating system composed of:

Kernel: Core managing hardware, processes, memory, devices

Shell: Command-line interface interpreting user commands (bash, zsh)

User Space: Applications and libraries running above kernel

Filesystem: Hierarchical directory structure managed by kernel

Linux boots through several stages:

BIOS/UEFI initializes hardware

Bootloader (GRUB/LILO) loads kernel

Kernel initializes system, mounts root filesystem

Init/Systemd starts services and user environment

# Exploring the Linux Command Line

## 1. Understanding the Linux File System Structure

Linux uses a hierarchical directory tree starting from the root directory `/`. Some important directories include:

| Path    | Description                         |
| ------- | ----------------------------------- |
| `/`     | Root directory                      |
| `/home` | User home directories               |
| `/etc`  | System configuration files          |
| `/var`  | Variable data like logs             |
| `/bin`  | Essential binaries (basic commands) |
| `/usr`  | User programs and utilities         |
| `/tmp`  | Temporary files                     |

To view the directory structure, you can use:

```bash
tree -L 2 /
```

(If `tree` is not installed, install it via `sudo apt install tree` or your distro's package manager.)

---

## 2. Practice Basic Navigation and File Management Commands

### Navigating the File System

| Command        | Description                     | Example                 |
| -------------- | ------------------------------- | ----------------------- |
| `pwd`          | Print current working directory | `$ pwd`                 |
| `ls`           | List files and directories      | `$ ls -l /home`         |
| `cd`           | Change directory                | `$ cd /etc`             |
| `cd ..`        | Go to parent directory          | `$ cd ..`               |
| `cd ~` or `cd` | Go to home directory            | `$ cd ~` or just `$ cd` |

### Managing Files and Directories

| Command | Description                    | Example                            |
| ------- | ------------------------------ | ---------------------------------- |
| `mkdir` | Create a directory             | `$ mkdir projects`                 |
| `touch` | Create an empty file           | `$ touch notes.txt`                |
| `echo`  | Write text to a file           | `$ echo "Hello Linux" > hello.txt` |
| `cat`   | Display file content           | `$ cat hello.txt`                  |
| `cp`    | Copy files                     | `$ cp hello.txt backup.txt`        |
| `mv`    | Move or rename files           | `$ mv backup.txt archive.txt`      |
| `rm`    | Remove files                   | `$ rm archive.txt`                 |
| `rm -r` | Remove directories recursively | `$ rm -r projects`                 |

---

## 3. Learn File Permissions and Ownership

Every file or directory in Linux has permissions defining who can read, write, or execute it.

### Viewing Permissions

Use:

```bash
ls -l filename
```

Example:

```bash
$ ls -l hello.txt
-rw-r--r-- 1 user user 12 Sep 7 10:00 hello.txt
```

### Permission Structure

Permissions are divided into three categories:

* **Owner**
* **Group**
* **Others**

Each category can have three types of permissions:

* **r** = read
* **w** = write
* **x** = execute

### Changing Permissions

Change file permissions with `chmod`.

Example:

```bash
chmod 744 hello.txt
```

Meaning of `744`:

* 7 (owner) = read + write + execute (4+2+1)
* 4 (group) = read only
* 4 (others) = read only

### Changing Ownership

Change file owner with `chown`:

```bash
sudo chown root hello.txt
```

Change group with `chgrp`:

```bash
sudo chgrp admin hello.txt
```

---
Using the Linux Manual (`man`)

```bash
man ls
man chmod
```

🔑 Tips:
- Press `SPACE` → scroll  
- Type `/keyword` → search  
- Press `q` → quit

- 
## 4. Create a Small Hands-on Project: Personal Notes Organizer

### Goal:

Create a simple note organization system in Linux using directories and files.

### Steps:

1. Create a main notes folder inside your home directory:

```bash
mkdir -p ~/notes/{work,personal}
```

2. Create text files for different tasks:

```bash
echo "Learn Linux basics" > ~/notes/work/day1.txt
echo "Buy groceries" > ~/notes/personal/todo.txt
```

3. View your notes content:

```bash
cat ~/notes/work/day1.txt
# Output: Learn Linux basics
```

4. You can copy, move, delete, and edit these notes to practice file management commands.

---

## Summary

* The Linux file system is hierarchical and starts from `/`.
* Use basic commands like `cd`, `ls`, `pwd` to navigate the system.
* Manage files and directories using `mkdir`, `touch`, `cp`, `mv`, and `rm`.
* File permissions and ownership are crucial and managed by `chmod` and `chown`.
* A simple notes organizer project helps you practice these commands practically.

---

