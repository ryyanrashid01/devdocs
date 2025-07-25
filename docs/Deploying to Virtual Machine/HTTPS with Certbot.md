---
sidebar_position: 4
---

Securing your website with HTTPS encrypts the data exchanged between your server and visitors, protecting sensitive information and improving trust. SSL/TLS certificates enable HTTPS and are essential for modern websites. Let’s Encrypt is a free, automated certificate authority, and Certbot is a tool that makes it easy to obtain and manage these certificates.

---

## Step-by-Step Guide to Enable HTTPS

### Step 1: Install Certbot

- Certbot helps you get free SSL certificates from Let’s Encrypt.
- Install Certbot and the Nginx plugin by running:

```shell
sudo apt install certbot python3-certbot-nginx
```

---

### Step 2: Confirm Nginx Configuration

- Certbot automatically updates your Nginx config based on the `server_name` directive.
- Ensure you have a server block for your domain, typically located at:

```shell
 /etc/nginx/sites-available/example.com
```

- Open the file for editing:

```shell
sudo nano /etc/nginx/sites-available/example.com
```

- Find the `server_name` line and verify it matches your domain:

```conf
server_name example.com www.example.com;
```

- If it doesn’t match, update it and save the file.
- Check for syntax errors with:

```shell
sudo nginx -t
```

- If errors appear, fix them before continuing.
- Reload Nginx to apply changes:

```shell
sudo systemctl reload nginx
```

---

### Step 3: Allow HTTPS Traffic Through Firewall

- If you have the `ufw` firewall enabled, update its rules:
- Check current firewall status:

```shell
sudo ufw status
```

- Likely output shows only HTTP allowed (`Nginx HTTP` profile).
- Enable HTTPS by allowing the `Nginx Full` profile.
- The `Nginx Full` profile allows both HTTP (port 80) and HTTPS (port 443) traffic:

```shell
sudo ufw allow 'Nginx Full'
```

- Remove the old HTTP-only rule:

```shell
sudo ufw delete allow 'Nginx HTTP'
```

- Confirm your firewall now allows HTTPS:

```shell
sudo ufw status
```

---

### Step 4: Obtain and Install SSL Certificate

- Run Certbot with Nginx plugin to request your certificates:

```shell
sudo certbot --nginx -d example.com -d www.example.com
```

- Follow prompts to:
  - Enter your email address.
  - Agree to Let’s Encrypt terms.
  - Verify domain ownership.
- Choose whether to redirect all HTTP traffic to HTTPS:
  - Option 1: No redirect (keep HTTP and HTTPS both active).
  - Option 2: Redirect (recommended to force HTTPS).
- Certbot will then:
  - Automatically configure Nginx for HTTPS.
  - Reload Nginx to apply changes.
- You’ll see a success message confirming where certificates are saved.
- Visit your site with `https://` and verify the lock icon in the browser.
- Optionally, test your server with [SSL Labs Server Test](https://www.ssllabs.com/ssltest/) for an A grade.

---

### Step 5: Verify Automatic Certificate Renewal

- Let’s Encrypt certificates expire every 90 days.
- Certbot installs a systemd timer that runs twice daily to renew certificates.
- Check timer status with:

```shell
sudo systemctl status certbot.timer
```

- To test renewal manually, run:

```shell
sudo certbot renew --dry-run
```

- If no errors occur, your renewal is working.
- If renewal fails, Let’s Encrypt will email you before expiration.

---

### Troubleshooting Tips

- Ensure your domain’s DNS points to your server’s IP.
- Confirm ports 80 (HTTP) and 443 (HTTPS) are open in your firewall.
- Run `sudo nginx -t` after any config changes to catch errors early.
- Review Certbot logs in `/var/log/letsencrypt/` for details on failures.
- Backup your Nginx configs and certificates regularly.
