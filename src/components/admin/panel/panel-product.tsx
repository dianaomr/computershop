
"use client";

import { useMemo, useState } from "react";
import { toast } from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import usePersianNumbers from "@/utils/usePersianNumbers";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  Product,
  APIResponse,
} from "@/utils/productService";
import { useDispatch } from "react-redux";
import { setSortOrder } from "@/redux/slices/filterSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import {
  setProducts,
  addProduct as addProductToStore,
  updateProduct as updateProductInStore,
  removeProduct,
} from "@/redux/slices/productSlice";
import PanelProductAdd from "./panel-product-add";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FiEdit, FiTrash2 } from "react-icons/fi";

// ✅ تعریف ProductForm
interface ProductForm {
  id?: string;
  name: string;
  image?: string;
  category: string;
  price: number;
  feature?: string | string[];
}

export default function ProductPanel() {
  usePersianNumbers();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;
  const filters = useSelector((state: RootState) => state.filters);
  const formatPrice = (num: number): string => num.toLocaleString("fa-IR");
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  
  const products: Product[] = data?.records || [];


  useMemo(() => {
    if (products.length) dispatch(setProducts(products));
  }, [products, dispatch]);


  const filtered = useMemo(() => {
    let result = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  
    if (filters.sortOrder === "asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (filters.sortOrder === "desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    }
  
    return result;
  }, [products, search, filters.sortOrder]);
  


  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);
  const pageCount = Math.ceil(filtered.length / perPage);

  
  const { mutate: createProduct } = useMutation({
    mutationFn: addProduct,
    onSuccess: (newProduct) => {
      dispatch(addProductToStore(newProduct));
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setOpen(false);
      setEditingProduct(null);
      toast.success("محصول با موفقیت اضافه شد");
    },
  });
  
  const { mutate: editProduct } = useMutation({
    mutationFn: updateProduct,
    onSuccess: (updatedProduct) => {
      dispatch(updateProductInStore(updatedProduct));
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setOpen(false);
      setEditingProduct(null);
      toast.success("محصول با موفقیت ویرایش شد");
    },
  });
  

  const { mutate: deleteProductFromStore } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (deletedId: string) => {
      dispatch(removeProduct(deletedId));
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const handleSubmit = (data: ProductForm) => {
    const cleaned: Product = {
      ...data,
      id: data.id ?? crypto.randomUUID(), 
      feature: typeof data.feature === "string"
        ? data.feature.split(",").map(f => f.trim())
        : data.feature ?? [],
    };
  
    if (data.id) {
      editProduct(cleaned);
    } else {
      createProduct(cleaned);
    }
  };
  

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const Modal = ({ product }: { product: Product | null }) => {
    if (!product) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="modal-quantity p-6 rounded-lg w-1/3 bg-white">
          <h2 className="text-xl font-bold mb-4">{product.name}</h2>
          <div className="flex justify-around">
          <img
            src={product.image ?? "/default-image.png"}
            alt={product.name}
            className="w-32 h-32 object-cover mt-2 mb-4"
          />
          <div>
          <p><strong>قیمت:</strong> {formatPrice(product.price)} تومان</p>
          <p><strong>دسته بندی:</strong> {product.category}</p>
          <p><strong> برند:</strong> {product.brand}</p>
          <p><strong> ویژگی:</strong> {product.feature}</p>
          <p><strong> جنسیت:</strong> {product.gender}</p>
          </div>
          </div>

          <button onClick={closeModal} className="px-4 py-2 rounded mt-4 w-full bg-black text-white">
            بستن
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="product-p-main space-y-1 text-black p-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">مدیریت محصولات</h1>
        <div className="flex gap-3">
         
          {/* فیلتر قیمت سورت */}
          <div className="flex gap-2">
  <button
    onClick={() => dispatch(setSortOrder("asc"))}
    className="px-3 py-1 border border-black rounded hover:bg-black hover:text-white transition"
  >
    ارزان‌ترین
  </button>
  <button
    onClick={() => dispatch(setSortOrder("desc"))}
    className="px-3 py-1 border border-black rounded hover:bg-black hover:text-white transition"
  >
    گران‌ترین
  </button>
</div>
<input
            placeholder="جستجو..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-black px-3 py-2 rounded-md focus:outline-none"
          />

          <Dialog open={open} onOpenChange={setOpen}>
            {!editingProduct && (
              <DialogTrigger asChild>
                <Button className="add-button text-white hover:bg-white hover:text-black border border-black transition">
                  افزودن +
                </Button>
              </DialogTrigger>
            )}
            <PanelProductAdd
              onSubmit={handleSubmit}
              isPending={false}
              defaultValues={editingProduct}
            />
          </Dialog>
        </div>
      </div>

      <div className="overflow-x-auto border border-black rounded-xl shadow-md">
        <table className="min-w-full text-sm">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-3 pr-10">عکس</th>
              <th className="p-3">نام</th>
              <th className="p-3">قیمت</th>
              <th className="p-3">دسته‌بندی</th>
              <th className="p-3">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((product) => (
              <motion.tr
                key={product.id ?? product.name}
                whileHover={{ scale: 1.02 }}
                className="border-t border-black transition"
              >
                <td className="p-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="p-3 cursor-pointer" onClick={() => handleProductClick(product)}>
                  {product.name}
                </td>
                <td className="p-3">{formatPrice(product.price)} تومان</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3 flex items-center gap-3 justify-center">
                  <button
                    onClick={() => {
                      setEditingProduct(product);
                      setOpen(true);
                    }}
                    className=" "
                    title="ویرایش"
                  >
                    <FiEdit size={18} />
                  </button>
                
<button
  onClick={() => setProductToDelete(product)}
  title="حذف"
>
  <FiTrash2 size={18} />
</button>


                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-2 pt-4">
        {[...Array(pageCount)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-3 py-1 rounded border border-black ${
              currentPage === idx + 1
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-black hover:text-white"
            } transition`}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {isModalOpen && selectedProduct && <Modal product={selectedProduct} />}
      {productToDelete && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
      <h2 className="text-lg font-bold mb-4">آیا مطمئن هستید؟</h2>
      <p className="mb-4">آیا می‌خواهید «{productToDelete.name}» را حذف کنید؟</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => {
            deleteProductFromStore(productToDelete.id!);
            setProductToDelete(null);
          }}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          تایید حذف
        </button>
        <button
          onClick={() => setProductToDelete(null)}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          انصراف
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
