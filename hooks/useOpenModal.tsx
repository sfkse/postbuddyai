import { useState } from "react";

function useOpenModal() {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);
  const openModal = () => {
    console.log("object open");
    setIsOpen(true);
  };

  const closeModal = () => {
    console.log("object");
    setIsOpen(false);
  };

  return { isOpen, openModal, closeModal };
}

export default useOpenModal;

