import React from 'react';
import { cn } from './Button';

export const Card = ({ children, className }) => {
  return (
    <div className={cn("card-light p-6", className)}>
      {children}
    </div>
  );
};

export const CardHeader = ({ title, description, className }) => (
  <div className={cn("flex flex-col space-y-1.5 mb-4", className)}>
    {title && <h3 className="font-semibold leading-none tracking-tight text-slate-900">{title}</h3>}
    {description && <p className="text-sm text-slate-500">{description}</p>}
  </div>
);

export const CardContent = ({ children, className }) => (
  <div className={cn("", className)}>
    {children}
  </div>
);
