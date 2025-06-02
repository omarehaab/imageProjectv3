const imageUpload = document.getElementById("imageUpload");
const gallery = document.getElementById("gallery");
const selectedImage = document.getElementById("selectedImage");
const widthInput = document.getElementById("widthInput");
const heightInput = document.getElementById("heightInput");
const resizeBtn = document.getElementById("resizeBtn");

let currentImage = null;

function addImageToGallery(src) {
  const img = document.createElement("img");
  img.src = src;
  img.addEventListener("click", () => {
    selectedImage.src = src;
    currentImage = new Image();
    currentImage.src = src;
  });
  gallery.appendChild(img);
}

const errorMessage = document.getElementById("errorMessage");

imageUpload.addEventListener("change", async (e) => {
  errorMessage.textContent = ''; // Clear previous error
  const file = e.target.files[0];
  if (!file) return;

  if (!file.name.toLowerCase().endsWith('.jpg') && !file.name.toLowerCase().endsWith('.jpeg')) {
    errorMessage.textContent = 'Only .jpg and .jpeg files are allowed.';
    return;
  }

  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      errorMessage.textContent = result.error || 'Upload failed';
      return;
    }

    // Add uploaded image to gallery using server path
    addImageToGallery(`/images/${result.filename}`);
  } catch (error) {
    errorMessage.textContent = 'Error uploading file';
  }
});

resizeBtn.addEventListener("click", () => {
  if (!currentImage) {
    alert("Please select an image to resize.");
    return;
  }

  const width = parseInt(widthInput.value);
  const height = parseInt(heightInput.value);

  if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
    alert("Please enter valid dimensions.");
    return;
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(currentImage, 0, 0, width, height);

  const resizedDataUrl = canvas.toDataURL();
  selectedImage.src = resizedDataUrl;
  addImageToGallery(resizedDataUrl);
});
