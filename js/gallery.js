const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

// 1. Знаходжу контейнер галереї в DOM
const galleryContainer = document.querySelector('.gallery');

// 2. Створюю HTML-розмітку для всіх елементів галереї
const galleryMarkup = images
  .map(
    ({ preview, original, description }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${original}">
          <img
            class="gallery-image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`
  )
  .join('');

// 3. Вставляю створену розмітку в контейнер галереї
galleryContainer.innerHTML = galleryMarkup;

// 4. Додаю слухача подій на контейнер галереї (делегування)
galleryContainer.addEventListener('click', onGalleryItemClick);

// 5. Функція-обробник кліку
function onGalleryItemClick(event) {
  // Забороняю дію за замовчуванням (перехід за посиланням)
  event.preventDefault();

  // Перевіряю, чи був клік саме на зображенні
  const isGalleryImage = event.target.classList.contains('gallery-image');
  if (!isGalleryImage) {
    return;
  }

  // Отримую URL великого зображення з data-атрибута
  const largeImageUrl = event.target.dataset.source;

  console.log(largeImageUrl);

  // Створюю модальне вікно з великим зображенням
  const instance = basicLightbox.create(
    `
    <img src="${largeImageUrl}" width="800" height="600">
  `,
    {
      // додаю опцію закриття
      onShow: (instance) => {
        window.addEventListener('keydown', onEscKeyPress);
      },

      onClose: (instance) => {
        window.removeEventListener('keydown', onEscKeyPress);
      },
    }
  );

  // Відкриваю модальне вікно
  instance.show();

  // Функція для закриття модального вікна клавішею Esc
  function onEscKeyPress(event) {
    if (event.code === 'Escape') {
      instance.close();
    }
  }
}
