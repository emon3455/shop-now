/* eslint-disable react/no-unescaped-entities */
import LoginSvg from '@/components/LoginSvg';
import SocialLogin from '@/components/SocialLogin';
import Link from 'next/link';
import React from 'react';
import LoginForm from './LoginForm';


const LoginPage = () => {


    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center items-center gap-5 p-2">
                <div className="card w-full max-w-md shadow-lg shadow-indigo-500/50 bg-base-100 order-2 md:order-1">
                    
                    <LoginForm></LoginForm>

                    <div className="px-4 pb-2">
                        <p className="text-center text-gray-600">
                            Don' t have an Account? <Link className="text-violet-600" href="/signup">Create an account</Link>
                        </p>
                        <div className="divider"><span className="text-red-400 font-bold">OR Continue With</span></div>

                        <SocialLogin></SocialLogin>

                    </div>

                </div>
                <div className="max-w-lg order-1 md:order-2">
                    <LoginSvg></LoginSvg>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;