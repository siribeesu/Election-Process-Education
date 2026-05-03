import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export function PageContainer({ children, className, animate = true }: PageContainerProps) {
  const content = (
    <div className={cn("container mx-auto px-4 py-8 md:py-12 max-w-7xl", className)}>
      {children}
    </div>
  );

  if (!animate) {
    return <main className="flex-1 min-h-[calc(100vh-4rem)]">{content}</main>;
  }

  return (
    <main className="flex-1 min-h-[calc(100vh-4rem)]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {content}
      </motion.div>
    </main>
  );
}
