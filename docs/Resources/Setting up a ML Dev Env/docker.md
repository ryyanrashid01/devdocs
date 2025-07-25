---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Docker Setup

Using Docker to manage your ML environments ensures consistency across machines, simplifies dependency management, and avoids polluting your local Python/Conda environment. This section guides you through setting up a Docker-based ML development environment.

---

:::info Optional but Powerful
This step is **optional**, but highly recommended for teams, reproducible research, or deployment.
:::

## 🧰 Prerequisites

- Docker installed (already done in the prerequisites section)
- NVIDIA GPU with drivers installed
- [NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html) for GPU access in containers

## ⚙️ Install NVIDIA Container Toolkit

<Tabs>
<TabItem value="ubuntu" label="🐧 Ubuntu" default>

```bash
sudo apt update
sudo apt install -y nvidia-container-toolkit
sudo systemctl restart docker
```

</TabItem>
<TabItem value="windows" label="🪟 Windows">

- Install [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install) and enable GPU support via WSLg.
- Make sure you install [Docker Desktop](https://www.docker.com/products/docker-desktop/) with WSL2 integration.
- Install NVIDIA drivers with WSL2 support: [WSL2 CUDA Setup](https://developer.nvidia.com/cuda/wsl)

</TabItem>
</Tabs>

---

## 📦 Creating the Docker Image

Here’s a simple `Dockerfile` for a GPU-enabled ML environment:

```Dockerfile
FROM nvidia/cuda:12.4.1-cudnn8-runtime-ubuntu22.04

# Set timezone and non-interactive mode
ENV TZ=Etc/UTC DEBIAN_FRONTEND=noninteractive

# Basic utilities and Python
RUN apt-get update && apt-get install -y \
    python3 python3-pip python3-dev python-is-python3 \
    git curl wget unzip build-essential \
    && apt-get clean

# Jupyter Lab and essential ML libraries
RUN pip install --no-cache-dir \
    jupyterlab \
    numpy pandas matplotlib scikit-learn \
    torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121 \
    tensorflow

# Default command
CMD ["jupyter", "lab", "--ip=0.0.0.0", "--allow-root", "--NotebookApp.token=''"]
```

Save this as `Dockerfile` and build it:

```bash
docker build -t ml-gpu-env .
```

---

## 🚀 Running the Container

```bash
docker run --gpus all -p 8888:8888 -v $PWD:/workspace -w /workspace ml-gpu-env
```

Then open your browser and go to `http://localhost:8888` to access JupyterLab.

---

## 🔁 Reproducible Environment with `docker-compose`

Create a `docker-compose.yml` file:

```yaml
version: "3.8"
services:
  ml:
    build: .
    image: ml-gpu-env
    ports:
      - "8888:8888"
    volumes:
      - .:/workspace
    working_dir: /workspace
    runtime: nvidia
    deploy:
      resources:
        reservations:
          devices:
            - capabilities: [gpu]
```

Then run:

```bash
docker compose up
```

---

## ✅ Verify GPU Access

Inside the container:

```bash
python -c "import torch; print(torch.cuda.is_available())"
```

You should see `True`.

---

## 🧯 Troubleshooting

- **`docker: Error response from daemon: could not select device driver "nvidia"`**

- Make sure the NVIDIA Container Toolkit is installed.
- Try restarting Docker: `sudo systemctl restart docker`

- **PyTorch or TensorFlow can't find GPU**

- Double-check CUDA version in image.
- Verify container is started with `--gpus all`

---

You now have an isolated, GPU-ready ML dev environment running in Docker! 🎉
