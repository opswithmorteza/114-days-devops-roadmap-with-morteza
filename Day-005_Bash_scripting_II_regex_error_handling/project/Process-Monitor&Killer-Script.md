## 🔹 5. Two Projects

### 🧪 Project 1: Process Monitor & Killer Script

**Goal:** Create a Bash script that finds high-CPU processes and kills them.

```bash
#!/bin/bash
# kill_high_cpu.sh

THRESHOLD=50

echo "Checking for processes using more than $THRESHOLD% CPU..."
ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%cpu | head -n 10

while read pid cpu; do
  if (( $(echo "$cpu > $THRESHOLD" | bc -l) )); then
    echo "Killing process $pid using $cpu% CPU"
    kill -9 $pid
  fi
done < <(ps -eo pid,%cpu --no-headers)
```

* Run: `bash kill_high_cpu.sh`

---

### 🧪 Project 2: Background Job Manager

**Goal:** Run multiple jobs, manage them with `jobs`, `fg`, `bg`.

Steps:

1. Start three background processes:

```bash
sleep 500 &
sleep 600 &
sleep 700 &
```

2. Use `jobs` to list them.
3. Pause one with `kill -STOP <PID>`.
4. Resume with `kill -CONT <PID>`.
5. Use `fg %1` to bring one job to foreground.

✅ This demonstrates **job control, signals, and process monitoring**.

