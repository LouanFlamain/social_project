import * as React from 'react';
import { Modal, Portal, Text, Button, Provider as PaperProvider } from 'react-native-paper';

const CustomModal = ({ visible, onDismiss, containerStyle, content }) => {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={containerStyle}>
        {content}
      </Modal>
    </Portal>
  );
};

const MyComponent = () => {
  const [visible, setVisible] = React.useState(false);
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <PaperProvider>
      <CustomModal
        visible={visible}
        onDismiss={hideModal}
        containerStyle={containerStyle}
        content={<Text>Example Modal. Click outside this area to dismiss.</Text>}
      />
      <Button style={{ marginTop: 30 }} onPress={showModal}>
        Show
      </Button>
    </PaperProvider>
  );
};

export default MyComponent;
