import { useState, useEffect, useCallback } from 'react';
import { BASE_URL } from '../api/newsApi';
import debounce from 'lodash.debounce';

const useFetchArticles = (keyword) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchArticles = useCallback(
        debounce(async (keyword) => {
            setLoading(true);
            setError(null);

            const cachedData = localStorage.getItem(`articles-${keyword}`);
            if (cachedData) {
                setArticles(JSON.parse(cachedData));
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${BASE_URL.replace('keyword', keyword)}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setArticles(data.articles);
                localStorage.setItem(`articles-${keyword}`, JSON.stringify(data.articles));
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }, 500), // Delay of 500ms
        []
    );

    useEffect(() => {
        if (keyword) {
            fetchArticles(keyword);
        }
    }, [keyword, fetchArticles]);

    return { articles, loading, error };
};

export default useFetchArticles;
