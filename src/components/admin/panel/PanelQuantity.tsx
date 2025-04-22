'use client';

import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setQuantities, updateQuantity } from '@/redux/slices/quantitySlice';
import { fetchProducts, updateQuantityAPI, Product } from '@/utils/quantityService';
import { motion } from 'framer-motion';
import usePersianNumbers from "@/utils/usePersianNumbers"; 

// تبدیل اعداد فارسی
const formatPrice = (num: number): string => {
  const withCommas = num.toLocaleString("en-US"); // 1,250,000
  const toPersianDigits = withCommas.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
  return toPersianDigits;
};

// ✅ Modal
const Modal = ({ product, closeModal }: { product: Product | null, closeModal: () => void }) => {
  if (!product) return null;
  return (
    <div className=" fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="modal-quantity p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">{product.name}</h2>
        <img
          src={product.image ?? '/default-image.png'}
          alt={product.name}
          className="w-32 h-32 object-cover mt-2 mb-4"
        />
        <p><strong>موجودی:</strong> {formatPrice(product.stock)}</p>

        <p><strong>قیمت:</strong>{formatPrice(product.price)} تومان</p>

        <button
          onClick={closeModal}
          className=" px-4 py-2 rounded mt-4 w-full"
        >
          بستن
        </button>
      </div>
    </div>
  );
};

export default function QuantityPanel() {
  usePersianNumbers();
  const dispatch = useDispatch();
  const quantities = useSelector((state: RootState) => state.quantity.quantities);

  const [edited, setEdited] = useState<Record<string, { stock: number; price: number }>>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const { data = [], isLoading } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    if (data.length > 0) {
      dispatch(setQuantities(data));
      const initialEdited: Record<string, { stock: number; price: number }> = {};
      data.forEach((item) => {
        if (item.id) {
          initialEdited[item.id] = {
            stock: item.stock ?? 0,
            price: item.price,
          };
        }
      });
      setEdited(initialEdited);
    }
  }, [data, dispatch]);

  const mutation = useMutation({
    mutationFn: updateQuantityAPI,
    onSuccess: (updatedProduct) => {
      dispatch(updateQuantity(updatedProduct));
      alert('✅ بروزرسانی موفق بود');
    },
  });

  const handleChange = (id: string, field: 'stock' | 'price', value: number) => {
    setEdited((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSave = (id: string) => {
    const product = quantities.find((p) => p.id === id);
    if (!product) return;

    const updated = {
      id,
      name: product.name,
      stock: edited[id]?.stock ?? 0,
      price: edited[id]?.price ?? 0,
      image: product.image ?? '',
    };
    mutation.mutate(updated);
  };

  const filtered = quantities.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const pageCount = Math.ceil(filtered.length / perPage);

  if (isLoading) return <div>در حال بارگذاری...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">پنل موجودی محصولات</h1>
        <input
          type="text"
          placeholder="جستجو..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-black px-3 py-2 rounded-md focus:outline-none"
        />
      </div>

      <div className="overflow-x-auto border border-black rounded-xl shadow-md">
        <table className="min-w-full text-sm">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-3">نام محصول</th>
              <th className="p-3">موجودی</th>
              <th className="p-3">قیمت</th>
              <th className="p-3">ذخیره</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((product) => (
              <motion.tr
                key={product.id}
                whileHover={{ scale: 1.01 }}
                className="border-t border-black hover:bg-gray-100 transition"
              >
                <td
                  className="p-3 flex items-center gap-2 cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  <img
                    src={product.image ?? '/default-image.png'}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <span>{product.name}</span>
                </td>
                <td className="p-3">
                  <input
                    type="number"
                    className="border px-2 py-1 w-20"
                    value={edited[product.id!]?.stock ?? 0}
                    onChange={(e) => handleChange(product.id!, 'stock', +e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <input
                    type="number"
                    className="border px-2 py-1 w-20"
                    value={edited[product.id!]?.price ?? 0}
                    onChange={(e) => handleChange(product.id!, 'price', +e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleSave(product.id!)}
                    className="bg-black text-white px-3 py-1 rounded hover:bg-white hover:text-black border border-black transition"
                  >
                    ذخیره
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
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-black hover:text-white"
            } transition`}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {/* مودال نمایش محصول */}
      {isModalOpen && selectedProduct && (
        <Modal product={selectedProduct} closeModal={closeModal} />
      )}
    </div>
  );
}


