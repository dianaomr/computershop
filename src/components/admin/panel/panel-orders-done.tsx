

"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect } from "react";

const PanelOrdersDone = () => {

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">سفارشات تحویل داده شده</h1>
      
    </div>
  );
};

export default PanelOrdersDone;
