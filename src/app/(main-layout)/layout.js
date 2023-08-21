import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const layout = ({ children }) => {
    return (
        <div>

            <div className="bg-base-200">
                <Navbar></Navbar>
            </div>

            <div className="container mx-auto">
                {children}
            </div>

            <footer className="bg-base-200">
                <Footer></Footer>
            </footer>


        </div>
    );
};

export default layout;