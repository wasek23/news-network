// Selectors
const categoriesListEl = document.getElementById('categoriesList');
const newsLoaderEl = document.getElementById('newsLoader');
const categoryItemsCountEl = document.getElementById('categoryItemsCount');
const newsListEl = document.getElementById('newsList');
const modalBodyEl = document.getElementById('newsDetailsModalBody');


// Categories
const loadCategories = () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(err => console.log(err));
}

const displayCategories = (categories) => {
    categoriesListEl.innerHTML = categories.map(category => {
        const { category_id, category_name } = category;

        return `<li onClick="loadNews('${category_name}', '${category_id}')">${category_name}</li>`;
    }).join('');
}
loadCategories();


// On Category click
const loadNews = (cat, id) => {
    newsLoaderEl.classList.remove('d-none'); // Loader
    newsListEl.innerHTML = '';

    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(cat, data.data))
        .catch(err => console.log(err));
}

const renderSingleNews = (news, isMore = false) => {
    const { _id, image_url, title, details, author, total_view, rating } = news;
    const { img, name, published_date } = author || {};

    return `<div class='singleNews'>
        <img src='${image_url}' class='thumbnail img-fluid' alt='${title}' />

        <h3 class='title'>${title}</h3>

        <p class='details ${isMore ? 'truncate' : ''}'>${details}</p>

        <div class='d-flex align-items-center justify-content-between mb-4'>
            <div class='author'>
                ${img ? `<img src='${img}' class='authorPhoto img-fluid' alt='${name}' />` : 'No data found!'}

                <span class='d-flex flex-column'>
                    <span class='authorName'>${name || 'No data found!'}</span>
                    <span class='publishDate'>${published_date ? new Date(published_date).toLocaleDateString('en-us', { year: 'numeric', month: 'short', day: 'numeric' }) : 'No data found!'}</span>
                </span>
            </div>

            <div class='views'>
                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 16 16'>
                    <path d='M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z' />
                    <path d='M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z' />
                </svg>

                ${total_view || 'No data found!'}
            </div>
        </div>

        <div class='d-flex align-items-center justify-content-between'>
            <div class='rating'>
                <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' viewBox='0 0 16 16'>
                    <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
                </svg>

                ${rating?.number || 'No data found!'}
            </div>

            ${isMore ? `<button class='modalBtn' onClick="loadNewsDetails('${_id}')" data-bs-toggle='modal' data-bs-target='#newsDetails'>
                <svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' fill='currentColor' viewBox='0 0 16 16'>
                    <path fill-rule='evenodd' d='M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z' />
                </svg>
            </button>` : ''}
        </div>
    </div>`
}

const displayNews = (cat, data) => {
    // Categories count
    categoryItemsCountEl.innerHTML = `<span>${data.length > 0 ? `${data.length} items found for category <span>${cat}</span>` : `No news found for category <span>${cat}</span>`}</span>`;

    // Display News
    newsListEl.innerHTML = data.map(news => `<div class='col-12 col-sm-6 col-lg-4 mb-4'>
        ${renderSingleNews(news, true)}
    </div>`).join('');

    newsLoaderEl.classList.add('d-none'); // Loader
}

// News Details
const loadNewsDetails = id => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data[0]))
        .catch(err => console.log(err));
}

const displayNewsDetails = data => {
    modalBodyEl.innerHTML = renderSingleNews(data, false);
}