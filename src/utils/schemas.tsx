import { z } from "zod";

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "نام الزامی است"),
  price: z.number().min(0, "قیمت نمی‌تواند منفی باشد"),
  category: z.string().min(1, "دسته‌بندی الزامی است"),
  brand: z.string().min(1, "برند الزامی است"),
  gender: z.string().min(1, "جنسیت الزامی است"),
  // image: z.string().url("لینک تصویر معتبر نیست").optional(),
  // image: z.union([
  //   z.string().url("لینک تصویر معتبر نیست"),
  //   z.instanceof(File),
  //   z.undefined()
  // ]).optional(),
  image: z.string().url("لینک تصویر معتبر نیست").optional(),

  // image: z.union([z.string().url(), z.instanceof(File)]).optional(),

  feature: z.union([z.string(), z.array(z.string())]).optional(),
  description: z.string().optional(),
});
