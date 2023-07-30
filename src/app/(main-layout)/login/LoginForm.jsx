"use client"

import useAuth from '@/hooks/useAuth';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FaEyeSlash } from 'react-icons/fa';
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition } from "react";
import createJWT from '@/utils/createJWT';


const LoginForm = () => {

    const {signInUser} = useAuth();
    const [hide, setHide] = useState(true);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const search = useSearchParams();
    const from = search.get("redirectUrl") || "/";
    const { replace, refresh } = useRouter();


    const onSubmit = async (data) => {
        const { email, password } = data;
        const toastId = toast.loading("Loading...");
        try {

          await signInUser(email, password);
          await createJWT({email})

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
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <h2 className="text-3xl font-bold text-center text-violet-700">Sign in</h2>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" name="email" {...register("email", { required: true })} className="input input-bordered w-full" />
                {errors.email && <span className="text-red-600 ">email is required</span>}
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <div className="relative">
                    <input type={`${hide ? "password" : "text"}`} {...register("password", {
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                    })} placeholder="password" className="input input-bordered w-full" />
                    <span onClick={() => setHide(!hide)} className="btn btn-ghost border border-l-0 border-collapse absolute right-0">
                        <FaEyeSlash></FaEyeSlash>
                    </span>
                </div>
                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
            </div>

            <input type="submit" value="Login" className="btn btn-info mt-2 text-white font-semibold" />

        </form>
    );
};

export default LoginForm;