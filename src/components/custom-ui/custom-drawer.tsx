import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { X } from "lucide-react";
import type { FC, ReactNode } from "react";

interface CustomDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  trigger?: ReactNode;
  children: ReactNode;
  className?: string;
  showClose?: boolean;
}

const CustomDrawer: FC<CustomDrawerProps> = ({
  open,
  onOpenChange,
  title,
  trigger,
  children,
  className = "",
  showClose = true,
}) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}

      <DrawerContent
        className={`ml-auto h-screen bg-white dark:bg-gray-900 flex flex-col ${className}`}
      >
        {title && (
          <DrawerHeader className="border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
            <DrawerTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </DrawerTitle>

            {showClose && (
              <DrawerClose asChild>
                <button
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  aria-label="Close drawer"
                >
                  <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
              </DrawerClose>
            )}
          </DrawerHeader>
        )}

        <div className="flex-1 overflow-y-auto">{children}</div>
      </DrawerContent>
    </Drawer>
  );
};

export default CustomDrawer;
