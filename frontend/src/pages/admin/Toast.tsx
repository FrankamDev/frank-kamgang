import { CheckCircle, XCircle, X } from "lucide-react";

interface ToastProps {
  type: "success" | "error";
  message: string;
  onClose: () => void;
}

export default function Toast({
  type,
  message,
  onClose,
}: ToastProps) {
  const isSuccess = type === "success";

  return (
    <div
      className="
        fixed right-4 top-4 z-[100]
        w-[calc(100%-2rem)] max-w-sm
        animate-in slide-in-from-right-5 fade-in
        rounded-xl border bg-white p-4 shadow-2xl
        dark:bg-[#0b1120]
      "
    >
      <div className="flex items-start gap-3">
        {isSuccess ? (
          <CheckCircle
            size={22}
            className="mt-0.5 shrink-0 text-emerald-500"
          />
        ) : (
          <XCircle
            size={22}
            className="mt-0.5 shrink-0 text-red-500"
          />
        )}

        <div className="flex-1">
          <p className="text-sm font-semibold">
            {isSuccess ? "Succès" : "Erreur"}
          </p>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {message}
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 transition hover:text-slate-700 dark:hover:text-white"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}