"use client"
import React, { useState, useEffect, useContext } from 'react';
import { useSession } from 'next-auth/react';
import { ProductType } from '@/app/(loja)/(compponentes)/Product';
import { fetchClient } from '@/app/services/fetchClient';
import Header from '@/app/(componentes)/Header';
import Aside from '@/app/(componentes)/Aside';
import { CartContext } from '@/app/providers/cartprovider';
import apiUrl from '@/app/services/utils';

function CheckoutPage({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<ProductType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState('');
    const id = params.id;
    const { data: session } = useSession();
    const { buyProduct }: any = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetchClient(`/products/${id}`);
                console.log("Resposta do fetch:", response); 
                if (response.status === 200) {
                    const fetchedProduct = await response.json();
                    console.log("Produto buscado:", fetchedProduct); 
                    setProduct(fetchedProduct);
                } else {
                    console.error("Erro na resposta:", response.status);
                    setError("Produto não encontrado.");
                }
            } catch (error) {
                console.error("Erro ao buscar o produto:", error);
                setError("Erro ao buscar o produto.");
            }
        };

        fetchProduct();
    }, []); 

    return (
        <div className="min-h-screen bg-custom-gradient">
            <Header />
            <div className="flex">
                <Aside />
                <div className="container mx-auto p-6">
                    <div className="bg-white shadow-lg rounded-lg p-8">
                        {product ? (
                            <div className="p-6 bg-gray-50 rounded-lg shadow-md max-w-4xl mx-auto border-2 border-[#5fcdee]">
                            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Finalize sua solicitação</h1>
                            
                            <div className="flex flex-col md:flex-row items-center gap-8">
                              <img 
                                src="/img.png" 
                                alt={product.name} 
                                className="w-full md:w-1/2 object-cover rounded-lg shadow-lg border border-[#5fcdee]" 
                              />
                              
                              <div className="flex-1">
                                <h2 className="text-3xl font-semibold text-gray-900 mb-4">{product.name}</h2>
                                <p className="text-lg text-gray-700 mb-4">{product.description}</p>
                                <p className="text-2xl font-bold text-green-700 mb-6">Preço: {product.value}</p>
                                
                                <button 
                                  className="w-full bg-blue-500 text-white py-3 px-6 rounded-md shadow-md hover:bg-blue-700 transition duration-300 ease-in-out" 
                                  onClick={() => buyProduct(product.idProduct)} 
                                >
                                  Comprar
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                            <div className="p-6 bg-gray-50 rounded-lg shadow-md max-w-4xl mx-auto">
                                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
                                    <div className="bg-gray-200 h-8 w-1/3 mx-auto rounded-md animate-pulse"></div>
                                </h1>
                                
                                <div className="flex flex-col md:flex-row items-center gap-8">
                                    <div className="w-full md:w-1/2">
                                    <div className="bg-gray-200 h-60 rounded-lg shadow-lg border border-gray-300 animate-pulse"></div>
                                    </div>
                                    
                                    <div className="flex-1">
                                    <div className="bg-gray-200 h-8 w-2/3 mb-4 rounded-md animate-pulse"></div>
                                    <div className="bg-gray-200 h-6 w-full mb-4 rounded-md animate-pulse"></div>
                                    <div className="bg-gray-200 h-8 w-1/3 mb-6 rounded-md animate-pulse"></div>
                                    
                                    <button 
                                        className="w-full bg-gray-300 text-white py-3 px-6 rounded-md shadow-md animate-pulse"
                                    >
                                        <div className="h-4 w-1/2 bg-gray-200 rounded-md mx-auto"></div>
                                    </button>
                                    </div>
                                </div>
                                </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;
