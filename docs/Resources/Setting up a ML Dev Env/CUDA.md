---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CUDA Setup

Setting up your machine to use an NVIDIA GPU for acceleration can significantly improve training times in machine learning workflows. This guide walks you through installing the **CUDA Toolkit** and **cuDNN**, which provide the low-level libraries and drivers needed to run computations on NVIDIA GPUs. Instructions are provided for both **Windows** and **Ubuntu Linux** systems.

---

:::info Who needs CUDA?
If you're doing **deep learning** with PyTorch or TensorFlow and you have an **NVIDIA GPU**, setting up CUDA enables GPU acceleration for faster training.
:::

---

## 🛠️ Requirements

- NVIDIA GPU (GTX 10xx or later recommended)
- Python ≥ 3.9 (already installed)
- Conda (Miniconda/Anaconda — already installed)
- Admin/sudo privileges

:::warning Linux Users
NVIDIA driver compatibility issues are common on Linux. If you're using a **new GPU** (RTX 40xx or later), make sure you're on a **recent Ubuntu version (24.04+)**.
:::

---

## 🚀 Installation Steps

<Tabs>
<TabItem value="windows" label="🪟 Windows" default>

### 1. Download CUDA Toolkit

Install the latest stable CUDA Toolkit from NVIDIA:

👉 [CUDA Toolkit Download](https://developer.nvidia.com/cuda-downloads)

Choose your configuration:

- **Operating System:** Windows
- **Architecture:** x86_64
- **Version:** e.g., 12.4
- **Installer Type:** Network or Local Installer

Follow the guided installation. The toolkit will install:

- NVIDIA driver (if not already installed)
- CUDA Toolkit (compiler, libraries)
- cuDNN (if selected)

### 2. Add Environment Variables (Usually automatic)

The CUDA installer usually adds these automatically:

```powershell
C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.4\bin
C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.4\libnvvp
```

You can check and update the system **Environment Variables** manually if needed.

### 3. Verify CUDA Installation

Open Command Prompt or Anaconda Prompt:

```bash
nvcc --version
```

You should see the installed CUDA version.

</TabItem>

<TabItem value="linux" label="🐧 Ubuntu">

### 1. Verify GPU is Detected

```bash
lspci | grep -i nvidia
```

You should see something like:

```
NVIDIA Corporation Device XYZ
```

If not, stop here and check if your GPU is correctly installed.

### 2. Install NVIDIA Driver (Required)

```bash
sudo ubuntu-drivers autoinstall
```

Then reboot:

```bash
sudo reboot
```

Verify driver installation:

```bash
nvidia-smi
```

You should see GPU details and driver version.

:::warning Driver Compatibility
If you're using a **new GPU**, but your Ubuntu distro is old, the packaged drivers may be outdated. It is highly recommended that you upgrade your Ubuntu version. But if you still want, here is how you can install it manually.

<details>
<summary>Install latest drivers manually</summary>

1. Go to: [NVIDIA Driver Downloads](https://www.nvidia.com/Download/index.aspx)
2. Download the latest driver for your GPU.
3. Switch to a non-GUI terminal: `Ctrl + Alt + F2`
4. Stop display manager:

```bash
sudo systemctl stop gdm  # or lightdm/sddm depending on your distro
```

5. Run the installer:

```bash
sudo bash NVIDIA-Linux-x86_64-XYZ.run
```

6. Reboot your system:

```bash
sudo reboot
```

</details>
:::

### 3. Install CUDA Toolkit

Go to the [CUDA Toolkit Downloads](https://developer.nvidia.com/cuda-downloads) page and choose:

- **Linux** → **x86_64** → **Ubuntu** → your version → `.deb (network)`

Then follow the commands NVIDIA provides, or:

```bash
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-ubuntu2204.pin
sudo mv cuda-ubuntu2204.pin /etc/apt/preferences.d/cuda-repository-pin-600

wget https://developer.download.nvidia.com/compute/cuda/12.4.0/local_installers/cuda-repo-ubuntu2204-12-4-local_12.4.0-1_amd64.deb
sudo dpkg -i cuda-repo-ubuntu2204-12-4-local_12.4.0-1_amd64.deb
sudo cp /var/cuda-repo-ubuntu2204-12-4-local/cuda-*-keyring.gpg /usr/share/keyrings/
sudo apt-get update
sudo apt-get -y install cuda
```

### 4. Set Up Environment Variables

Add this to `~/.bashrc` or `~/.zshrc`:

```bash
export PATH=/usr/local/cuda/bin:$PATH
export LD_LIBRARY_PATH=/usr/local/cuda/lib64:$LD_LIBRARY_PATH
```

Then:

```bash
source ~/.bashrc
```

### 5. Verify CUDA Toolkit

```bash
nvcc --version
```

You should see the installed CUDA version.

</TabItem>
</Tabs>

---

:::info WSL2 and Linux installation are nearly identical

Installing CUDA on **WSL2** and **native Linux (Ubuntu)** follows almost the same steps — both require the right version of:

- NVIDIA GPU drivers
- CUDA Toolkit
- cuDNN libraries

The only major difference is where you download the installers from:

- [CUDA for Linux (Ubuntu)](https://developer.nvidia.com/cuda-downloads)
- [CUDA for WSL2 (Windows Subsystem for Linux)](https://developer.nvidia.com/cuda/wsl)

Always make sure the **driver version and CUDA version are compatible** with each other and your GPU. Refer to NVIDIA’s compatibility matrix if unsure.
:::

---

## 🔄 cuDNN Setup

cuDNN provides optimized deep learning primitives for CUDA-enabled GPUs. It's required for running TensorFlow or PyTorch with GPU support.

### 1. Create or Activate Your Conda Environment

```bash
conda create -n ml-gpu python=3.11
conda activate ml-gpu
```

### 2. Install PyTorch or TensorFlow with CUDA Support

<Tabs>
<TabItem value="pytorch" label="PyTorch" default>

Go to the [official PyTorch install guide](https://pytorch.org/get-started/locally/) and select:

- Your OS
- Package: `conda`
- Language: `python`
- Compute Platform: e.g. `CUDA 12.1`

Then run the generated command, e.g.:

```bash
conda install pytorch torchvision torchaudio pytorch-cuda=12.1 -c pytorch -c nvidia
```

</TabItem>

<TabItem value="tensorflow" label="TensorFlow">

Install via pip (inside your Conda env):

```bash
pip install tensorflow
```

TensorFlow will automatically use GPU if CUDA/cuDNN are set up.

</TabItem>
</Tabs>

---

## ✅ Verify GPU Usage

<Tabs>
<TabItem value="pytorch" label="PyTorch">

```python
import torch
print(torch.cuda.is_available())
print(torch.cuda.get_device_name(0))
```

</TabItem>
<TabItem value="tensorflow" label="TensorFlow">

```python
import tensorflow as tf
print(tf.config.list_physical_devices('GPU'))
```

</TabItem>
</Tabs>

You should see output confirming that a GPU is detected and available.

---

## 🧯 Troubleshooting

1. **`nvcc: command not found`**

- CUDA not installed or PATH not configured.
- Recheck `~/.bashrc` (Linux) or Environment Variables (Windows).

2. **`nvidia-smi` not found or fails**

- Driver not installed or incompatible.
- Reboot and try `nvidia-smi` again.

3. **PyTorch/TensorFlow can't find GPU**

- Ensure you've installed GPU-enabled versions.
- Confirm with `pip list` or `conda list`.
- Try reinstalling with the exact CUDA version.

---

You're now ready to train ML models with full GPU acceleration! 🚀
