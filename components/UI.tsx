import React from 'react';
import { LucideIcon } from 'lucide-react';

// --- Layout Components ---

interface FormLabelProps {
  children: React.ReactNode;
  required?: boolean;
}

export const FormLabel = ({ children, required }: FormLabelProps) => (
  <label className="block text-sm font-medium text-slate-700 mb-1.5">
    {children}
    {required && <span className="text-red-500 ml-1">*</span>}
  </label>
);

export const SectionHeader = ({ 
  number, 
  title, 
  subtitle, 
  icon: Icon 
}: { 
  number: number; 
  title: string; 
  subtitle?: string; 
  icon?: LucideIcon 
}) => (
  <div className="mb-6 border-b border-emerald-100 pb-4">
    <div className="flex items-center gap-3 mb-1">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm">
        {number}
      </div>
      <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
        {title}
        {Icon && <Icon className="w-5 h-5 text-emerald-600" />}
      </h2>
    </div>
    {subtitle && <p className="text-sm text-slate-500 italic ml-11">{subtitle}</p>}
  </div>
);

// --- Input Components ---

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
}

export const TextInput = ({ label, helperText, className, required, ...props }: InputProps) => (
  <div className={`mb-5 ${className || ''}`}>
    <FormLabel required={required}>{label}</FormLabel>
    <input
      className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-slate-900 placeholder-slate-400"
      required={required}
      {...props}
    />
    {helperText && <p className="mt-1 text-xs text-slate-500">{helperText}</p>}
  </div>
);

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  helperText?: string;
}

export const TextArea = ({ label, helperText, className, required, ...props }: TextAreaProps) => (
  <div className={`mb-5 ${className || ''}`}>
    <FormLabel required={required}>{label}</FormLabel>
    <textarea
      className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-slate-900 min-h-[100px]"
      required={required}
      {...props}
    />
    {helperText && <p className="mt-1 text-xs text-slate-500">{helperText}</p>}
  </div>
);

interface RadioGroupProps {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export const RadioGroup = ({ label, name, options, value, onChange, required }: RadioGroupProps) => (
  <div className="mb-5">
    <FormLabel required={required}>{label}</FormLabel>
    <div className="space-y-2 mt-2">
      {options.map((option) => (
        <label key={option} className="flex items-center gap-3 cursor-pointer group">
          <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${value === option ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300 bg-white group-hover:border-emerald-400'}`}>
            <div className={`w-2 h-2 rounded-full bg-white transition-opacity ${value === option ? 'opacity-100' : 'opacity-0'}`} />
          </div>
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={(e) => onChange(e.target.value)}
            className="hidden"
          />
          <span className="text-slate-700">{option}</span>
        </label>
      ))}
    </div>
  </div>
);

interface CheckboxGroupProps {
  label: string;
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  required?: boolean;
}

export const CheckboxGroup = ({ label, options, selectedValues, onChange, required }: CheckboxGroupProps) => {
  const toggleValue = (option: string) => {
    if (selectedValues.includes(option)) {
      onChange(selectedValues.filter(v => v !== option));
    } else {
      onChange([...selectedValues, option]);
    }
  };

  return (
    <div className="mb-5">
      <FormLabel required={required}>{label}</FormLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
        {options.map((option) => {
            const isChecked = selectedValues.includes(option);
            return (
                <label key={option} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${isChecked ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:border-emerald-200'}`}>
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isChecked ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300 bg-white'}`}>
                    {isChecked && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    )}
                </div>
                <input
                    type="checkbox"
                    value={option}
                    checked={isChecked}
                    onChange={() => toggleValue(option)}
                    className="hidden"
                />
                <span className="text-sm text-slate-700 font-medium">{option}</span>
                </label>
            );
        })}
      </div>
    </div>
  );
};