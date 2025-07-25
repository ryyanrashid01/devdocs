---
sidebar_position: 3
---

This guide explains how to configure **Nginx as a reverse proxy** for a website or web application running on a virtual machine. A reverse proxy forwards incoming requests from your domain (like `example.com`) to an internal web server (e.g., a Django or Node app running on `localhost:8000`).

---

## Why Use a Reverse Proxy?

A reverse proxy sits between users and your app server. It lets you:

- Point a domain to your internal service (e.g. Python `manage.py runserver`)
- Improve security by keeping your app behind Nginx
- Control routing and handle static files or APIs more easily
- Add SSL with Certbot (see HTTPS setup guide)

---

## Step 1: Install Nginx

```bash
sudo apt update
sudo apt install nginx -y
```

Check Nginx is running:

```bash
sudo systemctl status nginx
```

You should see `active (running)`.

---

## Step 2: Create a Domain Config File

Nginx keeps site configs in `/etc/nginx/sites-available/`. Create a config for your domain:

```bash
sudo nano /etc/nginx/sites-available/example.com
```

Paste this:

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

> **Note:** Port `8000` is just a common default used by development servers like Django. You can use any available port, such as `3000` or `5000`, as long as your application is listening on it and your `proxy_pass` in the Nginx config matches the same port.

### Explanation

- `listen 80`: Accept HTTP requests on port 80
- `server_name`: Matches your domain
- `proxy_pass`: Forwards traffic to your app running locally
- `proxy_set_header`: Passes useful metadata (host, IP, scheme) to your app

---

## Step 3: Enable the Site and Reload Nginx

Create a symbolic link to `sites-enabled/`:

This command creates a symbolic link (like a shortcut) from your site config file in `sites-available/` to `sites-enabled/`. The `sites-available/` directory holds all site configurations, while `sites-enabled/` contains only the ones that Nginx will actually use. Linking the file tells Nginx to enable this site.

```bash
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
```

Test the config:

```bash
sudo nginx -t
```

If no errors:

```bash
sudo systemctl restart nginx
```

---

## Step 4: Start Your App on the Correct Port

Make sure your app is running and listening on `127.0.0.1:8000` (or another port you choose). For example, if you’re using Django, the default development server runs on port 8000.

```bash
cd /path/to/your/app
source .venv/bin/activate
python manage.py runserver
```

> If you are using any other framework, run the server on the appropriate port for that framework, and make sure to update your Nginx `proxy_pass` configuration accordingly.

Once your app is running, visit:

```
http://example.com
```

If you see a `502 Bad Gateway` error, it usually means your app is not running or not listening on the correct port.

---

## Step 5: Serving Static Files or APIs

You can customize the Nginx config further for static files, APIs, or separate frontend/backend apps.

### Example: Serving API and Frontend Separately

```nginx
server {
    listen 80;
    server_name example.com;

    location /api/ {
        proxy_pass http://127.0.0.1:8000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location / {
        root /var/www/html;
        index index.html;
        try_files $uri $uri/ =404;
    }
}
```

- Requests to `/api/` go to your backend (e.g. Django, Node)
- Other requests (like `/about`) load static HTML from `/var/www/html`

---

## Troubleshooting

- If you see `502 Bad Gateway`, your app is probably not running or listening on the wrong port.
- Make sure your app binds specifically to `127.0.0.1` (the loopback IP address), not just `localhost`, and listens on port `8000` or whatever port your app is running on.
- Always run `sudo nginx -t` after making config changes.
- Check Nginx logs:

```bash
sudo tail -f /var/log/nginx/error.log
```
