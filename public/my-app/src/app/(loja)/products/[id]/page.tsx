"use client"
import React from 'react'
import { useEffect, useState } from 'react';
import api from '@/api/axios';
import { ProductType } from '../../(compponentes)/Product';

export default function ProductInfo({params}: {params:{id: String}}) {
    const [product, setProduct] = useState<ProductType | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [userBalance, setUserBalance] = useState(100);
    const id = params.id;

    useEffect(() => {
        api.get(`/products/${id}`).then((res) => {
            setProduct(res.data);
            console.log(res.data)
        })
    },[id])

    const addToCart = () => {
        // Lógica para adicionar ao carrinho
        alert(`Produto comprado ${product?.name}`)
      };
    return (
        <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Detalhes do Produto {params.id}</h1>
        {product ? (
          <div className="border p-4 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-gray-800 font-bold mb-4">Preço: {product.value} moedas</p>
            <div className="flex items-center mb-4">
              <label className="mr-2">Quantidade:</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-16 border rounded p-1"
                min="1"
              />
            </div>
            <button
              onClick={addToCart}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        ) : (
          <p>Carregando...</p>
        )}
        <div className="mt-4">
          <p className="text-gray-800 font-bold">Saldo do Usuário: {userBalance} moedas</p>
        </div>
      </div>
    );
}
 