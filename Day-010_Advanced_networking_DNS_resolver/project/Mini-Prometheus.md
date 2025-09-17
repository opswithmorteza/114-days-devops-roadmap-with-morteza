

## 📂 **Project 1 – Custom Monitoring Agent (Mini Prometheus)**

```bash
#!/bin/bash
OUTPUT="/var/log/metrics.json"
echo "{" > $OUTPUT
echo "\"timestamp\": \"$(date +%F_%T)\"," >> $OUTPUT
echo "\"cpu\": \"$(top -bn1 | grep 'Cpu(s)' | awk '{print $2 + $4}')%\"," >> $OUTPUT
echo "\"memory\": \"$(free -m | awk 'NR==2{printf \"%s/%sMB (%.2f%%)\", $3,$2,$3*100/$2 }')\"," >> $OUTPUT
echo "\"disk_io\": \"$(iostat -dx | awk 'NR==4{print $14\"% utilization\"}')\"," >> $OUTPUT
echo "\"network\": \"$(sar -n DEV 1 1 | grep eth0 | awk '{print $5 \"KB/s RX, \" $6 \"KB/s TX\"}')\"" >> $OUTPUT
echo "}" >> $OUTPUT
```

👉 Outputs system metrics in **JSON** format (like a Prometheus exporter).

---

## 📂 **Project 2 – Auto-Healing Service Monitor**

```bash
#!/bin/bash
SERVICE="nginx"
THRESHOLD=80

CPU=$(ps -eo pid,comm,%cpu --sort=-%cpu | grep $SERVICE | head -1 | awk '{print $3}')

if [ -z "$CPU" ]; then
   echo "$(date) - $SERVICE is not running, restarting..." >> /var/log/autoheal.log
   systemctl restart $SERVICE
elif (( ${CPU%.*} > THRESHOLD )); then
   echo "$(date) - $SERVICE high CPU usage ($CPU%), restarting..." >> /var/log/autoheal.log
   systemctl restart $SERVICE
fi
```

👉 Creates a **self-healing mechanism** similar to Kubernetes liveness probes.

---

## 📂 **Project 3 – Process Priority Playground**

1. Start two CPU-intensive processes:

   ```bash
   yes > /dev/null &
   yes > /dev/null &
   ```

2. Adjust priority:

   ```bash
   renice -n 15 -p <PID1>
   renice -n -5 -p <PID2>
   ```

3. Compare CPU usage with `top`.

👉 Great way to *see the impact of process priority in action*.

---



\#Linux #DevOps #Monitoring #ProcessManagement #Automation

---
