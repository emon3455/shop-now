"use client"

import useAuth from '@/hooks/useAuth';
import createJWT from '@/utils/createJWT';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { startTransition, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FaEyeSlash } from 'react-icons/fa';

const SignupForm = () => {

    const [hide, setHide] = useState(true);
    const { createUser, profileUpdate } = useAuth();

    const search = useSearchParams();
    const from = search.get("redirectUrl") || "/";
    const { replace, refresh } = useRouter();


    const { register, handleSubmit, reset, formState: { errors }, getValues, setValue } = useForm();


    const uploadImage = async (event) => {
        const formData = new FormData();
        if (!event.target.files[0]) return;
        formData.append("image", event.target.files[0]);
        const toastId = toast.loading("Image uploading...");
        try {
            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            if (!res.ok) throw new Error("Failed to upload image");

            const data = await res.json();
            toast.dismiss(toastId);
            toast.success("Image uploaded successfully!");
            setValue("photo", data?.data?.url);
        } catch (error) {
            toast.error("Image not uploaded!");
            toast.dismiss(toastId);
        }
    };


    const onSubmit = async (data, event) => {

        const { name, email, password, photo } = data;
        const toastId = toast.loading("Loading...");
        try {
            const user = await createUser(email, password);
            await createJWT({ email });

            await profileUpdate({
                displayName: name,
                photoURL: photo,
            });

            startTransition(() => {
                refresh();
                replace(from);
                toast.dismiss(toastId);
                toast.success("User signed in successfully");
            });
            

        } catch (err) {
            toast.dismiss(toastId);
            toast.error(err.message || "User not signed in");
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <h2 className="text-3xl font-bold text-center text-violet-600">Sign Up</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name="name" {...register("name", { required: true })} placeholder="name" className="input input-bordered" />
                    {errors.name && <span className="text-red-600 ">name is required</span>}
                </div>
                <div className="form-control">
                    <label htmlFor="photo" className="label label-text">
                        Photo
                    </label>
                    <input
                        type="file"
                        id="photo"
                        name="photo"
                        onChange={uploadImage}
                        className="file-input file-input-bordered file-input-primary w-full"
                    />
                    {errors.photo && <span className="text-red-600 ">Photo is required</span>}
                </div>
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
            </div>

            <input type="submit" value="Sign Up" className="btn btn-info mt-2 text-white font-semibold" />

        </form>
    );
};

export default SignupForm;