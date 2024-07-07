import { Button, Flex } from "@radix-ui/themes";
import { Dialog } from "@radix-ui/themes";

type ModalProps = {
  children: React.ReactNode;
  name?: string;
};

type ModalContentProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

function Modal({ children, name }: ModalProps) {
  console.log(name);
  return <Dialog.Root>{children}</Dialog.Root>;
}

function ModalTrigger({ children }: ModalProps) {
  return <Dialog.Trigger>{children}</Dialog.Trigger>;
}

function ModalContent({ title, description, children }: ModalContentProps) {
  return (
    <Dialog.Content>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Description>{description}</Dialog.Description>
      {children}
      <Flex gap="3" mt="4" justify="end">
        <Dialog.Close>
          <Button variant="soft">Cancel</Button>
        </Dialog.Close>
        <Dialog.Close>
          <Button>Save</Button>
        </Dialog.Close>
      </Flex>
    </Dialog.Content>
  );
}

Modal.Trigger = ModalTrigger;
Modal.Content = ModalContent;

export default Modal;

