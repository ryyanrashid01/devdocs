---
sidebar_position: 6
---

When you want to **automate deployment** from your GitHub repository to your server (e.g., a cloud VM), you need a secure way for GitHub Actions to connect to your server without exposing your credentials. This is where **SSH keys** and **GitHub Secrets** come into play.

---

## What’s Happening Here?

- GitHub Actions will run on each push (or other triggers you define).
- It uses an SSH private key stored securely in GitHub Secrets.
- It connects to your server over SSH.
- It pulls the latest code from your repository.
- It restarts your app’s systemd service to apply the update.

---

## Step 1: Prepare SSH Key Access for GitHub Actions

### Generate SSH Key (On Your Local Machine or CI Runner)

If you don’t already have a deploy key or dedicated SSH key for GitHub Actions to connect to your server, generate one:

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f github-actions -N ""
```

- This creates two files:

  - `github-actions` (private key).
  - `github-actions.pub` (public key) — to add on your server.

:::warning
Never share your private key. It must remain secret and secure. <br/>
It's safe to upload or share your public key (e.g., on GitHub or with a server). The private key is what grants access.
:::

### Add the Public Key to Your Server’s Authorized Keys

- Copy the content of `github-actions.pub`.
- Log in to your server.
- Edit the `authorized_keys` file:

```bash
nano ~/.ssh/authorized_keys
```

- Paste the public key at the end of this file.
- Save and exit.

_Why:_ This allows GitHub Actions to SSH into your server without a password.

---

## Step 2: Add Secrets to Your GitHub Repository

Go to your repository’s **Settings → Secrets and variables → Actions → New repository secret**, and add the following:

![Github Actions](https://ik.imagekit.io/devdocs/img/deploy_to_vm/github_actions.png)

| Secret Name    | Description                                                              |
| -------------- | ------------------------------------------------------------------------ |
| `HOST`         | Your server’s IP or domain name                                          |
| `USER`         | SSH username on the server                                               |
| `SSH_KEY`      | The _private_ key file content from `github-actions` (paste entire file) |
| `SERVICE_NAME` | The name of your systemd service (e.g., `yourapp.service`)               |

:::tip
Keep these secrets safe and never share them publicly.
:::
:::note
If you prefer, you can hardcode `HOST`, `USER`, and `SERVICE_NAME` directly in your deployment script. Just make sure to keep `SSH_KEY` as a secret — it should never be committed or exposed.
:::

---

## Step 3: Create the GitHub Actions Workflow

- Create a file at this location in your repository:

```bash
.github/workflows/deploy.yml
```

- Paste the following:

```yaml
name: Deploy on Push # This is just the name shown in the GitHub Actions UI

# This defines when the workflow runs.
on:
  push:
    branches:
      - main # Trigger deployment when code is pushed to the "main" branch
      # Change this if your default branch is something else (e.g., "master" or "production")

jobs:
  deploy:
    runs-on: ubuntu-latest # The GitHub Actions runner environment

    steps:
      - name: Checkout code
        uses: actions/checkout@v4 # Checks out the code in the workflow so it's available (not always used here but good practice)

      - name: Setup SSH
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.SSH_KEY }}" > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          ssh-keyscan -H ${{ secrets.HOST }} >> ~/.ssh/known_hosts

          # Why: These steps create a temporary SSH setup so the runner can connect to your server securely.
          # The private key is stored in GitHub Secrets as SSH_KEY.
          # ssh-keyscan adds the server's host key to avoid "Are you sure you want to continue connecting?" prompts.

      - name: Deploy to server
        run: |
          ssh ${{ secrets.USER }}@${{ secrets.HOST }} << EOF
            cd /path/to/your/app  # Update this to the actual folder on your server
            git fetch origin
            git reset --hard origin/main  # Replace "main" if you’re deploying a different branch
            sudo systemctl restart ${{ secrets.SERVICE_NAME }}  # Replace with your actual systemd service
          EOF
```

_Why:_ This SSHs into your server, updates the codebase, and restarts the service.

---

## Step 4: Customize your setup

If you're writing your own workflow file or modifying the above:

| Section                                  | What You Can Change                                                           | Notes                                           |
| ---------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------- |
| `on.push.branches`                       | Change to match your deployment branch (e.g., `production`)                   | Or add more branches as needed                  |
| `runs-on`                                | Use a different runner (e.g., self-hosted)                                    | Usually `ubuntu-latest` is fine                 |
| `secrets.SSH_KEY`                        | Should contain the **private key** that matches the public key on your server | Add it under your repo’s **Settings > Secrets** |
| `secrets.HOST`                           | Your server's IP (e.g., `123.45.67.89`)                                       | No protocol, no port                            |
| `secrets.USER`                           | The username used to SSH into your server (e.g., `ubuntu`, `deploy`)          | Must match the server setup                     |
| `/path/to/your/app`                      | Absolute path to your app's folder on the server                              | e.g., `/home/ubuntu/my-app`                     |
| `origin/main`                            | Replace `main` with the correct branch if needed                              | `origin/production` for example                 |
| `sudo systemctl restart yourapp.service` | The command to restart your app’s service                                     | Must be configured via `systemd` on the server  |

---

## Why This Works

- **SSH private key** stored securely in GitHub Secrets allows passwordless login.
- `ssh-keyscan` avoids SSH authenticity confirmation prompts.
- The server updates your app’s codebase directly from GitHub.
- The systemd service restart reloads your app with the new code.

---

## _Optional Improvements_

- Use `git pull --rebase` instead of `git reset` if you want to preserve uncommitted changes.
- Add build or test steps before deployment.
- Use `rsync` for file synchronization if your app needs static assets copied.

---

## Troubleshooting

- **Permission denied (publickey):** SSH keys not set up properly; verify keys and authorized_keys.
- **Timeout or connection refused:** Check server IP, firewall, and SSH daemon status.
- **Service not restarting:** Verify service name and `sudo` permissions for the GitHub user.
- Use `sudo visudo` to allow passwordless restart for your service:

```pgsql
youruser ALL=NOPASSWD: /bin/systemctl restart yourapp.service
```
