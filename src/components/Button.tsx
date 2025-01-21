import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface GradientShadowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}


const GradientShadowButton: React.FC<GradientShadowButtonProps> =  ({children, className, onClick, ...props}) => {
    return (
      <div className={`group relative w-fit transition-transform duration-300 active:scale-95 ${className}`}>
        <button 
        onClick={onClick} 
        className="w-full relative z-10 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 p-0.5 duration-300 group-hover:scale-110"
        {...props}
        >
          <span className="block rounded-md w-full bg-slate-950 px-4 py-2 font-semibold text-slate-100 duration-300 group-hover:bg-slate-950/50 group-hover:text-slate-50 group-active:bg-slate-950/80">
            {children}
          </span>
        </button>
        <span className="pointer-events-none absolute -inset-4 z-0 transform-gpu rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 opacity-30 blur-3xl transition-all duration-300 group-hover:opacity-40 group-active:opacity-50" />
      </div>
    );
  };
  
  export default GradientShadowButton;