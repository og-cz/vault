@echo off
REM Installation script for VAULT Backend Dependencies (Windows)
REM Run this to install all required Python packages

echo ================================
echo VAULT Backend - Dependency Installation
echo ================================
echo.

REM Check if Python is available
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python not found. Please install Python 3.8+ first.
    echo Download from: https://www.python.org/downloads/
    pause
    exit /b 1
)

echo Python version:
python --version
echo.

REM Navigate to backend directory
cd /d "%~dp0backend"

echo 📦 Installing dependencies from requirements.txt...
echo.

REM Upgrade pip
echo Upgrading pip...
python -m pip install --upgrade pip setuptools wheel

echo.
echo ⏳ Installing PyTorch (this may take several minutes)...
python -m pip install torch torchvision torchaudio

echo.
echo ⏳ Installing other dependencies...
python -m pip install -r requirements.txt

echo.
echo ✅ Installation complete!
echo.
echo Testing imports...

python -c "import torch; print(f'✓ PyTorch {torch.__version__}')" 2>nul || echo ❌ PyTorch failed
python -c "import torchvision; print(f'✓ TorchVision {torchvision.__version__}')" 2>nul || echo ❌ TorchVision failed
python -c "import xgboost; print(f'✓ XGBoost {xgboost.__version__}')" 2>nul || echo ❌ XGBoost failed
python -c "import PIL; print(f'✓ Pillow installed')" 2>nul || echo ❌ Pillow failed
python -c "import sklearn; print(f'✓ Scikit-learn {sklearn.__version__}')" 2>nul || echo ❌ Scikit-learn failed

echo.
echo ================================
echo All dependencies installed! 🎉
echo ================================
echo.
pause
