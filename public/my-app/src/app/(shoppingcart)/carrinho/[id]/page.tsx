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
            console.log("ID do produto:", id); 
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
    }, [id]); 

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="flex">
                <Aside />
                <div className="container mx-auto p-6">
                    <div className="bg-white shadow-lg rounded-lg p-8">
                        {product ? (
                            <div>
                                <h1 className="text-3xl font-bold mb-6">Checkout</h1>
                                <div className="flex flex-col md:flex-row items-center">
                                    <img 
                                        src="/img.png" 
                                        alt={product.name} 
                                        className="w-full md:w-1/3 object-cover rounded-lg shadow-lg" 
                                    />
                                    <div className="md:ml-8 mt-4 md:mt-0">
                                        <h2 className="text-2xl font-semibold">{product.name}</h2>
                                        <p className="text-gray-600 mt-2">{product.description}</p>
                                        <p className="text-xl font-bold text-green-600 mt-4">Preço: {product.value}</p>
                                        <button 
                                            className="bg-green-500 text-white mt-6 p-4 rounded-md hover:bg-green-600 transition duration-300" 
                                            onClick={() => buyProduct(product.idProduct)} 
                                        >
                                            Finalizar Compra
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center">
                                <h1 className="text-2xl font-semibold text-red-500">Produto não encontrado</h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;
