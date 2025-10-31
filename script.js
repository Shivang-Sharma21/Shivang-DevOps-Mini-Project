const images = [
    { src: 'images/image1.jpg', caption: 'Shivang Sharma - Project Start' },
    { src: 'images/image2.jpg', caption: 'DevOps Automation in Progress' },
    { src: 'images/image3.jpg', caption: 'CI/CD Pipeline Complete!' }
];

let currentIndex = 0; 

function changeImage() {
    currentIndex = (currentIndex + 1) % images.length; 
    
    const imgElement = document.getElementById('dynamicImage');
    const captionElement = document.getElementById('imageCaption');
    
    imgElement.src = images[currentIndex].src;
    captionElement.textContent = images[currentIndex].caption;
}

// Initial check to make sure the first image loads immediately
document.addEventListener('DOMContentLoaded', () => {
    const imgElement = document.getElementById('dynamicImage');
    if (imgElement && images.length > 0) {
        imgElement.src = images[0].src;
        imgElement.alt = images[0].caption;
    }
});