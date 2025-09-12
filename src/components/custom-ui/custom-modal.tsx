import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import type { FC, ReactNode } from "react";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  width?: string;
}

const CustomModal: FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  width = "40vw",
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogOverlay className="fixed inset-0 z-[999] bg-black/10 dark:bg-black/10 backdrop-blur-sm" />

      <DialogContent
        style={{ maxWidth: width }}
        className={`w-full z-[1000] max-w-[90vw] max-h-[90vh] overflow-y-auto overflow-x-hidden p-0 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 `}
      >
        {title && (
          <DialogHeader className="flex flex-row items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <DialogTitle className="text-lg sm:text-xl text-gray-900 dark:text-gray-100">
              {title}
            </DialogTitle>
            <DialogClose asChild onClick={onClose} aria-label="Close modal" />
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
