document.addEventListener('DOMContentLoaded', () => {
    const imageElement = document.getElementById('dynamic-image');
    const button = document.getElementById('change-image-btn');
    
    // Image IDs for famous Indian landmarks (using picsum placeholders)
    const landmarkIds = [
        65,   // Taj Mahal (initial)
        1044, // Kerala Backwaters
        1050, // Desert landscape (Rajasthan)
        1076, // Mumbai cityscape/Gateway of India feel
        1079  // Mountain landscape (Himalayas)
    ];
    let currentImageIndex = 0;

    button.addEventListener('click', () => {
        // Move to the next image ID in the list
        currentImageIndex = (currentImageIndex + 1) % landmarkIds.length;
        const newId = landmarkIds[currentImageIndex];
        
        // Update the image source to the new picture size 600x400
        imageElement.src = `https://picsum.photos/id/${newId}/600/400`;
        imageElement.alt = `Landmark ID ${newId}`;
    });
});