'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { productSchema } from '@/utils/schemas';
import { Product } from '@/utils/productService';
import usePersianNumbers from "@/utils/usePersianNumbers"; 


import { z } from 'zod';

type ProductForm = z.infer<typeof productSchema>;

interface PanelProductAddProps {
  onSubmit: (data: ProductForm) => void;
  isPending?: boolean;
  defaultValues?: Product | null;
}

export default function PanelProductAdd({
  onSubmit,
  isPending = false,
  defaultValues,
}: PanelProductAddProps) {
  usePersianNumbers();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues ?? {},
  });

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>{defaultValues ? 'ویرایش محصول' : 'افزودن محصول جدید'}</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>نام محصول</Label>
          <Input {...register('name')} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <Label>قیمت</Label>
          <Input type="number" step="0.01" {...register('price', { valueAsNumber: true })} />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>
        <div>
          <Label>دسته‌بندی</Label>
          <Input {...register('category')} />
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>
        <div>
          <Label>جنسیت</Label>
          <Input {...register('gender')} />
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
        </div>
        <div>
          <Label>برند</Label>
          <Input {...register('brand')} />
          {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message}</p>}
        </div>
        <div>
          <Label>ویژگی‌ها</Label>
          <Input {...register('feature')} />
        </div>
        <div>
          <Label>توضیحات</Label>
          <Input {...register('description')} />
        </div>
        <div>
          <Label>لینک عکس</Label>
          <Input {...register('image')} />
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
        </div>
        <DialogFooter>
          <Button type="submit" disabled={isPending}>
            {defaultValues ? 'ذخیره تغییرات' : 'افزودن محصول'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}