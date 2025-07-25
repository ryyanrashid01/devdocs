---
sidebar_position: 3
---

# Common ML Libraries

Once your system is CUDA-ready and you have Python and Conda set up, the next step is to install common ML libraries used in model training, evaluation, and experimentation.

We'll guide you through installing PyTorch, TensorFlow, scikit-learn, XGBoost, pandas, NumPy, and more — all inside a Conda environment for version isolation.

## 🧱 Create a Conda Environment

Always start by creating and activating a new environment:

```
conda create -n ml python=3.11 -y
conda activate ml
```

:::tip Naming Convention
Use descriptive names like `ml`, `ml-gpu`, or `ml-projectname` to keep environments organized and easy to manage.
:::

## ⚙️ Core Libraries

- These are libraries that form the foundation of most ML projects:

```
conda install numpy pandas scikit-learn matplotlib seaborn -c conda-forge
```

- You can also include:

```
conda install jupyterlab ipykernel -c conda-forge
```

:::info Why conda-forge?
The conda-forge channel contains more up-to-date packages and builds compatible with a wider range of platforms and CUDA toolkits.
:::

## 🤖 Deep Learning Libraries

### PyTorch

- Follow the official [install guide](https://pytorch.org/get-started/locally/) for exact versions. Example for CUDA 12.1:

```
conda install pytorch torchvision torchaudio pytorch-cuda=12.1 -c pytorch -c nvidia
```

### TensorFlow

- Auto-detects GPU if CUDA/cuDNN are available:

```
pip install tensorflow
```

### Other Useful Libraries

- These help with model training, experimentation, and visualization:

```
pip install xgboost lightgbm optuna tqdm plotly
```

## 🧪 Verify Installation

Check if the deep learning libraries can detect GPU:

```
import torch
print(torch.cuda.is_available())
print(torch.cuda.get_device_name(0))

import tensorflow as tf
print(tf.config.list_physical_devices('GPU'))
```

## 🧯 Troubleshooting

- Try creating a fresh Conda environment and install from scratch. Avoid mixing pip and conda unless necessary.
- Make sure you installed TensorFlow after setting up CUDA and cuDNN. Run nvidia-smi to verify GPU drivers.
- Refer to official compatibility matrix of each library (e.g. PyTorch + CUDA version).
