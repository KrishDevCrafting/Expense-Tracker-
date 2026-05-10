import React from "react";

// FIX 1: Use 'children' (lowercase) instead of 'Childern'
const Modal = ({ children, isOpen, onClose, title }) => {
  // FIX 2: Add this check. If isOpen is false, render nothing.
  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* FIX 3: Changed 'item-center' to 'items-center' and 'overflow-y-autoauto' to 'overflow-y-auto' */}
      <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50">
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white dark:bg-[#1e1e2f] rounded-lg shadow-sm dark:shadow-lg">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200 dark:border-white/10">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {title}
              </h3>
              <button
                type="button"
                // FIX 4: Corrected 'item-center', 'darrk:', and 'cursor-pointed'
                className="text-gray-400 dark:text-gray-500 bg-transparent hover:text-gray-900 dark:hover:text-white rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer"
                onClick={onClose}
              >
                X{" "}
                {/* You might want to use a real 'X' icon or &times; HTML entity here */}
              </button>
            </div>

            {/* Modal body */}
            <div className="p-4 md:p-5 space-y-4">
              {/* FIX 5: Use 'children' (lowercase) here to render your form */}
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
