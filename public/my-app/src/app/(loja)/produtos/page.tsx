"use client"
import Header from "@/app/(componentes)/Header"
import { useEffect, useState } from "react"
import api from "@/api/axios"

interface ProductProps {
    idProduct: string; // Use 'string' em vez de 'String'
    name: string; // Use 'string' em vez de 'String'
    value: number;
}

export interface Props {
    produtos: any[]
}

export default function Page({ produtos }: Props) {
    const [products, setProducts] = useState<ProductProps[]>([]);

    useEffect(() => {
        api.get('/products')
            .then((res) => {
                setProducts(res.data);
                console.log('meus produtos', res.data);
            })
            .catch((err) => {
                console.error('Erro ao buscar produtos', err);
            });
    }, []);

    return (
        <>
            <Header />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Produtos</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((p) => (
                        <div key={p.idProduct} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-xl font-semibold mb-2">{p.name}</h2>
                            <p className="text-gray-600">Preço: R${p.value.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
