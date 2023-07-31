import React from 'react';

const Products = ({ product, indx }) => {

    return (
        <tr key={product._id}>
            <th>{indx + 1}</th>
            <td>{product.title}</td>
            <td>{product.price}</td>
            <td>{product.ratings}</td>
            <td className='space-x-2 space-y-2'>

                <button
                    className="btn btn-sm btn-warning"
                >
                    Update
                </button>

                <button className='btn btn-sm btn-error'>
                    Delete
                </button>

            </td>
        </tr>
    );
};

export default Products;