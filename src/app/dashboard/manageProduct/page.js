import React from 'react';
import Products from './Products';
import getProducts from '@/utils/getProducts';

const ManageProductPage = async () => {

    const products = await getProducts();

    return (
        <div>
            <h2 className='text-2xl font-semibold text-center text-violet-600 mt-5'>Manage Products Page</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Rating</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, indx) => (
                           <Products key={indx} indx={indx} product={product}></Products>
                        ))}
                    </tbody>
                </table>

            </div >


        </div>
    );
};

export default ManageProductPage;