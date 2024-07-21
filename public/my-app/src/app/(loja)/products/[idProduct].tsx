"use client"
import React from 'react'
import { useRouter } from 'next/router'

export default function ProductInfo() {
    const router = useRouter();
    const { id } = router.query;
    
    React.useEffect(() => {
        if (id) {
            console.log("estou buscando vc", router);
            console.log('vc', id);
        }
    }, [id]);

    return (
        <div>
            <h1>Detalhes do Produto</h1>
            {id ? (
                <p>ID do Produto: {id}</p>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
}
 