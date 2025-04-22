
"use client";
import usePersianNumbers from "@/utils/usePersianNumbers"; 
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

import { useEffect, useState } from "react";


const PanelOrders = () => {
  return (
    <div className="p-6 space-y-6 text-black">
      <h1 className="text-2xl font-bold">مدیریت سفارشات</h1>

    </div>
  );
};

export default PanelOrders;
