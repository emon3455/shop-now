import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import AuthProvider from '@/providers/AuthProvider';
import React from 'react';
import Toaster from '@/components/Toast'

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

            <Toaster />


        </div>
    );
};

export default layout;