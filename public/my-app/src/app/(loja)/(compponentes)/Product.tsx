import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";
import Link from 'next/link';
import { FaPlusCircle } from "react-icons/fa";
import { link } from 'node:fs/promises';
import { TbShoppingCartSearch } from "react-icons/tb";
import Image from 'next/image';

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
        <Link href={`/products/${idProduct}`} className='hover:shadow-lg h-[330px] w-[260px]  md:h-[330px] md:w-[290px] lg:h-[330px] lg:w-[340px] transition-shadow duration-300 ease-in-out transform hover:scale-[1.01] bg-[#28272B] flex flex-col rounded-md '>
            <div className="">
                    <div className='bg-[#FFA049] w-full flex justify-center h-[120px] rounded-t-md'>
                        <Image  width={320} src={image|| ''} className="max-h-[100px] max-w-[320px]"alt="produto" />
                    </div>
                    <div className='flex flex-col mt-6 '>
                        <div className='flex flex-col p-4'>
                            <span className='text-white text-[22px] font-semibold'>1{name}</span>
                            <div className='flex gap-1 items-center'>
                                <IoStarSharp size={14} color='#FFA049'/>
                                <IoStarSharp size={14} color='#FFA049'/>
                                <IoStarSharp size={14} color='#FFA049'/>
                                <small className='text-gray-500'>(11)</small>
                            </div>
                        </div>
                        <div className='p-4 flex justify-between'>
                            <div className='p-2'>
                                <span className='text-[16px] text-white'>${value},00</span>
                            </div>
                            <div className='flex'>
                                <button onClick={() => console.log('add')} className='flex py-2 px-4 items-center gap-2 bg-[#5fcdee] hover:bg-[#5fcdeea9] rounded-[20px]'>Detalhes <TbShoppingCartSearch size={18} color=''/> </button>
                            </div>
                        </div>
                    </div>
                </div>
        </Link>
    );
}

export default Product;
