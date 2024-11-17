// script.js

const imageInput = document.getElementById('imageInput');
const removeBgButton = document.getElementById('removeBgButton');
const resultImage = document.getElementById('resultImage');
const downloadButton = document.getElementById('downloadButton');

removeBgButton.addEventListener('click', async () => {
    if (!imageInput.files.length) {
        alert('Please select an image.');
        return;
    }

    const file = imageInput.files[0];
    const formData = new FormData();
    formData.append('image_file', file);
    formData.append('size', 'auto');

    try {
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': 'X8P7JNfFURz8irUB1SyejNRa' // Your API key
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors[0].title || 'Failed to remove background.');
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        // Display the processed image
        resultImage.src = url;
        resultImage.style.display = 'block';

        // Set up the download button
        downloadButton.href = url;
        downloadButton.style.display = 'inline-block';
    } catch (error) {
        alert(error.message);
    }
});
