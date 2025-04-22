// utils/schemas.ts
import { z } from 'zod';

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'نام باید حداقل ۲ حرف باشد'),
  price: z.number({ invalid_type_error: 'قیمت باید عدد باشد' }).positive('قیمت باید مثبت باشد'),
  category: z.string().min(2, 'دسته‌بندی نامعتبر است'),
  gender: z.string().min(1, 'جنسیت الزامی است'),
  brand: z.string().min(1, 'برند الزامی است'),
  feature: z.string().optional(),
  description: z.string().optional(),
  image: z.string().url('لینک تصویر معتبر نیست').optional(),
});
