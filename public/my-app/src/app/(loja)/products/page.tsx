"use client";
import Header from "@/app/(componentes)/Header";
import { useEffect, useState } from "react";
import Product from "../(compponentes)/Product";
import { fetchClient } from "@/app/services/fetchClient";
import { TbShoppingCartX } from "react-icons/tb";
import Link from "next/link";
import Aside from "@/app/(componentes)/Aside";
import { ProductType } from "../(compponentes)/Product";
import { useSession } from "next-auth/react";
import apiUrl from "@/app/services/utils";
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
    const {data: session} = useSession();

    useEffect(() => {
        const fetchProducts = async () => {
            try{
                const response = await fetchClient(`/products`);
                if(response.status == 200){
                    const data = await response.json();
                    setProducts(data)
                }else{
                    throw new Error('falha na api')
                }

            }catch(error){
                console.log("erro nos produtos", error)
            }
        }
        fetchProducts()
      }, []); 

    return (
        <div className="min-h-screen">
            <Header />
                <div className="flex h-full">
                <Aside/>
                <div className="mx-auto">
                {session?.user.userRole == 'ROLE_ADMIN' ? ( <div className="p-6 mx-auto"><Link href={"/products/novo"} className="bg-blue-300 text-center p-2 rounded-md"> NOVO</Link> </div>):(
                    null
                )}
                <div className="container mx-auto p-4 ">
                    {products.length > 0 ? (
                        <>
                            <div className="flex flex-wrap justify-center gap-6 md:gap-x-6 md:gap-y-6 mx-auto w-[90%] md:p-4">
                                {products.map((p: ProductType) => (
                                        <Product idProduct={p.idProduct} name={p.name} value={p.value} description={p.description} image={p.image} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <EmptyState />
                    )}
                </div>

                </div>
                
                </div>
        </div>
    );
}
