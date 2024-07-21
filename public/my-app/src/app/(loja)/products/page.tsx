"use client";
import Header from "@/app/(componentes)/Header";
import { useEffect, useState } from "react";
import api from "@/api/axios";
import { ProductType } from "../(compponentes)/Product";
import Product from "../(compponentes)/Product";
import { TbShoppingCartX } from "react-icons/tb";
import Link from "next/link";

export interface Props {
    produtos: ProductType[];
}

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center">
            <span className=""> <TbShoppingCartX size={42} /></span>
            <h2 className="text-2xl font-semibold mb-2 text-black">Nenhum produto encontrado</h2>
            <p className="text-gray-600">Por favor, tente novamente mais tarde.</p>
            <Link href="/products/novo">
                <div className='flex items-center justify-center '>
                    <button className='bg-green-600 cursor-pointer rounded-md hover:bg-green-700 p-2 text-white font-normal'>Criar novo produto</button>
                </div>
            </Link>
        </div>
    );
}

export default function Page({ produtos }: Props) {
    const [products, setProducts] = useState<ProductType[]>([]);

    useEffect(() => {
        api.get('/products')
            .then((res) => {
                setProducts(res.data);
                console.log('meus produtos', res.data);
                console.log(products)
            })
            .catch((err) => {
                console.error('Erro ao buscar produtos', err);
            }); 
    }, []);

    return (
        <>
            <Header />
            <div className="container mx-auto p-4">
                {products.length > 0 ? (
                    <>
                        <h1 className="text-3xl font-bold mb-4 text-center">Produtos</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {products.map((p: ProductType) => (
                                <Link href={`http://localhost:4000/products/${p.id}`} key={p.id}>
                                    <Product id={p.id} name={p.name} value={p.value} description={p.description} img={p.img} />
                                </Link>
                            ))}
                        </div>
                    </>
                ) : (
                    <EmptyState />
                )}
            </div>
        </>
    );
}