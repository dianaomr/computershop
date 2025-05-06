
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { productSchema } from '@/utils/schemas';
import { Product } from '@/utils/productService';
import { toast } from 'react-hot-toast';
import usePersianNumbers from "@/utils/usePersianNumbers"; 
import { z } from 'zod'; 
import { useEffect, useState } from 'react';

export type ProductForm = z.infer<typeof productSchema>;

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

  const [imageSource, setImageSource] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (defaultValues) {
      const imageUrl = defaultValues.image ?? '';
      setImageSource(imageUrl);
      reset({
        id: defaultValues.id,
        name: defaultValues.name ?? '',
        price: defaultValues.price ?? 0,
        category: defaultValues.category ?? '',
        gender: defaultValues.gender ?? '',
        brand: defaultValues.brand ?? '',
        feature: defaultValues.feature?.join(', ') ?? '',
        image: imageUrl,
        description: defaultValues.description ?? '',
      });
    } else {
      reset({
        id: '',
        name: '',
        price: 0,
        category: '',
        gender: '',
        brand: '',
        feature: '',
        image: '',
        description: '',
      });
      setImageSource('');
    }
  }, [defaultValues, reset]);

  const features = ['ضد آب', 'ضد ضربه', 'ضربان سنج ', 'GPS' ,'نمایشگر تاریخ'];
  const categories = ['ساعت مجلسی', 'ساعت هوشمند', 'ساعت اسپرت' , 'ساعت کلاسیک'];
  const brands = ['رولکس', 'سیکو', 'فسیل','امگا','سیتیزن','کاسیو','تیسوت','سواچ'];
  const genders = ['مردانه', 'زنانه', 'یونیسکس'];

  return (
    <DialogContent className="productform sm:max-w-[800px]">
      <DialogHeader>
        <DialogTitle>{defaultValues ? 'ویرایش محصول' : 'افزودن محصول جدید'}</DialogTitle>
      </DialogHeader>

      <form
        onSubmit={handleSubmit((data) => {
          const cleanedData: ProductForm = {
            ...data,
            feature:
              typeof data.feature === "string"
                ? data.feature.split(',').map(f => f.trim())
                : data.feature ?? [],
          };
          onSubmit(cleanedData);
          toast.success("محصول با موفقیت بروزرسانی شد");
        })}
        className="space-y-4"
      >
        <div>
          <Label>نام محصول</Label>
          <Input {...register('name')} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <Label>قیمت</Label>
            <Input type="number" step="0.01" {...register('price', { valueAsNumber: true })} />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>
          <div className="flex-1">
            <Label>دسته‌بندی</Label>
            <Select
              onValueChange={(val) => setValue('category', val)}
              defaultValue={defaultValues?.category}
            >
              <SelectTrigger>
                <SelectValue placeholder="انتخاب دسته‌بندی" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>
          <div className="flex-1">
            <Label>جنسیت</Label>
            <Select
              onValueChange={(val) => setValue('gender', val)}
              defaultValue={defaultValues?.gender}
            >
              <SelectTrigger>
                <SelectValue placeholder="انتخاب جنسیت" />
              </SelectTrigger>
              <SelectContent>
                {genders.map((g) => (
                  <SelectItem key={g} value={g}>{g}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <Label>برند</Label>
            <Select
              onValueChange={(val) => setValue('brand', val)}
              defaultValue={defaultValues?.brand}
            >
              <SelectTrigger>
                <SelectValue placeholder="انتخاب برند" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((b) => (
                  <SelectItem key={b} value={b}>{b}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message}</p>}
          </div>

          <div className="flex-1">
            <Label>ویژگی‌ها</Label>
            <Select
              onValueChange={(val) => setValue('feature', val)}
              defaultValue={defaultValues?.feature?.join(', ')}
            >
              <SelectTrigger>
                <SelectValue placeholder="انتخاب ویژگی" />
              </SelectTrigger>
              <SelectContent>
                {features.map((f) => (
                  <SelectItem key={f} value={f}>{f}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>توضیحات</Label>
          <Input {...register('description')} />
        </div>

        <div>
          <Label>لینک عکس</Label>
          <Input
            {...register('image')}
            placeholder="https://example.com/image.jpg"
            onChange={(e) => {
              setImageSource(e.target.value);
            }}
          />
        </div>

        <div>
          <Label>یا آپلود عکس</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const url = URL.createObjectURL(file);
                setImageSource(url);
                setValue('image', url);
              }
            }}
          />
        </div>

        {imageSource && (
          <div className="mt-2">
            <img
              src={imageSource}
              alt="پیش‌نمایش عکس"
              className="rounded w-32 h-32 object-cover border"
            />
          </div>
        )}

        <DialogFooter>
          <Button type="submit" disabled={isPending}>
            {defaultValues ? 'ذخیره تغییرات' : 'افزودن محصول'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
