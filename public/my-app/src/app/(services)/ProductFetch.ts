import { fetchClient } from "../services/fetchClient";
import { Product } from "@/types/Product";

export default async function getProductById(id: string): Promise<Product | undefined> {
    try {
        const response = await fetchClient(`http://192.168.100.122:8080/products/${id}`);
        if (response.status === 200) {
            const data = await response.json();
            return data as Product;
        } else {
            console.error(`Erro ao buscar o produto com id ${id}:`, response.status);
            return undefined;
        }
    } catch (error) {
        console.error("Erro ao buscar um produto específico:", error);
        return undefined;
    }
}