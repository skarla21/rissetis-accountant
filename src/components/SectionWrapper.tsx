"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  bgColor?: "white" | "gray";
  fullWidth?: boolean;
}

export default function SectionWrapper({
  id,
  children,
  className = "",
  bgColor = "white",
  fullWidth = false,
}: SectionWrapperProps) {
  const bgColorClass = bgColor === "gray" ? "bg-gray-50" : "bg-white";

  return (
    <section
      id={id}
      className={`min-h-screen w-full ${bgColorClass} ${className}`}
    >
      {fullWidth ? (
        children
      ) : (
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {children}
          </motion.div>
        </div>
      )}
    </section>
  );
}
