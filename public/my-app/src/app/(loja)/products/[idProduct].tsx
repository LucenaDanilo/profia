"use client"
import React from 'react'
import { useRouter } from 'next/router'

export default function ProductInfo() {
    const router = useRouter();
    const { idProduct } = router.query;
    
    React.useEffect(() => {
        if (idProduct) {
            console.log("estou buscando vc", router);
            console.log('vc', idProduct);
        }
    }, [idProduct]);

    return (
        <div>
            <h1>Detalhes do Produto</h1>
            {idProduct ? (
                <p>ID do Produto: {idProduct}</p>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
}
 