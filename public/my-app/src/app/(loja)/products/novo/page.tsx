"use client"
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { fetchClient } from '@/app/services/fetchClient';
import Header from '@/app/(componentes)/Header';
import { useRouter } from 'next/navigation';
function page() {   
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        value : '',
        description: '',
        image: '',
        link: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCreatProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("tentando cadastrar", formData)
        try {
            const response = await fetchClient('http://192.168.15.6:8080/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar o produto');
            }

            const data = await response.json();
            alert("Agora temos uma ")

            setFormData({
                name: '',
                value : '',
                description: '',
                image: '',
                link: '',
            });

        } catch (error) {
            console.error('Erro:', error);
        }
    };

    return (
        <div>
            <Header/>
            <div className='flex flex-col items-center justify-center  px-2 py-4 md:px-6 md:py-12 lg:px-8 text-black'>
                <div className='border-2 rounded-md border-white p-4'>
                    <div className='sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center'> 
                        <Image src="/Robo.jpg" width={56} height={56} alt="imagem do produto" className='rounded-[50%]'/>
                        <h2 className='mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Cadastrar novo produto</h2>
                    </div>
                    <div className='mt-4'>
                        <form onSubmit={handleCreatProduct} className='space-y-6'>
                            <div className='w-[320px] md:w-[400px]'>
                                <label htmlFor="name" className='block text-sm font-medium leading-4 text-gray-900'>Nome</label>
                                <div className='mt-2'>
                                    <input 
                                        id="name" 
                                        name="name" 
                                        type="text"  
                                        value={formData.name}
                                        onChange={handleChange}
                                        required 
                                        className="block w-full rounded-md border-0 pl-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className='w-[320px] md:w-[400px]'>
                                <label htmlFor="value" className='block text-sm font-medium leading-4 text-gray-900'>Preço</label>
                                <div className='mt-2'>
                                    <input 
                                        id="value" 
                                        name="value" 
                                        type="number" 
                                        value={formData.value}
                                        onChange={handleChange}
                                        required 
                                        className="block w-full rounded-md border-0 pl-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className='w-[320px] md:w-[400px]'>
                                <label htmlFor="image" className='block text-sm font-medium leading-4 text-gray-900'>URL da Imagem</label>
                                <div className='mt-2'>
                                    <input 
                                        id="image" 
                                        name="image" 
                                        type="text"  
                                        value={formData.image}
                                        onChange={handleChange}
                                        required 
                                        className="block w-full rounded-md border-0 pl-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className='w-[320px] md:w-[400px]'>
                                <label htmlFor="description" className='block text-sm font-medium leading-4 text-gray-900'>Descrição</label>
                                <div className='mt-2'>
                                    <input 
                                        id="description" 
                                        name="description" 
                                        type="text"  
                                        value={formData.description}
                                        onChange={handleChange}
                                        required 
                                        className="block w-full rounded-md border-0 pl-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className='w-[320px] md:w-[400px]'>
                                <label htmlFor="link" className='block text-sm font-medium leading-4 text-gray-900'>Link do Produto</label>
                                <div className='mt-2'>
                                    <input 
                                        id="link" 
                                        name="link" 
                                        type="text"  
                                        value={formData.link}
                                        onChange={handleChange}
                                        required 
                                        className="block w-full rounded-md border-0 pl-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            
                            <div className='flex items-center justify-center '>
                                <button type='submit' className='bg-green-600 cursor-pointer rounded-md hover:bg-green-700 p-2 text-white font-normal'>Criar novo produto</button>
                            </div>
                            <div className='flex justify-center '>
                                <div className='border border-red-700 p-2 rounded-md text-black font-medium hover:cursor-pointer hover:bg-[#ffffff85]'>
                                    <Link href="/products">Cancelar</Link>
                                </div>
                            </div>        
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page;
