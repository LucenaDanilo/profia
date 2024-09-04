"use client";
import React, { useEffect, useState } from 'react';
import { ProductType } from '../../(compponentes)/Product';
import Header from '@/app/(componentes)/Header';
import Aside from '@/app/(componentes)/Aside';
import getProductById from '@/app/(services)/ProductFetch';
import { IoStarSharp } from 'react-icons/io5';
import { FaPlusCircle } from 'react-icons/fa';
import { RiRobot2Line } from 'react-icons/ri';
import { useSession } from 'next-auth/react';
import SkeletonDetails from '../../(compponentes)/SkeletonDetails';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
export default function ProductInfo({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [userBalance, setUserBalance] = useState(100);
  const id = params.id;
  const {data: session} = useSession();
  const router = useRouter();
  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getProductById(id);
      setProduct(fetchedProduct || null);
    };

    fetchProduct(); 
  }, [id]);


  const addToCart = () => {
        if (product) {
      alert(`Produto comprado: ${product.name}`);
    }
  };

  return (
    <>
      <Header />
      <div className="flex">
        <div className='flex h-full bg-custom-gradient w-full '>
        <Aside />
        <div className="container mx-auto flex justify-center">
          {product ? (
            <div className='pt-2'>
              <div className="shadow-lg rounded-lg bg-[#1d1c1f] max-w-[400px]  text-white flex flex-col gap-6" >
                <div className='bg-[#5DBF79] rounded-t-lg h-[180px] flex justify-center items-center'>
                  <Image width={200} height={120} src={product.image || ''} alt="imagem do produto" className='h-[130px] max-w-[200px]'  />
                </div>
                <div className='flex flex-col p-2 gap-2'>
                  <span>{product.name}</span>
                  <span className='flex gap-1'>{product.value} <p className='text-orange-300'>profia coins</p> </span>
                  <small className='text-gray-300'>{product.description}</small>
                </div>
                <div className='flex gap-1 items-center pl-2 pb-2'>
                      <IoStarSharp size={14} color='#FFA049'/>
                      <IoStarSharp size={14} color='#FFA049'/>
                      <IoStarSharp size={14} color='#FFA049'/>
                      <IoStarSharp size={14} color='#FFA049'/>
                      <IoStarSharp size={14} color='#FFA049'/>        
                    <small className='text-gray-500'>(5)</small>
                </div>
                <div className='flex pl-2 pb-6'>
                  <button onClick={() => router.push(`/carrinho/${product.idProduct}`)} className='flex p-2 items-center gap-2 bg-[#FFA049] hover:bg-[#ffa149a8] rounded-[20px]'><FaPlusCircle size={18} color='white'/> Adicionar ao carrinho</button>
                </div>
                <div className='flex gap-4 items-center p-2 bg-gray-600 rounded-b-lg'>
                  <div>
                    <Image src="/profiacoin.svg" alt="achei"width={30} height={30} className='rotate-90' />
                    
                  </div>
                  <div className='flex flex-col gap-1'>
                    <h1 className="text-[22px] text-white font-bold">{session?.user.points}</h1>
                    <small className="text-[#5fcdee] font-semibold text-[16px]">Minhas moedas</small>
                  </div>
                </div>
                </div>
              
            </div>
          ) : (
            <SkeletonDetails/>
          )}
          
        </div>
        </div>
        
        
      </div>
    </>
  );
}
