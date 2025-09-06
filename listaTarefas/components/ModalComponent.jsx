import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';

const ModalComponent = ({ visible, children, onRequestClose, style }) => (
  <Modal
    visible={visible}
    transparent={true}
    animationType="fade"
    onRequestClose={onRequestClose}
  >
    <View style={[styles.overlay, style]}>
      <View style={styles.content}>{children}</View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    minWidth: 250,
    elevation: 5,
  },
});

export default ModalComponent;
