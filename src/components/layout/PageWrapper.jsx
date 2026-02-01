import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const PageWrapper = ({ children, hideFooter = false }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            {!hideFooter && <Footer />}
        </div>
    );
};

export default PageWrapper;
