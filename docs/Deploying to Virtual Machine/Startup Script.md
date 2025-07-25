---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Setting up your app as a **systemd service** ensures it starts automatically after a reboot and can be easily managed like any other Linux service. This is ideal for apps deployed with Docker or running persistently in the background.

---

## Step 1: Create a systemd Service File

Create a new service file:

```bash
sudo nano /etc/systemd/system/example-app.service
```

> Replace `example-app.service` with a name that reflects your actual application.

---

## Step 2: Define the Service Configuration

Paste the following content into your service file:

```ini
[Unit]
Description=Example App Service
# Uncomment these if your app depends on Docker
# After=docker.service
# Requires=docker.service

[Service]
WorkingDirectory=/home/example-user/example-app
ExecStart=/bin/bash -c '/usr/bin/docker compose -f /home/example-user/example-app/docker-compose.yml up >> /home/example-user/example-app/server.log 2>&1'
ExecStop=/usr/bin/docker compose -f /home/example-user/example-app/docker-compose.yml down
Restart=on-failure
TimeoutStartSec=600
User=example-user
Group=example-user
Environment=DOCKER_BUILDKIT=1
Environment=COMPOSE_DOCKER_CLI_EXPERIMENTAL=1

[Install]
WantedBy=multi-user.target
```

:::note If You're Not Using Docker
Replace the `ExecStart` and `ExecStop` commands with whatever you use to run your app (e.g., `node index.js`, `npm run start`, `gunicorn`, etc.).  
See [Using systemd Without Docker](#using-systemd-without-docker).
:::

### Explanation of Each Field

| Field              | Purpose                                                                 |
| ------------------ | ----------------------------------------------------------------------- |
| `WorkingDirectory` | Directory where your application code lives.                            |
| `ExecStart`        | Command to start the app (this example runs Docker Compose).            |
| `ExecStop`         | Command to stop the app cleanly.                                        |
| `Restart`          | Restarts the app automatically on failure.                              |
| `User` / `Group`   | The Linux user and group under which the service runs.                  |
| `Environment`      | Environment variables used by Docker or your app.                       |
| `WantedBy`         | Ensures this service starts on boot during the default system runlevel. |

### Using systemd Without Docker

<Tabs>
    <TabItem value="node_node" label="Node.js (node)" default>
    e.g. running `node index.js`
    ```ini
    ExecStart=/usr/bin/node /home/example-user/example-app/index.js
    ExecStop=/bin/kill -TERM $MAINPID
    ```
    </TabItem>
    <TabItem value="node_npm" label="Node.js (npm)" default>
    e.g. running `npm start`
    ```ini
    ExecStart=/usr/bin/npm start --prefix /home/example-user/example-app
    ExecStop=/bin/kill -TERM $MAINPID
    ```
    </TabItem>
    <TabItem value="python" label="Python (Gunicorn)" default>
    e.g. Flask or Django
    ```ini
    ExecStart=/home/example-user/.venv/bin/gunicorn app:app --bind 127.0.0.1:8000
    ExecStop=/bin/kill -TERM $MAINPID
    ```
    :::info
    Replace `app:app` with your actual module and application name.
    :::
    </TabItem>
    <TabItem value="next_react" label="Next / React" default>
    e.g. `npm run start`
    ```ini
    ExecStart=/usr/bin/npm run start --prefix /home/example-user/example-app
    ExecStop=/bin/kill -TERM $MAINPID
    ```
    </TabItem>
</Tabs>

:::info Why Use Full Paths in `ExecStart`
systemd service files should always use **absolute paths** (e.g., `/usr/bin/node`, `/usr/bin/npm`) instead of just `node` or `npm`. This is because `systemd` may not inherit your shell's `$PATH`, and commands might fail to run if the path is not explicitly defined.
:::

:::tip How to Find the Full Path of a Command
Use the `which` command to determine the absolute path:

```bash
which node
# /usr/bin/node

which npm
# /usr/bin/npm

which gunicorn
# /home/youruser/.venv/bin/gunicorn
```

If you're using a Python virtual environment (like `venv`), the path will usually be inside your project directory or user home:

```bash
/home/youruser/myapp/.venv/bin/gunicorn
```

:::

Make sure to copy the **exact** paths into your `ExecStart` and `ExecStop` lines.

---

## Step 3: Reload and Enable the Service

1. Reload systemd to recognize your new service:

```bash
sudo systemctl daemon-reload
```

2. Enable the service to auto-start on boot:

```bash
sudo systemctl enable example-app.service
```

3. Start the service now:

```bash
sudo systemctl start example-app.service
```

---

## Step 4: Verify the Service is Running

- Check if the service is active:

```bash
sudo systemctl status example-app.service
```

- You should see something like `active (running)` if everything is working.

---

## Step 5: View Logs

- Your app logs are saved to the file defined in `ExecStart`. For example:

```bash
/home/example-user/example-app/server.log
```

- You can monitor the logs in real time:

```bash
sudo tail -f /home/example-user/example-app/server.log
```

---

## Step 6: Reboot and Confirm Auto-Start

- Restart your machine to make sure the service starts automatically:

```bash
sudo reboot now
```

- Once it reboots, check the service again:

```bash
sudo systemctl status example-app.service
```

---

## Service Management Commands

Use these commands to control your app:

- **Start**:

```bash
sudo systemctl start example-app.service
```

- **Stop**:

```bash
sudo systemctl stop example-app.service
```

- **Restart**:

```bash
sudo systemctl restart example-app.service
```

- **Status**:

```bash
sudo systemctl status example-app.service
```
