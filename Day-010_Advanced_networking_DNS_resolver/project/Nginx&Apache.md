# 🚀 Day 10 Project – Web Services (Nginx & Apache)

## 🔹 Goal

Set up **two different web services** on a single Linux server:

1. **Apache** hosting a static website (`www.apache-demo.local`)
2. **Nginx** working as a **reverse proxy** to an internal Flask app (`www.nginx-proxy.local`)

You will configure **virtual hosts**, enable **SSL (self-signed)**, and demonstrate **reverse proxying**.

---

## 🔹 Steps

### 1. Prepare Directories & Content

```bash
sudo mkdir -p /var/www/apache-demo/html
sudo mkdir -p /var/www/nginx-proxy/html

echo "<h1>Welcome to Apache Demo Site</h1>" | sudo tee /var/www/apache-demo/html/index.html
echo "<h1>Flask App Reverse-Proxied by Nginx</h1>" | sudo tee /var/www/nginx-proxy/html/index.html
```

---

### 2. Apache Configuration

```bash
sudo nano /etc/apache2/sites-available/apache-demo.conf
```

Add:

```apache
<VirtualHost *:80>
    ServerName www.apache-demo.local
    DocumentRoot /var/www/apache-demo/html
    ErrorLog ${APACHE_LOG_DIR}/apache-demo-error.log
    CustomLog ${APACHE_LOG_DIR}/apache-demo-access.log combined
</VirtualHost>
```

Enable and restart:

```bash
sudo a2ensite apache-demo.conf
sudo systemctl reload apache2
```

---

### 3. Flask Backend for Nginx

```bash
sudo apt install python3-flask -y

# Create app
mkdir ~/flaskapp && cd ~/flaskapp
cat > app.py << 'EOF'
from flask import Flask
app = Flask(__name__)

@app.route("/")
def home():
    return "<h1>Hello from Flask backend!</h1>"

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
EOF

# Run Flask
python3 app.py
```

---

### 4. Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/nginx-proxy
```

Add:

```nginx
server {
    listen 80;
    server_name www.nginx-proxy.local;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Enable and restart:

```bash
sudo ln -s /etc/nginx/sites-available/nginx-proxy /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

### 5. SSL Setup (Self-Signed)

```bash
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/private/devops-selfsigned.key \
  -out /etc/ssl/certs/devops-selfsigned.crt
```

Add SSL to Nginx site:

```nginx
server {
    listen 443 ssl;
    server_name www.nginx-proxy.local;

    ssl_certificate /etc/ssl/certs/devops-selfsigned.crt;
    ssl_certificate_key /etc/ssl/private/devops-selfsigned.key;

    location / {
        proxy_pass http://127.0.0.1:5000;
    }
}
```

Redirect HTTP to HTTPS:

```nginx
server {
    listen 80;
    server_name www.nginx-proxy.local;
    return 301 https://$host$request_uri;
}
```

Reload:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🔹 Verification

* Add domains to `/etc/hosts`:

```bash
127.0.0.1 www.apache-demo.local
127.0.0.1 www.nginx-proxy.local
```

* Test:

```bash
curl http://www.apache-demo.local
curl -k https://www.nginx-proxy.local
```

You should see:

* Apache static site served on port 80
* Flask app served securely via Nginx reverse proxy on port 443

---

## 🔹 Deliverables

1. **Apache static website** running on `www.apache-demo.local`
2. **Nginx reverse proxy with SSL** running on `www.nginx-proxy.local`
3. Screenshots of both working websites (`index.html` + Flask app)

---

✅ This project proves your ability to configure **multi-service hosting**, manage **virtual hosts**, and implement **SSL**—all key LPIC-2 & DevOps skills.
