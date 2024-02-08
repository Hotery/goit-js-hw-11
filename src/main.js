import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

    const form = document.querySelector('form');
    const input = document.querySelector('input');
    const gallery = document.querySelector('.gallery');
    const loader = document.querySelector('.loader'); 
    // Function to show the loader

    loader.style.display = 'none';
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const query = input.value.trim();

        if (query) {
            loader.style.display = 'block';

            fetch(`https://pixabay.com/api/?key=42259333-3fd7a9af9caf7b06e8f99497c&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    loader.style.display = 'none'; 

                    if (data.hits.length > 0) {
                        gallery.innerHTML = ''; 

                        data.hits.forEach(image => {
                            const img = document.createElement('img');
                            img.src = image.webformatURL;
                            img.alt = image.tags;
                            img.title = image.tags;

                            const caption = document.createElement('div');
                            caption.classList.add('caption');
                            caption.innerHTML = `
                                <ul class="caption-list">
                                    <li class="caption-text">Views: ${image.views}</li>
                                    <li class="caption-text">Likes: ${image.likes}</li>
                                    <li class="caption-text">Comments: ${image.comments}</li>
                                    <li class="caption-text">Downloads: ${image.downloads}</li>
                                </ul>
                            `;

                            const imageCard = document.createElement('a');
                            imageCard.href = image.largeImageURL;
                            imageCard.classList.add('image-card');
                            imageCard.appendChild(img);
                            imageCard.appendChild(caption);

                            gallery.appendChild(imageCard);
                        });

                        new SimpleLightbox('.gallery a', {
                        });
                    } else {
                        gallery.innerHTML = 'Sorry, there are no images matching your search query. Please try again!';
                    }
                    input.value = '';
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    loader.style.display = 'none';
                });
        }
    });

