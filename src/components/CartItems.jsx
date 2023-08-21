"use client"

import { removeFromCart } from '@/redux/carts/cartSlice';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CartItems = () => {

    const cart = useSelector(state => state.cart);
    const totalPrice = cart.reduce((accumulator, item) => {
        return accumulator + item.price;
    }, 0);

    console.log("cartItems: ", cart);

    const dispatch = useDispatch();

    return (
        <div>
            <div className="overflow-x-auto max-w-4xl mx-auto my-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            cart?.map((item, indx) => <tr key={indx}>
                                <td>
                                    {item.title}
                                </td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <Image width={20} height={40} src={item.imageUrls[0]} alt="product image" />
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    {item.price}
                                </td>

                                <th>
                                    <button onClick={()=> dispatch(removeFromCart(item._id))} className="btn btn-ghost bg-red-500 text-white"> X </button>
                                </th>
                            </tr>)
                        }

                    </tbody>

                    <tfoot>
                        <tr>
                            <th></th>
                            <th className='text-right'>Total:</th>
                            <th>{totalPrice.toFixed(2)}</th>
                            <th><button className="btn btn-ghost bg-violet-500 text-white btn-sm"> Pay </button></th>
                        </tr>
                    </tfoot>

                </table>
            </div>
        </div>
    );
};

export default CartItems;