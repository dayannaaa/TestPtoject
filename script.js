const apiKey = '66c11c4db6c14c51b5ff2063b212073f'; 
const apiUrl = 'https://newsapi.org/v2/everything';


function searchArticles() {
    const searchInput = document.getElementById('searchInput');
    const keyword = searchInput.value.trim().toLowerCase();

    fetchArticles(keyword) // Pass the keyword to the fetchArticles function
        .then(articles => {
            displayArticles(articles);
        })
        .catch(error => console.error('Error searching articles:', error));
}
async function fetchArticles(keyword) {
   
    try {
        const response = await fetch(`${apiUrl}?apiKey=${apiKey}&q=${keyword}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        if (!data.articles || !Array.isArray(data.articles)) {
            throw new Error('Invalid response data.');
        }
        return data.articles;
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
}


function displayArticles(articles) {
    const articlesList = document.getElementById('articlesList');
    articlesList.innerHTML = '';

    articles.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('article');
        articleDiv.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <p><strong>Author:</strong> ${article.author}</p>
            <p><strong>Source:</strong> ${article.source.name}</p>
            <p><strong>Published At:</strong> ${article.publishedAt}</p>
            <img src="${article.urlToImage}" alt="${article.title}">
        `;
        articlesList.appendChild(articleDiv);
    });
}

function sortArticles() {
    const sortSelect = document.getElementById('sortSelect');
    const sortBy = sortSelect.value;

    fetchArticles()
        .then(articles => {
            if (sortBy === 'publishedAt') {
                articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
            } else if (sortBy === 'title') {
                articles.sort((a, b) => a.title.localeCompare(b.title));
            }

            displayArticles(articles);
        })
        .catch(error => console.error('Error fetching articles:', error));
}

function searchArticles() {
    const searchInput = document.getElementById('searchInput');
    const keyword = searchInput.value.trim().toLowerCase();

    fetchArticles()
        .then(articles => {
            const filteredArticles = articles.filter(article =>
                article.title.toLowerCase().includes(keyword) ||
                article.description.toLowerCase().includes(keyword)
            );

            displayArticles(filteredArticles);
        })
        .catch(error => console.error('Error searching articles:', error));
}

fetchArticles()
    .then(displayArticles)
    .catch(error => console.error('Error fetching articles:', error));
