import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
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

        fetch(
            `https://pixabay.com/api/?key=42259333-3fd7a9af9caf7b06e8f99497c&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
        )
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

                    const markup = data.hits
                        .map(data => {
                            return `<li class="gallery-item"><a href="${data.webformatURL}">
                                <img class="gallery-image" src="${data.webformatURL}" alt="${data.tags}"></a>
                                <p><b>Likes: </b>${data.likes}</p>
                                <p><b>Views: </b>${data.views}</p>
                                <p><b>Comments: </b>${data.comments}</p>
                                <p><b>Downloads: </b>${data.downloads}</p>
                                </li>`;
                        })
                        .join('');
                    gallery.insertAdjacentHTML('afterbegin', markup);

                    const options = {
                        captions: true,
                        captionSelector: 'img',
                        captionType: 'attr',
                        captionsData: 'alt',
                        captionPosition: 'bottom',
                        animation: 250,
                      };
                    const lightbox = new SimpleLightbox('.gallery a', options);
                    lightbox.on('show.simplelightbox', () => {
                    });
                    lightbox.refresh();
                    form.reset();
                }
            })
            .catch(error => {
                console.error('Помилка при отриманні даних:', error);
                loader.style.display = 'none';
            });
    } else {
        gallery.innerHTML =
            'Вибачте, немає зображень, що відповідають вашому запиту. Спробуйте ще раз!';
    }
    input.value = '';
});