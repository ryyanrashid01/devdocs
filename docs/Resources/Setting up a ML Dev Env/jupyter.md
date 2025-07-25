---
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# JupyterLab Setup

JupyterLab is a powerful web-based interface for interactive computing. It is the preferred environment for many machine learning and data science workflows.

This section walks you through installing and configuring **JupyterLab** in your Conda environment.

---

## 🧪 Installation

Activate your Conda environment (e.g., `ml-gpu`):

```bash
conda activate ml-gpu
```

Then install JupyterLab:

```bash
conda install -c conda-forge jupyterlab
```

---

## 🚀 Launch JupyterLab

Inside the same environment:

```bash
jupyter lab
```

This will start a local server and open the interface in your browser at:

```
http://localhost:8888/lab
```

---

## ⚙️ Configuration (Optional)

To persist settings or avoid token prompts, generate a config file:

```bash
jupyter lab --generate-config
```

Edit `~/.jupyter/jupyter_lab_config.py` and set:

```python
c.ServerApp.open_browser = False
c.ServerApp.token = ''
c.ServerApp.password = ''  # Optional, for local use only
```

> You can also change the default port by setting `c.ServerApp.port = 8889`

---

## 📦 Useful Extensions

You can extend JupyterLab functionality using extensions. Some recommended ones:

```bash
conda install -c conda-forge jupyterlab-git
conda install -c conda-forge ipywidgets
```

These enable Git integration and interactive widgets.

---

## 🧠 Using in VS Code

If you're working inside VS Code:

1. Install the [Jupyter Extension](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter)
2. Select your Conda environment as the Python interpreter
3. Open `.ipynb` files directly in VS Code

This allows inline execution and variable inspection inside the IDE.

---

## ✅ Verify Jupyter Kernel

Ensure your Conda env is registered as a Jupyter kernel:

```bash
python -m ipykernel install --user --name=ml-gpu --display-name "Python (ml-gpu)"
```

Then from the JupyterLab interface, select `Python (ml-gpu)` as the kernel.

---

:::tip
Keep your Conda environment isolated and clean by only installing what you need. Use `conda list` to inspect packages.
:::

You're now ready to build and run interactive ML notebooks! 📓🚀
