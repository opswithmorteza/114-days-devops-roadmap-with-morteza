# 🚀 Day 10 – Web Services (Nginx & Apache)

## 🔹 Overview

Web services are the backbone of modern DevOps infrastructures. At the heart of it are **web servers** like **Nginx** and **Apache**, which serve static content, proxy dynamic requests, and handle encryption via **SSL/TLS**.

Understanding them is essential for **LPIC-2** and for real-world DevOps practices.

---

## 🔹 Core Concepts

* **Web Server**: Software that listens on ports (default: `80` for HTTP, `443` for HTTPS) and serves content to clients.
* **Reverse Proxy**: A server that sits in front of web applications, handling client requests and passing them to backend services.
* **Virtual Host**: Hosting multiple websites/domains on a single server.
* **SSL/TLS**: Encryption protocol to secure communication between client and server.

---

## 🔹 Installing Nginx & Apache

### Nginx

```bash
# Debian/Ubuntu
sudo apt update && sudo apt install nginx -y

# CentOS/RHEL
sudo yum install epel-release -y
sudo yum install nginx -y
```

### Apache (httpd)

```bash
# Debian/Ubuntu
sudo apt update && sudo apt install apache2 -y

# CentOS/RHEL
sudo yum install httpd -y
```

---

## 🔹 Managing Services

```bash
# Start & Enable
sudo systemctl start nginx
sudo systemctl enable nginx

sudo systemctl start apache2
sudo systemctl enable apache2

# Check status
systemctl status nginx
systemctl status apache2
```

---

## 🔹 Configuring Nginx

### Default Config File

* `/etc/nginx/nginx.conf`
* `/etc/nginx/sites-available/` (Ubuntu/Debian)

### Example: Virtual Host

```nginx
server {
    listen 80;
    server_name example.com;

    root /var/www/example.com/html;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🔹 Configuring Apache

### Virtual Host Example

```apache
<VirtualHost *:80>
    ServerName example.com
    DocumentRoot /var/www/example.com/public_html

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

Enable site:

```bash
sudo a2ensite example.com.conf
sudo systemctl reload apache2
```

---

## 🔹 Reverse Proxy with Nginx

```nginx
server {
    listen 80;
    server_name app.example.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 🔹 SSL/TLS with Self-Signed Certificate

```bash
# Generate private key & cert
sudo openssl req -x509 -nodes -days 365 \
  -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key \
  -out /etc/ssl/certs/nginx-selfsigned.crt
```

### Configure in Nginx

```nginx
server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate /etc/ssl/certs/nginx-selfsigned.crt;
    ssl_certificate_key /etc/ssl/private/nginx-selfsigned.key;

    location / {
        root /var/www/example.com/html;
        index index.html;
    }
}
```

Redirect HTTP → HTTPS:

```nginx
server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}
```

---

## 🔹 Useful Commands

```bash
# Test configuration
nginx -t
apachectl configtest

# Reload services after config change
systemctl reload nginx
systemctl reload apache2

# Logs
tail -f /var/log/nginx/access.log
tail -f /var/log/apache2/error.log
```

---

## 🔹 Key Insights

* Nginx is lightweight, faster for static content, and widely used as a reverse proxy/load balancer.
* Apache is more flexible with modules, widely supported, but heavier than Nginx.
* SSL/TLS configuration is a must for modern web security.
* Understanding **Virtual Hosts** and **Reverse Proxy** setups is crucial for DevOps pipelines and microservices.

---

✅ This covers the **core LPIC-2 Web Services topics** + real-world DevOps best practices.
