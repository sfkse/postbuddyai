import { Flex } from "@radix-ui/themes";
import React from "react";

type ModalProps = {
  children: React.ReactNode;
};

function Modal({ children }: ModalProps) {
  return (
    <Flex
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
      }}
    >
      <Flex
        direction="column"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "2rem",
          borderRadius: "0.5rem",
          backgroundColor: "white",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          zIndex: 9999,
          gap: "1rem",
        }}
      >
        {children}
      </Flex>
    </Flex>
  );
}

function ModalHeader({ children }: ModalProps) {
  return <Flex>{children}</Flex>;
}

function ModalBody({ children }: ModalProps) {
  return <Flex direction="column">{children}</Flex>;
}

function ModalFooter({ children }: ModalProps) {
  return (
    <Flex gap="2" justify="end">
      {children}
    </Flex>
  );
}

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;

