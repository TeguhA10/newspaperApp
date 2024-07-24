import React, { useState, useEffect } from 'react';
import { FaHistory } from "react-icons/fa";
import { selectArticles } from '../hooks/useLocalStorage';

function Header() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const savedArticles = selectArticles();
        setHistory(savedArticles);
    }, []);
    return (
        <div className="drawer fixed z-50">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="navbar bg-white drop-shadow w-full md:px-9">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 text-3xl font-bold">NewsPaper</div>
                    <div className="hidden flex-none lg:block">
                        <ul className="menu menu-horizontal items-center">
                            {/* Navbar menu content here */}
                            <li className='dropdown dropdown-bottom dropdown-end'>
                                <div tabIndex={0} role="button" className="btn btn-ghost">
                                    <FaHistory className=' text-3xl'/>
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-[25rem] p-2 shadow">
                                    <p className=' text-red-600'>maksimal 6 data history yang akan tersimpan</p>
                                    {history.length > 0 ? (
                                        history.map((article, index) => (
                                            <li key={index} className=''>
                                                <div className='flex items-center space-x-4 border-b'>
                                                    <img src={article.urlToImage ? article.urlToImage : 'https://images8.alphacoders.com/133/thumb-1920-1330043.jpeg'} alt="" className='h-[4rem] w-[4rem] object-cover rounded' />
                                                    <a href={article.url} target="_blank" rel="noopener noreferrer" className='flex-1'>
                                                        {article.title}
                                                    </a>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <li><a>No history found</a></li>
                                    )}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4">
                    <li><a>Maaf atas kekurang nya, tidak cukup waktu untuk menyempurnakanya 🙏</a></li>
                </ul>
            </div>
        </div>
    );
}

export default Header;
