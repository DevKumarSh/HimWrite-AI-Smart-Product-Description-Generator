function TextAreaField({
  label,
  id,
  error,
  placeholder = "",
  rows = 3,
  value,
  onChange,
  className = "",
  required = false,
  ...props
}) {
  const hasError = !!error;

  return (
    <div className={`space-y-1.5 w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center">
          <label
            htmlFor={id}
            className="block text-xs font-bold text-slate-700 tracking-wide uppercase"
          >
            {label}
            {required && <span className="text-rose-500 ml-1 font-sans">*</span>}
          </label>
        </div>
      )}
      <div className="relative">
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          required={required}
          className={`w-full px-4 py-3 rounded-xl bg-white border text-slate-900 placeholder-slate-400 text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-opacity-15 shadow-sm resize-none
            ${
              hasError
                ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20 bg-rose-50/10"
                : "border-slate-200/80 focus:border-blue-600 focus:ring-blue-600/10 hover:border-slate-300"
            }`}
          {...props}
        />
      </div>
      {hasError && (
        <p className="text-[11px] font-semibold text-rose-600 animate-fadeIn pl-1">
          {error}
        </p>
      )}
    </div>
  );
}

export default TextAreaField;
