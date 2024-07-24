// useLocalStorage.js

const MAX_ARTICLES = 6;

const insertArticle = (article) => {
    try {
        const articles = JSON.parse(localStorage.getItem('readArticles')) || [];
        
        articles.push(article);
        
        articles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        if (articles.length > MAX_ARTICLES) {
            articles.length = MAX_ARTICLES;
        }
        
        localStorage.setItem('readArticles', JSON.stringify(articles));
    } catch (error) {
        console.error('Error saving article to localStorage:', error);
    }
};

const selectArticles = () => {
    try {
        const articles = JSON.parse(localStorage.getItem('readArticles')) || [];
        articles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return articles;
    } catch (error) {
        console.error('Error retrieving articles from localStorage:', error);
        return [];
    }
};

export { insertArticle, selectArticles };
