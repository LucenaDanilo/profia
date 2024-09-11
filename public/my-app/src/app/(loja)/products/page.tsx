"use client";
import Header from "@/app/(componentes)/Header";
import { useEffect, useState } from "react";
import Product from "../(compponentes)/Product";
import { fetchClient } from "@/app/services/fetchClient";
import Link from "next/link";
import Aside from "@/app/(componentes)/Aside";
import { ProductType } from "../(compponentes)/Product";
import { useSession } from "next-auth/react";
import SkeletonProduct from "../(compponentes)/SkeletonCard";

export interface Props {
    produtos: ProductType[];
}

export default function Page() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState<boolean>(true); 
    const {data: session} = useSession();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetchClient(`/products`);
                if (response.status == 200) {
                    const data = await response.json();
                    setProducts(data);
                } else {
                    throw new Error('falha na api');
                }
            } catch (error) {
                console.log("erro nos produtos", error);
            } finally {
                setLoading(false); 
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen custom-back">
            <Header />
            <div className="flex h-full">
                <Aside />
                <div className="mx-auto">
                    {session?.user.userRole == 'ROLE_ADMIN' ? (
                        <div className="p-6 mx-auto">
                            <Link href={"/products/novo"} className="bg-blue-300 text-center p-2 rounded-md">
                                NOVO
                            </Link>
                        </div>
                    ) : null}
                    <div className="container mx-auto p-4">
                        {loading ? (
                            <div className="flex flex-wrap justify-center gap-6 md:gap-x-6 md:gap-y-6 mx-auto w-[90%] md:p-4">
                                {Array(6).fill(0).map((_, i) => (
                                    <SkeletonProduct key={i} />
                                ))}
                            </div>
                        ) : products.length > 0 ? (
                            <div className="flex flex-wrap justify-center gap-6 md:gap-x-6 md:gap-y-6 mx-auto w-[90%] md:p-4">
                                {products.map((p: ProductType) => (
                                    <Product
                                        key={p.idProduct}
                                        idProduct={p.idProduct}
                                        name={p.name}
                                        value={p.value}
                                        description={p.description}
                                        image={p.image}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-white">
                                <p>Nenhum produto encontrado</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
