---
sidebar_position: 1
---

Before we can deploy your website, we need a server; in this case, a **virtual machine (VM)** on DigitalOcean, often called a _droplet_. This will host your web files, handle requests, and run the services needed for your site.

### Why This Step Matters

Your droplet is the foundation of your web infrastructure. Every request to your site hits this server, so setting it up securely and efficiently is critical. SSH access allows you to securely connect and control it remotely.

---

### Step 1: Create a Droplet on DigitalOcean

:::info
If someone else has already created the droplet and given you the private key and server IP, you can skip to [Step 3](#step-3-connect-to-your-droplet).
:::

- Go to DigitalOcean Droplets
- Select a datacenter region close to your location.

![DigitalOcean datacenter](https://ik.imagekit.io/devdocs/img/deploy_to_vm/digital_ocean_server.png)

- Choose an image: Ubuntu is a stable, long-term support releases and works well for most setups.
- Choose a plan (the basic Shared CPU plan is fine to start)

![DigitalOcean image](https://ik.imagekit.io/devdocs/img/deploy_to_vm/digital_ocean_image.png)

#### Authentication:

Choose **SSH keys** as the authentication method. You’ll need to generate one if you haven’t already.

---

### Step 2: Generate an SSH Key Pair (If you don’t have one)

SSH keys are a secure alternative to passwords. You’ll use your private key to log into the server, and the public key gets added to the droplet.

Run this on your local machine (macOS, Linux, or WSL):

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

- When prompted, accept the default file location (`~/.ssh/id_ed25519`)
- Choose a passphrase for extra security.

:::tip
Choose a passphrase for extra security. You can create an SSH key without a password, but it is highly recommended to set one because this key is for the root SSH user.
:::

This creates:

- `~/.ssh/id_ed25519` — your **private** key (never share this)
- `~/.ssh/id_ed25519.pub` — your **public** key (safe to upload)

:::warning
Never share your private key. It must remain secret and secure. <br/>
It's safe to upload or share your public key (e.g., on GitHub or with a server). The private key is what grants access.
:::

Now, upload the **public** key to DigitalOcean during droplet creation.

---

### Step 3: Connect to Your Droplet

**a. If you created the droplet and your SSH key is in the default location**, connect using:

```bash
ssh root@your_droplet_ip
```

**b. If your private key is in a different location**, use:

```bash
ssh -i /path/to/private-key root@your_droplet_ip
```

Replace `/path/to/private-key` with the actual path to the file (for example, `~/.ssh/id_ed25519`), and `your_droplet_ip` with the server’s IP address.

After running the command, it will prompt you to enter the password that you set when creating your SSH keys. After entering your password, you should be connected to the server as the root user.
