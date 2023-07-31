"use client"

import useAuth from '@/hooks/useAuth';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { usePathname, useRouter } from 'next/navigation';
import { startTransition } from 'react';



const Navbar = () => {

    const { user, logOut } = useAuth();
    console.log(user);

    const { replace, refresh } = useRouter();
    const path = usePathname();


    const handleLogout = async () => {
        const toastId = toast.loading("Loading...");
        try {
            await logOut();
            const res = await fetch("/api/auth/logout", {
                method: "POST",
            });
            await res.json();
            if (path.includes("/dashboard") || path.includes("/profile")) {
                replace(`/login?redirectUrl=${path}`);
            }
            toast.dismiss(toastId);
            toast.success("Successfully logout!");
            startTransition(() => {
                refresh();
            });
        } catch (error) {
            toast.error("Successfully not logout!");
            toast.dismiss(toastId);
        }
    };

    const navMenu = <>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/products">Products</Link></li>
        <li><Link href="/profile">Profile</Link></li>
        {
            user && user?.uid ?
                <>
                    <li><Link href="/dashboard">Dashboard</Link></li>
                </>
                :
                <li><Link href="/login">Log In</Link></li>
        }
        
    </>


    return (
        <div className="navbar container mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content space-y-1 mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navMenu}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">Shop-Now</a>
            </div>

            <div className="navbar-end hidden lg:flex items-center">

                <ul className="menu menu-horizontal px-1 space-x-1">
                    {navMenu}
                </ul>
            </div>

            <div className="flex-none ms-auto space-x-2">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            <span className="badge badge-sm indicator-item">8</span>
                        </div>
                    </label>
                    <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                        <div className="card-body">
                            <span className="font-bold text-lg">8 Items</span>
                            <span className="text-info">Subtotal: $999</span>
                            <div className="card-actions">
                                <button className="btn btn-primary btn-block">View cart</button>
                            </div>
                        </div>
                    </div>
                </div>

                {user && user?.uid && <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <Image
                                alt="user picture"
                                src={user?.photoURL ? user?.photoURL : "https://i.ibb.co/5nPD3Qg/user.jpg"}
                                title={user?.displayName}
                                width={40}
                                height={40}
                            />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

                        <li> <span className='text-center'>{user?.displayName ? user?.displayName :"Anonymous"}</span> </li>
                        <hr />
                        <li onClick={handleLogout}><a>Logout</a></li>
                    </ul>
                </div>}

            </div>

        </div>
    );
};

export default Navbar;