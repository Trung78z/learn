import React from "react";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="w-96 rounded-lg bg-white p-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2>{title}</h2>
          <button
            onClick={onClose}
            className="cursor-pointer rounded-md border-none bg-[#007bff] px-2 py-2 text-white hover:bg-[#0056b3]"
          >
            X
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}
