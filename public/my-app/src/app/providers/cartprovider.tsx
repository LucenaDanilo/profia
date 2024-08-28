"use client"
import React, {useState, createContext} from "react"
import {Product} from '@/types/Product'
import getProductById from "../(services)/ProductFetch"
import { fetchClient } from "../services/fetchClient"

type CartItem = {
    id: string;
    qtd: number;
    product: Product;
    totalPrice: number;
}

type CartContextType = {
    items: CartItem[];
    getItemsCount: () => number;
    addItemToCart: (id: string) => void;
    removeItemToCart: (id: string) => void;
    getTotalPrice: () => number;
    buyProduct: (id: string) => void; 
};

export const CartContext = createContext<CartContextType | undefined>({} as CartContextType);

interface CartProviderProps {
    children: React.ReactNode;
}

export function CartProvider(props: CartProviderProps) {
    const [items, setItems] = useState<CartItem[]>([]);
    async function buyProduct(id: string) {
      try {
          const product = await getProductById(id);
          alert(product?.name);
  
          if (product) {
              console.log(product.idProduct);
              const response = await fetchClient('/products/resgatar', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      productId: product.idProduct,
                  }),
              });
  
              if (response.ok) {
                  alert("RESGATOU");
                  console.log('Produto resgatado com sucesso!');
              } else {
                  const errorResponse = await response.json(); 
                  console.error('Falha ao resgatar o produto:', errorResponse);
                  alert("DEU ERRADO");
              }
          } else {
              console.error('Produto não encontrado');
              alert("NAO ENCONTREI");
          }
      } catch (error) {
          console.log('Erro ao comprar produto:', error);
          alert("ERRO NA API");
      }
  }
  
    async function addItemToCart(id: string){
      try {
        const product = await getProductById(id);
        if (product) {
          setItems((prevItems) => {
            const item = prevItems.find((item) => item.id === id);
            if (!item) {
              return [
                ...prevItems,
                {
                  id,
                  qtd: 1,
                  product,
                  totalPrice: product.value,
                },
              ];
            } else {
              return prevItems.map((item) => {
                if (item.id === id) {
                  item.qtd++;
                  item.totalPrice += product.value;
                }
                return item;
              });
            }
          });
    
          console.log('Adicionado ao carrinho');
        } else {
          console.error('Produto não encontrado');
        }
      } catch (error) {
        console.error('Erro ao obter produto:', error);
      }
    }
    async function removeItemToCart(id: string) {
      try {
        const product = await getProductById(id);
    
        if (product) {
          setItems((prevItems) => {
            const itemIndex = prevItems.findIndex((item) => item.id === id);
            if (itemIndex !== -1) {
              const updatedItems = [...prevItems];
              const removedItem = updatedItems.splice(itemIndex, 1)[0];
              
              console.log('Removido do carrinho:', removedItem);
    
              return updatedItems;
            } else {
              console.warn('Item não encontrado no carrinho');
              return prevItems;
            }
          });
        } else {
          console.error('Produto não encontrado');
        }
      } catch (error) {
        console.error('Erro ao obter produto:', error);
      }
    }
    
    function getItemsCount() {
      return items.reduce((sum, item) => sum + item.qtd, 0);
    }
  
    function getTotalPrice() {
      return items.reduce((sum, item) => sum + item.totalPrice, 0);
    }
  
    return (
      <CartContext.Provider value={{ items, getItemsCount, addItemToCart, getTotalPrice, removeItemToCart, buyProduct }}>
        {props.children}
      </CartContext.Provider>
    );
  }