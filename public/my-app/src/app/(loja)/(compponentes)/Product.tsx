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
        <div className="hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105 bg-purple-400 flex flex-col items-center">
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
