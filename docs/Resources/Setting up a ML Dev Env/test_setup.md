---
sidebar_position: 7
---

# Testing Your Setup

Before diving into real-world machine learning projects, it's important to verify that your environment is correctly configured — especially GPU acceleration.

This page walks you through minimal tests using **PyTorch**, **TensorFlow**, and **Jupyter** to confirm everything is running smoothly.

---

## 🧪 PyTorch Test

Activate your conda environment if not already:

```bash
conda activate ml-gpu
```

Then run this Python script:

```python
import torch

print("PyTorch version:", torch.__version__)
print("CUDA available:", torch.cuda.is_available())

if torch.cuda.is_available():
    print("GPU Name:", torch.cuda.get_device_name(0))
```

Expected output:

```
PyTorch version: 2.x
CUDA available: True
GPU Name: NVIDIA GeForce RTX 4080
```

:::tip GPU not found?
Make sure you installed PyTorch with CUDA support from the [official instructions](https://pytorch.org/get-started/locally/). Go to [CUDA Setup](./CUDA) for more details.
:::

---

## 🧪 TensorFlow Test

```python
import tensorflow as tf

print("TensorFlow version:", tf.__version__)
print(tf.config.list_physical_devices('GPU'))
```

Expected output:

```
TensorFlow version: 2.x
[PhysicalDevice(name='/physical_device:GPU:0', device_type='GPU')]
```

If no GPUs show up, double-check:

- You installed the GPU-enabled TensorFlow
- CUDA and cuDNN are properly set up
- Go to [CUDA Setup](./CUDA) for more details.

---

## 📓 Jupyter Notebook Test

1. Launch JupyterLab:

```bash
jupyter lab
```

2. Create a new Python 3 notebook in your `ml-gpu` environment.
3. Run either the PyTorch or TensorFlow test cells above.

:::info Where to place your notebooks?
You can organize notebooks in a `notebooks/` folder at the root of your repo:

```
my-project/
├── env.yml
├── notebooks/
│   ├── test-pytorch.ipynb
│   └── test-tensorflow.ipynb
```

:::

---

## 🧪 Optional: Stress Test Your GPU

Want to see your GPU in action? Here's a fun little stress test script using PyTorch:

### 🔥 GPU Burn Test

<details> 
<summary>**Show Code**</summary>
```python
import torch
import time

def burn_gpu(seconds=20, size=15000):

    print("🔥 Starting GPU stress test...")
    print("Device:", torch.cuda.get_device_name(0))

    print(f"Allocating matrices of size {size}x{size}...")
    try:
        a = torch.randn(size, size, device="cuda")
        b = torch.randn(size, size, device="cuda")
    except RuntimeError as e:
        print("\n❌ Failed to allocate matrices. Try using a smaller size.")
        print("Error:", e)
        return

    print("Allocated two large matrices on the GPU.")

    start = time.time()
    iterations = 0

    while time.time() - start < seconds:
        c = torch.matmul(a, b)
        torch.cuda.synchronize()
        iterations += 1

    print(f"\n✅ Done. Completed {iterations} matrix multiplications in {seconds} seconds.")

if **name** == "**main**":

    burn_gpu(seconds=20, size=15000)

```

</details>

#### Notes
- Adjust size carefully based on your GPU VRAM. For 4GB or lower, use size=8000 or less.
- You can monitor usage using:
    - `nvidia-smi` (CLI)
    - `nvtop` (Linux CLI UI: `sudo apt install nvtop; nvtop`)
    - Task Manager > Performance > GPU (Windows)

![nvtop](https://ik.imagekit.io/devdocs/img/ml_env/nvtop.png)

---

## 🧯 Troubleshooting

| Issue                                | Fix                                                                 |
| ------------------------------------ | ------------------------------------------------------------------- |
| `torch.cuda.is_available()` is False | Check CUDA version and reinstall PyTorch with GPU support           |
| `nvidia-smi` not found               | NVIDIA driver missing or not loaded                                 |
| TensorFlow sees no GPU               | Double-check cuDNN + TensorFlow versions and verify with `pip list` |

---

You're now ready to build and train ML models with full acceleration. 🚀
```
