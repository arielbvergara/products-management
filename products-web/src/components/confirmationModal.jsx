import { Modal, Button, Text } from "@nextui-org/react";

export default function ConfirmationModal({title, visible, action, closeHandler}) {
  const actionHandler = () => {
    action();
    closeHandler();
  }

  return (
    <div>
      <Modal
        open={visible}
        closeButton
        aria-labelledby="modal-title"
        onClose={() => closeHandler()}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            {title}
          </Text>
        </Modal.Header>
        <Modal.Footer>
          <Button auto flat color="error" onPress={() => closeHandler()}>
            Cancel
          </Button>
          <Button auto onPress={actionHandler}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}