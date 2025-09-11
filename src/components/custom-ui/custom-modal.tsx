import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import type { FC, ReactNode } from "react";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const CustomModal: FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogOverlay className="fixed inset-0 z-[999] bg-black/10 dark:bg-black/10 backdrop-blur-sm" />

      <DialogContent className="z-[1000] max-w-[90vw] sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto p-0 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        {title && (
          <DialogHeader className="flex flex-row items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <DialogTitle className="text-lg sm:text-xl text-gray-900 dark:text-gray-100">
              {title}
            </DialogTitle>
            <DialogClose asChild onClick={onClose} aria-label="Close modal">
              <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500">
                <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </button>
            </DialogClose>
          </DialogHeader>
        )}

        <div className="p-4 text-sm sm:text-base text-gray-700 dark:text-gray-300">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
