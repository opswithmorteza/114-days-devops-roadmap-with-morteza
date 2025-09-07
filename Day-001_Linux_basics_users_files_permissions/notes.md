# 📅 Day 001 – Linux Basics

## 🎯 Learning Goals
- Understand Linux file system structure
- Practice basic navigation and file management commands
- Learn file permissions and ownership
- Create a small hands-on project

---

## 🐧 Linux File System Hierarchy
- `/` → root directory  
- `/home` → user directories  
- `/etc` → configuration files  
- `/var` → variable data (logs, cache)  
- `/bin` → essential binaries  
- `/usr` → user programs and utilities  

---

## 🛠️ Basic Commands Practiced

### Navigation
```bash
pwd        # Print working directory
ls -l      # List files with details
ls -a      # Show hidden files
cd /home   # Change directory

File & Directory Management

mkdir projects               # Create directory
touch file1.txt             # Create empty file
echo "Hello DevOps" > file2.txt
cat file2.txt               # Display file content
cp file2.txt backup.txt     # Copy file
mv backup.txt archive.txt   # Rename/Move file
rm archive.txt              # Delete file

Permissions & Ownership

ls -l
-rw-r--r--  1 user user  12 Sep  7 10:00 file2.txt

chmod 744 file2.txt        # Owner: rwx, Group: r, Others: r
chown root file2.txt       # Change owner to root (sudo needed)
