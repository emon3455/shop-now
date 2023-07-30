"use client"

import React from 'react';
import { toast } from 'react-hot-toast';
import { startTransition } from "react";
import { FaGoogle } from 'react-icons/fa';
import { useRouter, useSearchParams } from "next/navigation";
import useAuth from '@/hooks/useAuth';
import createJWT from '@/utils/createJWT';

const SocialLogin = () => {
    
    const { signInWithGoggle } = useAuth();

    const search = useSearchParams();
    const from = search.get("redirectUrl") || "/";
    const { replace, refresh } = useRouter();

    const handleGoogleLogin = async () => {
        const toastId = toast.loading("Loading...");
        try {
            const { user } = await signInWithGoggle();

            await createJWT({ email: user.email });
            startTransition(() => {
                refresh();
                replace(from);
                toast.dismiss(toastId);
                toast.success("User signed in successfully");
            });

        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error.message || "User not signed in");
        }
    };

    return (
        <div className="w-full ">
            <button onClick={handleGoogleLogin} className="p-4 btn-ghost text-orange-400 text-lg rounded-xl w-full flex justify-center"><FaGoogle></FaGoogle></button>
        </div>
    );
};

export default SocialLogin;