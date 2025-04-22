
'use client';

import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';


export default function QuantityPanel() {
 

  return (
    <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">پنل موجودی محصولات</h1>
      
    </div>
  );
}


