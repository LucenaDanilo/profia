"use client"
import React, { useState, useEffect, useContext } from 'react';
import { useSession } from 'next-auth/react';
import { ProductType } from '@/app/(loja)/(compponentes)/Product';
import getProductById from '@/app/(services)/ProductFetch';
import Header from '@/app/(componentes)/Header';
import Aside from '@/app/(componentes)/Aside';
import { CartContext } from '@/app/providers/cartprovider';
import { fetchClient } from '@/app/services/fetchClient';

function Page({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<ProductType | null>(null);
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState('')
    const id = params.id;
    console.log(id);
    const { data: session } = useSession();
    const { buyProduct }: any = useContext(CartContext);
    
    useEffect(() => {
        const fetchProduct = async () => {
          console.log("ID do produto:", id);
          try {
            const response = await fetchClient(`http://192.168.15.6:8080/products/${id}`);
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
        <div>
            <Header />
            <div className='flex'>
                <Aside />
                <div>
                    {product ? (
                        <div>
                            <h1>Vou comprar alguém</h1>
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p>Preço: {product.value}</p>
                            <button 
                                className="bg-green-300 text-white p-4 rounded-md" 
                                onClick={() => buyProduct(product.idProduct)} 
                            >
                                Botão da verdade
                            </button>
                        </div>
                    ) : (
                        <h1>Produto não encontrado</h1>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Page;
