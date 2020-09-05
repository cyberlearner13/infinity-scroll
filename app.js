const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const apiKey = returnAPIKey();
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
  }
}

// Helper function to set attributes to the DOM titles

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
// Create Elements for Links and Photos, Add to DOM

function displayPhotos() {
  totalImages = photosArray.length;
  imagesLoaded = 0;
  // Run function for each element in the array
  photosArray.forEach((photo) => {
    //   Create <a> to link to unsplash
    const item = document.createElement('a');

    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    //  Create image for photo
    const img = document.createElement('img');

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);
    //  Put <img> inside <a>, and then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}
// Get Photos from Unsplash API

async function getPhotos() {
  try {
    const res = await fetch(apiURL);
    photosArray = await res.json();
    displayPhotos();
  } catch (err) {
    // Catch Error Here
  }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
