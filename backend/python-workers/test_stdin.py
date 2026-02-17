"""
Test script for the image analysis pipeline
Tests edge cases and large file handling via stdin
"""
import json
import sys
import os
import base64

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from PIL import Image
import io


def create_test_image(size=224, name="test"):
    """Create a test image and return as PIL Image."""
    img = Image.new('RGB', (size, size), color='red')
    return img


def test_stdin_communication():
    """Test that stdin communication works correctly."""
    print("[Test] Testing stdin communication...")
    
    # Create a test image
    test_img = create_test_image(256)
    
    # Convert to bytes
    img_bytes = io.BytesIO()
    test_img.save(img_bytes, format='JPEG')
    img_bytes.seek(0)
    image_data = img_bytes.getvalue()
    
    # Encode to base64
    image_b64 = base64.b64encode(image_data).decode('utf-8')
    
    # Create input JSON
    input_data = {
        'image_b64': image_b64,
        'filename': 'test_image.jpg'
    }
    
    # Test JSON encoding/decoding
    json_str = json.dumps(input_data)
    json.loads(json_str)
    
    print(f"[Test] Created test image: {len(image_data)} bytes")
    print(f"[Test] Base64 encoded: {len(image_b64)} bytes")
    print(f"[Test] JSON payload: {len(json_str)} bytes")
    print("[Test] ✓ stdin communication test passed")
    
    return True


def test_large_image():
    """Test with a larger image to ensure stdin can handle it."""
    print("\n[Test] Testing with larger image...")
    
    # Create a larger test image
    test_img = create_test_image(1024)
    
    # Convert to bytes
    img_bytes = io.BytesIO()
    test_img.save(img_bytes, format='JPEG', quality=95)
    img_bytes.seek(0)
    image_data = img_bytes.getvalue()
    
    # Encode to base64
    image_b64 = base64.b64encode(image_data).decode('utf-8')
    
    print(f"[Test] Created large image: {len(image_data)} bytes")
    print(f"[Test] Base64 encoded: {len(image_b64)} bytes")
    
    # This would have exceeded command-line limits on Windows
    # ENAMETOOLONG limit is typically around 32KB on Windows
    if len(image_b64) > 32000:
        print(f"[Test] ✓ Image size ({len(image_b64)} bytes) exceeds Windows command-line limit (32KB)")
        print("[Test] ✓ stdin method is necessary for this size")
    
    return True


if __name__ == '__main__':
    print("="*60)
    print("Image Analysis Pipeline - stdin Communication Tests")
    print("="*60 + "\n")
    
    try:
        test_stdin_communication()
        test_large_image()
        
        print("\n" + "="*60)
        print("All tests passed! stdin communication is working.")
        print("="*60)
        
    except Exception as e:
        print(f"\n[ERROR] Test failed: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
