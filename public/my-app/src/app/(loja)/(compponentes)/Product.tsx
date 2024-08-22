import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";
import Link from 'next/link';
import { FaPlusCircle } from "react-icons/fa";

export interface ProductType {
    idProduct?: string;
    name?: string;
    value?: number;
    description?: string;
    image?: string;
    link?: string | null;
    links?: Array<{
        rel?: string;
        href?: string;
    }>;
}

function Product({ idProduct, name, value, description, image }: ProductType) {
    return (
        <div className="hover:shadow-lg lg:h-[310px] lg:w-[340px] transition-shadow duration-300 ease-in-out transform hover:scale-[1.01] bg-[#28272B] flex flex-col rounded-md ">
            <div className='bg-[#5c59ebde] w-full flex justify-center h-[120px] rounded-t-md'>
                <img src="/img.png" className="max-h-[100px] max-w-[320px]"alt="produto" />
            </div>
            <div className='flex flex-col mt-6'>
                <div className='flex flex-col p-4'>
                    <span className='text-white text-[22px] font-semibold'>{name}</span>
                    <div className='flex gap-1 items-center'>
                        <IoStarSharp size={14} color='#FFA049'/>
                        <IoStarSharp size={14} color='#FFA049'/>
                        <IoStarSharp size={14} color='#FFA049'/>
                        <small className='text-gray-500'>(11)</small>
                    </div>
                </div>
                <div className='p-4 flex justify-between '>
                    <div className='p-2'>
                        <span className='text-[16px] text-white'>${value},00</span>
                    </div>
                    <div className='flex'>
                        <Link href="#" className='flex p-2 items-center gap-2 bg-[#FFA049] hover:bg-[#ffa149a8] rounded-[20px]'><FaPlusCircle size={18} color='white'/> Adicionar ao carrinho</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
