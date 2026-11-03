"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  bgColor?: "white" | "gray" | "warm" | "cool";
  fullWidth?: boolean;
  /** Keep first-fold sections tall; avoid on content sections (causes empty gaps). */
  minHeightScreen?: boolean;
}

const bgColorClass = {
  white: "bg-white",
  gray: "bg-gray-50",
  warm: "bg-[#faf9f7]",
  cool: "bg-[#eef1f4]",
} as const;

export default function SectionWrapper({
  id,
  children,
  className = "",
  bgColor = "white",
  fullWidth = false,
  minHeightScreen = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "w-full",
        bgColorClass[bgColor],
        minHeightScreen && "min-h-screen",
        className
      )}
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
            viewport={{ once: true }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </section>
  );
}
