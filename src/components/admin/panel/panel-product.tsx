
"use client";

import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import usePersianNumbers from "@/utils/usePersianNumbers";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  Product,
} from "@/utils/productService";
import { useDispatch } from "react-redux";
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

export default function ProductPanel() {
  usePersianNumbers();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const formatPrice = (num: number): string => {
    const withCommas = num.toLocaleString("en-US");
    const toPersianDigits = withCommas.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
    return toPersianDigits;
  };

  const Modal = ({ product, closeModal }: { product: Product | null; closeModal: () => void }) => {
    if (!product) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="modal-quantity p-6 rounded-lg w-1/3 bg-white">
          <h2 className="text-xl font-bold mb-4">{product.name}</h2>
          <img
            src={product.image ?? "/default-image.png"}
            alt={product.name}
            className="w-32 h-32 object-cover mt-2 mb-4"
          />
          <p>
            <strong>قیمت:</strong> {formatPrice(product.price)} تومان
          </p>
          <p>
            <strong>دسته بندی:</strong> {product.category}
          </p>
          <button onClick={closeModal} className="px-4 py-2 rounded mt-4 w-full bg-black text-white">
            بستن
          </button>
        </div>
      </div>
    );
  };

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  useMemo(() => {
    if (products.length) dispatch(setProducts(products));
  }, [products, dispatch]);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const pageCount = Math.ceil(filtered.length / perPage);

  const formattedPrices = useMemo(() => {
    const map: Record<string, string> = {};
    products.forEach((p) => {
      map[p.id || p.name] = p.price.toLocaleString();
    });
    return map;
  }, [products]);

  const { mutate: createProduct } = useMutation({
    mutationFn: addProduct,
    onSuccess: (newProduct) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      dispatch(addProductToStore(newProduct));
      setOpen(false);
      setEditingProduct(null);
    },
  });

  const { mutate: editProduct } = useMutation({
    mutationFn: updateProduct,
    onSuccess: (updatedProduct) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      dispatch(updateProductInStore(updatedProduct));
      setOpen(false);
      setEditingProduct(null);
    },
  });

  const { mutate: deleteProductFromStore } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (deletedId: string) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      dispatch(removeProduct(deletedId));
    },
  });

  const handleSubmit = (data: Product) => {
    if (data.id) {
      editProduct(data);
    } else {
      createProduct(data);
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="product-p-main space-y-1 text-black p-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">مدیریت محصولات</h1>
        <div className="flex gap-3">
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
                className="border-t border-black hover:bg-white transition"
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
                <td className="p-3">
                  {formattedPrices[product.id ?? product.name] ?? "..."} تومان
                </td>
                <td className="p-3">{product.category}</td>
                <td className="p-3 flex items-center gap-3 justify-center">
                  <button
                    onClick={() => {
                      setEditingProduct(product);
                      setOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                    title="ویرایش"
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    onClick={() => deleteProductFromStore(product.id!)}
                    className="text-red-600 hover:text-red-800"
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

      {/* پیجینیشن */}
      <div className="flex justify-center gap-2 pt-4">
        {[...Array(pageCount)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-3 py-1 rounded border border-black ${
              currentPage === idx + 1
                ? "next bg-black text-white"
                : "first bg-white text-black hover:bg-black hover:text-white"
            } transition`}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {/* مودال نمایش محصول */}
      {isModalOpen && selectedProduct && <Modal product={selectedProduct} closeModal={closeModal} />}
    </div>
  );
}