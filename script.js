// Categories
const loadCategories = () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(err => console.log(err));
}

const displayCategories = (categories) => {
    const ulEl = document.getElementById('categoriesList');

    ulEl.innerHTML = categories.map(category => {
        const { category_id, category_name } = category;

        return `<li onClick="loadNews('${category_name}', '${category_id}')">${category_name}</li>`
    }).join('');
}
loadCategories();


// On Category click
const loadNews = (cat, id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(cat, data.data))
        .catch(err => console.log(err));
}
const displayNews = (cat, data) => {
    const categoryItemsCountEl = document.getElementById('categoryItemsCount');
    categoryItemsCountEl.innerHTML = `<span>${data.length > 0 ? `${data.length} items found for category <span>${cat}</span>` : `No news found for category <span>${cat}</span>`}</span>`;

    console.log(data);
}