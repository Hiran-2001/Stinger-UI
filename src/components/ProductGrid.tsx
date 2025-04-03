
import React from "react";
import { ProductCard } from "./ProductCard";

export const ProductGrid = ({ products }: any) => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6 sm:py-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 dark:text-white">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.length > 0 ? (
          products.map((product: any) => <ProductCard key={product.id} product={product} />)
        ) : (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-300">
            Product not found</div>
        )}
      </div>
    </div>
  );


}