import { Modal, Button, Text } from "@nextui-org/react";

export default function ConfirmationModal({title, action, closeHandler}) {
  const actionHandler = () => {
    action();
    closeHandler();
  }

  return (
    <div>
      <Modal
        closeButton
        preventClose
        aria-labelledby="modal-title"
        open={true}
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