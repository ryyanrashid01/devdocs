# ML Development Environment: Setup Guide

Welcome to the comprehensive guide for setting up a **Machine Learning Development Environment** across Windows, Linux (Ubuntu), and macOS. This documentation is intended to help both new and experienced developers configure consistent and reliable environments for ML experimentation and development.

## 🎯 Objective

This guide provides step-by-step instructions to help you:

- Install and configure **Python**, **JupyterLab**, and popular ML libraries such as **NumPy**, **pandas**, **scikit-learn**, **PyTorch**, and **TensorFlow**
- Set up environments on **Windows**, **Linux**, and **macOS**
- Optionally use **Docker** or **Conda** for containerized and reproducible workflows
- Test the installation using example notebooks
- Troubleshoot common configuration and runtime issues

The goal is to ensure that all users, regardless of operating system, end up with a functioning and efficient ML dev environment with GPU support where applicable.

## 🧑‍💻 Who This Is For

This documentation is designed for:

- Data Scientists and ML Engineers starting new projects
- Students and researchers working across different platforms
- Teams that need standardized environments across machines or CI/CD pipelines
- Anyone setting up a new development machine

## 📦 What's Included

This documentation includes:

1.  [**Prerequisites**](prerequisits) <br/>
    Hardware/software requirements before setup

2.  [**CUDA**](./CUDA) <br/>
    Installing NVIDIA and CUDA drivers to enable GPU acceleration for machine learning.

3.  [**Common ML Libraries**](./common_libs) <br/>
    Installing essential ML libraries and managing versions

4.  [**Jupyter setup**](./jupyter) <br/>
    Installing and configuring JupyterLab

5.  [**Docker setup**](./docker) <br/>
    (Optional) Docker-based ML environment setup

6.  [**Testing your setup**](./test_setup) <br/>
    Run basic notebooks to verify your setup

## 📎 Conventions Used

- Commands are prefixed with the operating system emoji for clarity:
  - 🪟 Windows
  - 🐧 Linux
  - 🍏 macOS
- Code blocks are labeled for copy-paste convenience
- Each section is OS-specific when needed
- Tips and optional steps are clearly marked

## 💡 Why a Dedicated Setup Guide?

Machine learning development involves many moving parts: GPU drivers, Python environments, library compatibility, system packages, etc. Small misconfigurations can cause big issues. This guide aims to prevent frustration by:

- Minimizing guesswork
- Promoting reproducibility
- Providing real-world-tested setups
- Supporting all major platforms used in research and industry

---

Happy coding! 🚀
