import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  icon, 
  className = '',
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-none font-semibold uppercase tracking-wider text-sm transition-all duration-300 flex items-center justify-center gap-2 group";
  
  const variants = {
    primary: "bg-blue-600 text-white border border-blue-500 hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]",
    secondary: "bg-slate-800 text-white border border-slate-700 hover:border-blue-400 hover:text-blue-400",
    outline: "bg-transparent border border-white/20 text-white hover:bg-white/10 hover:border-blue-400 hover:text-blue-400"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="group-hover:translate-x-1 transition-transform">{icon}</span>}
    </motion.button>
  );
};