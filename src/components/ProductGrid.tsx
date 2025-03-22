
import React from "react";
import { ProductCard } from "./ProductCard";

export const ProductGrid = ({products}:any) => {       
    return (
        <div className="max-w-screen-xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                
                {products !== undefined ?  products?.map((product:any) => (
                    <ProductCard key={product.id} product={product}  />
                )) : <div>Product not found</div>}
            </div>
        </div>
    );
}