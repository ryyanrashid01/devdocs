---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Prerequisites

Before setting up your Machine Learning Development Environment, ensure your system meets the hardware and software requirements listed below.

---

## 🖥️ Hardware Requirements

:::note
These are **recommended minimums**. ML tasks like training deep learning models may require significantly more resources, especially GPU memory
:::

| Component  | Minimum                 | Recommended                       |
| ---------- | ----------------------- | --------------------------------- |
| RAM        | 8 GB                    | 16 GB or more                     |
| CPU        | Dual-core               | Quad-core or higher               |
| GPU        | Optional (for CPU-only) | NVIDIA GPU (CUDA support)         |
| Disk Space | 10 GB free              | 50+ GB (especially with datasets) |

:::tip GPU Notes

- NVIDIA GPUs (GTX 10xx or newer) are supported for PyTorch and TensorFlow.
- Apple Silicon (M1/M2/M3) can use the Metal backend (TensorFlow only).
- AMD GPUs are not well supported in mainstream ML libraries.
  :::

![CPU_vs_GPU](https://ik.imagekit.io/devdocs/img/ml_env/gpu-vs-cpu-cores.png)

---

## ⚙️ Software Requirements

The following tools are required across all platforms:

| Tool                       | Purpose                   |
| -------------------------- | ------------------------- |
| Git                        | Version control           |
| Python ≥3.9                | Core programming language |
| Conda (Miniconda/Anaconda) | Managing environments     |
| Docker _(optional)_        | Containerized development |
| VS Code _(optional)_       | Code editor (recommended) |

---

## 🔧 System-Specific Preparation

<Tabs>
    <TabItem value="windows" label="🪟 Windows" default>
        1. Use `winget` for streamlined CLI installations
        2. Enable **WSL 2** if you plan to run Linux-based tools or Docker
        ```powershell
        wsl --install
        ```
    </TabItem>
    <TabItem value="linux" label="🐧 Linux">
        1. Update packages:
        ```bash
        sudo apt update && sudo apt upgrade
        ```
        2. Install build essentials:
        ```bash
        sudo apt install build-essential curl unzip
        ```
    </TabItem>
    <TabItem value="macos" label="🍏 macOS">
        1. Install Homebrew:
        ```bash
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        ```
        2. Update Homebrew:
        ```bash
        brew update && brew upgrade
        ```
    </TabItem>
</Tabs>

---

## 🔗 Installation Links & Verification

### 📦 Python

<Tabs>
    <TabItem value="windows" label="🪟 Windows" default>
        ```bash
        winget install Python.Python.3.12
        ```
        [Download manually](https://www.python.org/downloads/windows/)
    </TabItem> 
    <TabItem value="linux" label="🐧 Linux">
        ```bash
        sudo apt update && sudo apt install python3 python3-pip
        ```
    </TabItem> 
    <TabItem value="macos" label="🍏 macOS">
        ```bash
        brew install python
        ```
        [Or install manually](https://www.python.org/downloads/mac-osx/)
    </TabItem> 
</Tabs>

---

**Python Verification**

:::note
Run the following in your terminal or command prompt:

```bash
python --version
pip --version
```

You should now see the installed Python version displayed in your terminal.
:::

---

### 🐍 Conda

<Tabs>
  <TabItem value="miniconda" label="Miniconda" default>
    Recommended lightweight installer.
    - [Download Miniconda](https://docs.conda.io/en/latest/miniconda.html)
  </TabItem>
  <TabItem value="anaconda" label="Anaconda">
    Full distribution with data science libraries included.
    - [Download Anaconda](https://www.anaconda.com/products/distribution)
  </TabItem>
</Tabs>

<details>
    <summary>**Which one should I choose?**</summary>

    Unless you specifically need the **built-in data science packages** that come with Anaconda, use **Miniconda**:
    - **Miniconda** is lightweight and faster to install.
    - You can install only what you need, avoiding dependency bloat.
    - It gives you more control over your virtual environments.
    - Ideal for machine learning workflows where environments vary per project.

    Use **Anaconda** only if you prefer a pre-packaged setup or are working in offline environments.

</details>

:::info
Add Conda to PATH (or Enable Shell Integration)

During the installer setup, **make sure to enable Conda in your terminal or shell environment**.

For each OS:
<Tabs>
<TabItem value="windows" label="Windows" default>
In the Miniconda/Anaconda installer, check the box that says:

**_"Add Miniconda/Anaconda to my PATH environment variable"_**
</TabItem>
<TabItem value="unix" label="Linux / macOS" default>
After installation, run this command **once** in your terminal to enable Conda in your shell:

```bash
conda init
```

Then restart your terminal.
</TabItem>
</Tabs>

---

This ensures you can run `conda`, `python`, and `pip` commands without needing to activate anything manually.
:::

#### After installation

After installing Miniconda or Anaconda, you should initialize Conda to enable it in your shell.

<Tabs>
<TabItem value="windows" label="Windows" default>
If you are using **Anaconda Prompt**, Conda should work out of the box.
If you're using PowerShell or Command Prompt (CMD), and conda isn't recognized, try this:

```bash
conda init powershell
```

or

```bash
conda init cmd.exe
```

</TabItem>
<TabItem value="linux_mac" label="Linux / macOS" default>
Run this command in your terminal:

```bash
conda init
```

Then **restart your terminal** to apply the changes.
</TabItem>
</Tabs>

---

:::warning Conda: command not found / not recognized
If you see an error like conda: command not found (Linux/macOS) or 'conda' is not recognized as an internal or external command (Windows), it means Conda isn't in your system PATH.

Here’s how to fix it:

<Tabs>
<TabItem value="windows" label="Windows" default>
Make sure you selected the option "Add Miniconda/Anaconda to my PATH environment variable" during installation.

If you skipped that:

1. Open the **Start Menu**, search for **“Environment Variables”**.
2. Click **Edit** the system environment variables.
3. In the **System Properties** window, click **Environment Variables**.
4. Under System variables, find the **Path** variable, click **Edit**, and add the path to your Conda installation.
5. Default path for Miniconda:

```ini
C:\Users\<YourUsername>\miniconda3\Scripts\
```

After adding it, **restart your terminal**.
</TabItem>
<TabItem value="linux_mac" label="Linux / macOS" default>
Add the following line to your shell config (`~/.zshrc` on macOS, `~/.bashrc` on Linux):

```bash
export PATH="$HOME/miniconda3/bin:$PATH"
```

Then run:

```bash
source ~/.bashrc  # or source ~/.zshrc depending on your shell
```

Then **restart your terminal** to apply the changes.
</TabItem>
</Tabs>

:::

---

### 🐳 Docker (Optional)

Useful if you want to use prebuilt Jupyter/ML containers or isolate your dev environment.

<Tabs>
    <TabItem value="windows" label="🪟 Windows" default>
        1. Install [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/)
        2. Enable WSL 2 during setup
    </TabItem> 
    <TabItem value="linux" label="🐧 Linux">
        ```bash
        sudo apt install docker.io
        ```
        Official Docker install for Linux
    </TabItem> 
    <TabItem value="macos" label="🍏 macOS">
        1. [Download](https://docs.docker.com/desktop/setup/install/mac-install/) and install.
    </TabItem> 
</Tabs>

---

:::note Verify Docker

```bash
docker --version
```

Should return Docker version info.
:::

---

### 🛠️ Git

<Tabs>
    <TabItem value="windows" label="🪟 Windows" default>
        ```bash
        winget install Git.Git
        ```
    </TabItem> 
    <TabItem value="linux" label="🐧 Linux">
        ```bash
        sudo apt install git
        ```
    </TabItem> 
    <TabItem value="macos" label="🍏 macOS">
        ```bash
        brew install git
        ```
    </TabItem> 
</Tabs>

:::note Verify Git

```bash
git --version
```

:::

---

## 🧪 Optional: VS Code

Highly recommended IDE for Python and ML workflows.

<Tabs>
    <TabItem value="windows" label="🪟 Windows" default>
        ```bash
        winget install Microsoft.VisualStudioCode
        ```
    </TabItem> 
    <TabItem value="linux" label="🐧 Linux">
        ```bash
        sudo snap install code --classic
        ```
    </TabItem> 
    <TabItem value="macos" label="🍏 macOS">
        ```bash
        brew install --cask visual-studio-code
        ```
    </TabItem> 
</Tabs>

or

[Download from VS Code site](https://code.visualstudio.com/)
