import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string;
}

export default function StatsCard({ title, value }: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="states-card text-white p-4 sm:p-6 rounded-xl shadow-md transition-transform w-full"
    >
      <h3 className="text-base text-black sm:text-lg font-semibold mb-2">{title}</h3>
      <p className="text-xl text-black sm:text-2xl">{value}</p>
    </motion.div>
  );
}
