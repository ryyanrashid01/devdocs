---
title: Deploying a website to a VM
---

## 1\. Deploying a Website to a DigitalOcean Virtual Machine

This tutorial walks you through the process of deploying a website to a virtual machine (droplet) on DigitalOcean. It is intended for developers who want to automate and understand their deployment setup, rather than relying on pre-built platforms.

Each step explains not only what to do, but also why it’s being done, so that you gain a better understanding of how your website runs on a production server.

While this guide uses DigitalOcean as the hosting provider, the steps are nearly identical for other platforms, only the initial VM setup [Step 1](./Droplet%20Setup) may differ slightly.

## 2\. Step-by-Step Walkthrough

1. [Droplet Setup](./Droplet%20Setup) <br/>
   Create the server, generate SSH keys, and connect via SSH.

2. [GitHub Deploy Keys](./GitHub%20Deploy%20Keys) <br/>
   Configure SSH access to your private GitHub repo so the server can pull your code.

3. [Reverse Proxy with Nginx](./Reverse%20Proxy%20with%20Nginx) <br/>
   Use Nginx to serve your site and forward incoming traffic to the correct location.

4. [HTTPS with Certbot](./HTTPS%20with%20Certbot) <br/>
   Secure your website with a free SSL certificate from Let's Encrypt using Certbot.

5. [Startup Script](./Startup%20Script) <br/>
   Ensure your site or server process starts automatically when the VM reboots.

6. [GitHub Actions](./GitHub%20Actions) <br/>
   Automate deployments to your server whenever you push to the main branch.

---

Each section includes commands, explanations, and where appropriate, optional security improvements.

:::tip
This guide will walk you through the steps, and you’ll get hands-on experience with the command line and GitHub along the way.
:::
