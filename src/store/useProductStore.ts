import { create } from "zustand";
interface ProductState {
    productSearch: string;
    setProductSearch: (search: string) => void;
}

const useProductStore = create<ProductState>()(

    (set) => ({
        productSearch: "",
        setProductSearch: (search) => set({ productSearch: search }),
    }),


);

export default useProductStore;