
"use client";

import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { motion } from "framer-motion";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function ProductPanel() {

  return (
    <div className="product-p-main space-y-1 text-black p-6">
        <h1 className="text-2xl font-bold">مدیریت محصولات</h1>
    </div>
  );
}
