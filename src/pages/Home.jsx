import React, { useState } from 'react';
import useFetchArticles from '../hooks/useFetchArticles';
import { insertArticle } from '../hooks/useLocalStorage';

const Home = () => {
    const [artikel, setArtikel] = useState('');
    const [keyword, setKeyword] = useState('technology');
    const { articles, loading, error } = useFetchArticles(keyword);

    const handleSearch = (event) => {
        event.preventDefault();
        setKeyword(event.target.elements.keyword.value);
    };

    const isSpecialIndex = (index) => {
        let base = 0;
        let add = 7;

        while (base <= index) {
            if (base === index) {
                return true;
            }
            base += add;
            add = (add === 7) ? 3 : 7;
        }

        return false;
    };

    function isPatternIndex(i) {
        let current = 0;

        if (i === 0) return false;

        current += 7;

        while (current <= i) {
            if (current === i) return true;
            current += 10;
        }

        return false;
    }

    const truncateTitle = (title, maxWords) => {
        const words = title.split(' ');
        if (words.length > maxWords) {
            return words.slice(0, maxWords).join(' ') + '...';
        }
        return title;
    };

    function formatDate(dateString) {
        const date = new Date(dateString);

        // Format tanggal
        const dayOptions = { weekday: 'short' }; // Sen, Sel, Rab, etc.
        const dayName = new Intl.DateTimeFormat('id-ID', dayOptions).format(date);

        const dateOptions = { day: '2-digit', month: 'long' }; // 25 April
        const formattedDate = new Intl.DateTimeFormat('id-ID', dateOptions).format(date);

        const timeOptions = { hour: '2-digit', minute: '2-digit' }; // 20.34
        const formattedTime = new Intl.DateTimeFormat('id-ID', timeOptions).format(date);

        return `${dayName}, ${formattedDate} ${formattedTime}`;
    }

    const handleModal = (article) => {
        document.getElementById('my_modal_1').showModal();
        setArtikel(article);
        insertArticle({
            title: article.title,
            url: article.url,
            urlToImage: article.urlToImage,
            createdAt: new Date().toISOString()
        });
    };

    const closeModal = () => {
        const modal = document.getElementById('my_modal_1');
        if (modal) {
            modal.close();
        }

        window.location.reload();
    };


    return (
        <div className="container mx-auto py-4 lg:px-40">
            <div>
                <form className=' fixed right-[8rem] z-50 lg:block hidden' onSubmit={handleSearch}>
                    <input
                        type="text"
                        name="keyword"
                        className="input input-bordered"
                        placeholder="Search for category"
                    />
                    <button type="submit" className="bg-blue-500 text-white btn ml-2">Search</button>
                </form>
            </div>
            <div>
                <img className=' fixed w-[11rem] h-auto left-4 top-[7rem] object-cover lg:block hidden' src="https://cdnstatic.detik.com/live/2024/07/klhk/240708-klhk-160x600-r2-v3.gif" alt="ads1" />
                <img className=' fixed w-[11rem] h-auto right-4 top-[7rem] object-cover lg:block hidden' src="https://cdnstatic.detik.com/live/2024/07/klhk/240708-klhk-160x600-r2-v3.gif" alt="ads1" />
            </div>
            {loading && (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-24'>
                    <div className="flex w-full flex-col gap-4">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div>
                    <div className="flex w-full flex-col gap-4">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div>
                    <div className="flex w-full flex-col gap-4">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div>
                    <div className="flex w-full flex-col gap-4">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:mt-24 mt-20">
                {articles.length > 0 ? (
                    articles.map((article, i) => (
                        <div onClick={() => handleModal(article)} key={i} className={`mb-2 bg-slate-600 p-2 relative ${isSpecialIndex(i) ? 'lg:col-span-2 md:row-span-2' : ''} transition-opacity duration-200 ease-in-out hover:opacity-70 hover:cursor-pointer active:opacity-70`}>
                            <div className="overflow-hidden h-full w-full">
                                <img src={article.urlToImage ? article.urlToImage : 'https://images8.alphacoders.com/133/thumb-1920-1330043.jpeg'}
                                    alt={`${i}image`}
                                    className='w-full h-full object-cover transition-transform duration-200 ease-in-out hover:scale-105' />
                            </div>
                            <div className={isPatternIndex(i) ? `absolute top-2 left-2 right-2 bg-black bg-opacity-50 px-2 py-1` : 'absolute bottom-2 left-2 right-2 bg-black bg-opacity-50 px-2 py-1'}>
                                <h2 className="text-lg text-white font-bold">
                                    {article.title !== '[Removed]' ? truncateTitle(article.title, 10) : truncateTitle('Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro inventore repellat vel molestias.', 10)}
                                </h2>
                                <h3 className='text-white font-bold'>{formatDate(article.publishedAt)}</h3>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No articles found.</p>
                )}
            </div>

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{artikel.title}</h3>
                    <p className="py-2 text-gray-500">By {artikel.author || 'Unknown Author'}</p>
                    <p className="py-2 text-gray-500">Source: {artikel.name || 'Unknown Source'}</p>
                    <img src={artikel.urlToImage ? artikel.urlToImage : 'https://images8.alphacoders.com/133/thumb-1920-1330043.jpeg'} alt={artikel.title} className="w-full h-auto my-4" />
                    <p className="py-4">{artikel.description}</p>
                    <p className="py-2 text-gray-500">Published At: {formatDate(artikel.publishedAt || '2024-07-08T22:30:00Z')}</p>
                    <div className="modal-action">
                        <a href={artikel.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Read More</a>
                        <button className="btn" onClick={() => closeModal()}>Close</button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Home;
