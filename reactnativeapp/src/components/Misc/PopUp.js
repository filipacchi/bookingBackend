import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

const IOSPopup = ({
  visible,
  title,
  placeholder,
  hasInput,
  buttonTexts,
  buttonColor,
  inputValue,
  setInputValue,
  onButtonPress,
  onCancelPress,
}) => {
  const renderButtons = () => {
    return buttonTexts.map((text, index) => (
      <TouchableOpacity
        key={index}
        style={[styles.button, { backgroundColor: buttonColor }]}
        onPress={() => onButtonPress(index)}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    ));
  };

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancelPress}
    >
      <TouchableWithoutFeedback onPress={onCancelPress}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.popup}>
              <Text style={styles.title}>{title}</Text>
              {hasInput && (
                <TextInput
                  style={styles.input}
                  placeholder={placeholder}
                  value={inputValue}
                  onChangeText={handleInputChange}
                />
              )}
              <View style={styles.buttonContainer}>
                {renderButtons()}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
};

export default IOSPopup;