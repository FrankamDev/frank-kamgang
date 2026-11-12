import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  X,
} from "lucide-react";

export type ToastType = "success" | "error" | "warning";

interface AdminToastProps {
  show: boolean;
  type?: ToastType;
  title: string;
  message?: string;
  onClose: () => void;
}

export default function AdminToast({
  show,
  type = "success",
  title,
  message,
  onClose,
}: AdminToastProps) {
  const config = {
    success: {
      icon: CheckCircle2,
      iconClass: "text-emerald-500",
      barClass: "bg-emerald-500",
      borderClass:
        "border-emerald-200 dark:border-emerald-900/50",
    },

    error: {
      icon: XCircle,
      iconClass: "text-red-500",
      barClass: "bg-red-500",
      borderClass:
        "border-red-200 dark:border-red-900/50",
    },

    warning: {
      icon: AlertTriangle,
      iconClass: "text-amber-500",
      barClass: "bg-amber-500",
      borderClass:
        "border-amber-200 dark:border-amber-900/50",
    },
  };

  const current = config[type];
  const Icon = current.icon;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{
            opacity: 0,
            y: -30,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -20,
            scale: 0.96,
          }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
          className={`fixed right-4 top-4 z-[100] w-[calc(100%-2rem)] max-w-sm overflow-hidden rounded-2xl border bg-white shadow-2xl dark:bg-slate-900 ${current.borderClass}`}
        >
          <div className="flex items-start gap-3 p-4">

            <Icon
              size={24}
              className={`mt-0.5 shrink-0 ${current.iconClass}`}
            />

            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {title}
              </h4>

              {message && (
                <p className="mt-1 text-sm leading-5 text-slate-500 dark:text-slate-400">
                  {message}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <X size={16} />
            </button>
          </div>

          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{
              duration: 4,
              ease: "linear",
            }}
            onAnimationComplete={onClose}
            className={`h-0.5 ${current.barClass}`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}