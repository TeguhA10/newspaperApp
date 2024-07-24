import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';

const AppRouter = () => {
    return (
        <Router>
            <div>
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        {/* <Route path="/article/:id" element={<ArticlePage />} />
                        <Route path="/history" element={<History />} /> */}
                        <Route path="*" element={<div>404 Not Found</div>} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default AppRouter;
