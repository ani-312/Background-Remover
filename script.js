// script.js

document.getElementById('removeBgButton').addEventListener('click', function () {
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select an image first!');
        return;
    }

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('image_file', file);

    // The remove.bg API endpoint
    const apiEndpoint = 'https://api.remove.bg/v1.0/removebg';

    // Your API key
    const apiKey = 'X8P7JNfFURz8irUB1SyejNRa';

    // Send the request to remove the background
    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'X-Api-Key': apiKey
        },
        body: formData
    })
    .then(response => response.blob())
    .then(imageBlob => {
        // Create an image URL from the returned Blob
        const imageUrl = URL.createObjectURL(imageBlob);

        // Display the processed image below the background remover tool
        const outputImage = document.createElement('img');
        outputImage.src = imageUrl;
        outputImage.alt = 'Background Removed Image';
        outputImage.style.maxWidth = '100%';
        outputImage.style.marginTop = '20px';
        document.querySelector('.bg-remover-tool').appendChild(outputImage);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    });
});
