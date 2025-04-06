"use client";

import { IProduct } from "@/types/Iproduct";
import { Key, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "@/redux/reducers/cartReducer";
import { useParams } from "next/navigation";

export default function Product() {
  
  return (
    <div>
      <h1>تک محصول</h1>
      
    </div>
  );
}
