import React from 'react'
import { FaShoppingCart } from "react-icons/fa";

export interface ProductType {
    id: string;
    name: string;
    value: number;
    description: string;
    img: string;
}

function Product({ id, name, value, description, img }: ProductType) {
    return (
        <div className='bg-red-300 w-[320px] h-[300px] flex flex-col items-center'>
            <img src={img} alt="produto" />
            <div className='flex flex-col'>
                <div>
                    <span>{name}</span>
                    <span>{value}</span>
                </div>
                <div>
                    <small>{description}</small>
                </div>
            </div>
        </div>
    );
}

export default Product;
