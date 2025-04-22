// ✅ PanelProductAdd.tsx
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


export default function PanelProductAdd(){
 
 

  return (
<h1>PanelProductAdd</h1>

  );
}