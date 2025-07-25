---
sidebar_position: 2
---

When deploying a website from a private GitHub repository to a server (like a DigitalOcean droplet), you need a secure way for the server to access the repo without exposing your personal credentials. This is where **deploy keys** come in.

---

## What Is a Deploy Key?

A **deploy key** is an SSH key pair where:

- **The public key** is added under _Deploy keys_ in the repository’s settings (not in your user settings).
- The **private key** is stored securely on your server or in your CI/CD pipeline.
- This allows the server to authenticate with GitHub _only for that repository_ — limiting scope and improving security.
- You can grant the key **read-only** access (default) or **read/write** access if the server needs to push changes.

---

## Step-by-Step Guide to Using Deploy Keys

### Step 1: Generate SSH Key Pair on the Server or CI Runner

Run this on your server or your CI environment (or generate locally and copy over):

```bash
ssh-keygen -t ed25519 -C "deploy-key-for-github" -f ~/.ssh/deploy_key -N ""
```

- `-t ed25519`: Specifies the Ed25519 algorithm, which is modern and secure.
- `-C`: Adds a comment to identify the key.
- `-f`: Specifies the filename.
- `-N ""`: Creates the key with no passphrase for automated use.

This generates:

- `~/.ssh/deploy_key` (private key) — keep this secure and never share publicly.
- `~/.ssh/deploy_key.pub` (public key) — this will be uploaded to GitHub.

---

### Step 2: Add the Public Key to Your GitHub Repository

1.  Open your GitHub repo in a browser.
2.  Navigate to **Settings** > **Deploy keys**.
3.  Click **Add deploy key**.

![GitHub deploy keys](/img/deploy_to_vm/github_deployment.png)

4.  Give the key a descriptive title (e.g., "DigitalOcean Server Deploy Key").
5.  Paste the contents of `~/.ssh/deploy_key.pub` into the key field.

:::tip
You usually don’t need to give the key write access for deployment. Leave it unchecked for better security.
:::

6.  Click **Add key**.

_Why:_ This step authorizes your server to clone and pull from your private repo using SSH, but only for this repo.

---

### Step 3: Configure Your Server to Use the Deploy Key

1.  Copy the private key (`deploy_key`) to your server’s `~/.ssh` directory if you generated it elsewhere.
2.  Set the correct permissions to keep the key secure:

```bash
chmod 600 ~/.ssh/deploy_key
```

3.  Create or edit your SSH config file at `~/.ssh/config` to tell SSH which key to use for GitHub:

```bash
nano ~/.ssh/config
```

Add the following:

```bash
  Host github.com
	HostName github.com
	User git
	IdentityFile ~/.ssh/deploy_key
	IdentitiesOnly yes
```

_Why:_ SSH needs to know which key to use when connecting to GitHub. This prevents conflicts if you have multiple keys.

---

### Step 4: Clone or Update Your Repository on the Server

- **To clone the repository** (if you haven’t already):

```bash
git clone git@github.com:your-username/your-repo.git /var/www/your-site
```

- **To update the repo** (after initial clone):

```bash
cd /var/www/your-site
git fetch origin
git reset --hard origin/main
```

_Why:_ This fetches your latest website code so your server can serve the current version.

---

### _Optional: Using Deploy Keys in GitHub Actions_

If you plan to automate deployments whenever you push to GitHub, you can use the deploy key in a GitHub Actions workflow.

This involves storing the private key as a GitHub secret and using it to SSH into your server during deployment.

You don’t need to set this up right now, but if you're interested in automating your deployment process, see the [GitHub Actions](./GitHub%20Actions) for step-by-step instructions.

_Why:_ This lets your GitHub workflow securely authenticate to your server and update the website code automatically. You can trigger deployments on various events, such as:

- When you push to the main branch
- When a pull request is merged
- On a manual trigger (using the `workflow_dispatch` event)
- On a schedule (e.g. nightly builds using `schedule`)

:::tip
Automating deployments saves time and reduces manual errors, keeping your site up-to-date effortlessly.
:::

---

## Troubleshooting Tips

- **Permission denied (publickey)** errors mean the SSH key isn’t configured correctly or the key isn’t added to GitHub.
- Check permissions on your private key (`chmod 600 ~/.ssh/deploy_key`).
- Verify SSH connection with:

```bash
ssh -T git@github.com
```

- If you have multiple SSH keys, make sure your SSH config file specifies the correct one for GitHub.
