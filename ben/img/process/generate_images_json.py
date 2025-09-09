# generate_images_json.py
import os
import json

# folder with your HTML and images
directory = os.path.dirname(os.path.abspath(__file__))
output_file = os.path.join(directory, "images.json")

# collect all image files
image_files = [
    f for f in os.listdir(directory)
    if f.lower().endswith((".png", ".jpg", ".jpeg"))
]

# write JSON
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(image_files, f, indent=2)

print(f"Generated {output_file} with {len(image_files)} images.")