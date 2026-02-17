#!/bin/bash
# Installation script for VAULT Backend Dependencies
# Run this to install all required Python packages

echo "================================"
echo "VAULT Backend - Dependency Installation"
echo "================================"
echo ""

# Check if Python is available
if ! command -v python &> /dev/null && ! command -v python3 &> /dev/null; then
    echo "❌ Python not found. Please install Python 3.8+ first."
    exit 1
fi

# Use python3 if available, otherwise python
PYTHON_CMD="python3"
if ! command -v python3 &> /dev/null; then
    PYTHON_CMD="python"
fi

echo "Using Python: $PYTHON_CMD"
$PYTHON_CMD --version
echo ""

# Navigate to backend directory
cd "$(dirname "$0")/backend"

echo "📦 Installing dependencies from requirements.txt..."
echo ""

# Install with pip
$PYTHON_CMD -m pip install --upgrade pip setuptools wheel

echo ""
echo "⏳ Installing PyTorch (this may take a few minutes)..."
$PYTHON_CMD -m pip install torch torchvision torchaudio

echo ""
echo "⏳ Installing other dependencies..."
$PYTHON_CMD -m pip install -r requirements.txt

echo ""
echo "✅ Installation complete!"
echo ""
echo "Testing imports..."
$PYTHON_CMD -c "import torch; print(f'✓ PyTorch {torch.__version__}')"
$PYTHON_CMD -c "import torchvision; print(f'✓ TorchVision {torchvision.__version__}')"
$PYTHON_CMD -c "import xgboost; print(f'✓ XGBoost {xgboost.__version__}')"
$PYTHON_CMD -c "import PIL; print(f'✓ Pillow installed')"
$PYTHON_CMD -c "import sklearn; print(f'✓ Scikit-learn {sklearn.__version__}')"

echo ""
echo "================================"
echo "All dependencies installed! 🎉"
echo "================================"
