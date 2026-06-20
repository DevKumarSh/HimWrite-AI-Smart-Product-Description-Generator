function EmptyState({
  icon: IconComponent,
  title,
  description,
  actionText,
  onActionClick,
  variant = "blue", // "blue" or "slate"
  className = "",
}) {
  const bgStyles =
    variant === "blue"
      ? "bg-gradient-to-br from-blue-50/50 to-indigo-50/20 border-blue-100/50 text-blue-600"
      : "bg-slate-50/80 border-slate-100 text-slate-400";

  const pulseIconColor = variant === "blue" ? "text-blue-500 fill-blue-100" : "text-slate-400 fill-slate-100";

  return (
    <div
      className={`flex-1 flex flex-col items-center justify-center min-h-[300px] text-center border rounded-2xl p-8 space-y-4 shadow-sm animate-fadeIn ${bgStyles} ${className}`}
    >
      {IconComponent && (
        <div className="p-3 bg-white rounded-full shadow-sm text-inherit">
          <IconComponent
            size={24}
            className={`animate-pulse ${pulseIconColor}`}
            fill="currentColor"
          />
        </div>
      )}
      <div className="space-y-1.5 max-w-[340px]">
        <h4 className="font-extrabold text-slate-800 text-sm">
          {title}
        </h4>
        <p className="text-xs text-slate-500 leading-relaxed font-medium">
          {description}
        </p>
      </div>
      {actionText && onActionClick && (
        <button
          onClick={onActionClick}
          className="mt-2 flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-sm hover:shadow-md"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
