import React, {useRef, useState, useEffect} from 'react';
import {
  Button,
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import AuthenticationScreenStyle from './AuthenticationScreenStyle';

import {Countries} from '../Countries/Countries';

export function AuthenticationScreen({navigation}) {
  let textInput = useRef(null);
  // const defaultCodeCountry = '+38';
  // const defaultMaskCountry = '99 999 9999';

  const [focusInput, setfocusInput] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const [dataCountries, setDataCountries] = useState(Countries);

  const [codeCountry, setCodeCountry] = useState('+380');
  const [placeholder, setplaceholder] = useState('99 999 9999');
  const [phoneNumber, setPhoneNumber] = useState('');

  const onShowHideModal = item => {
    if (setModalVisible(true)) {
      return codeCountry;
    }
  };

  const onChangePhone = number => {
    setPhoneNumber(number);
  };

  const filterCountries = value => {
    if (value) {
      setDataCountries(
        dataCountries.filter(
          obj => obj.en.indexOf(value) > -1 || obj.dialCode.indexOf(value) > -1,
        ),
      );
    } else {
      setDataCountries(Countries);
    }
  };

  const onCountryChange = item => {
    setCodeCountry(item.dialCode);
    setplaceholder(item.mask);
    setModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  let renderModal = () => {
    return (
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <SafeAreaView style={{flex: 1}}>
          <View style={AuthenticationScreenStyle.modalContainer}>
            <View style={AuthenticationScreenStyle.filterInputContainer}>
              <TextInput
                autoFocus={true}
                onChangeText={filterCountries}
                placeholder={'Filter'}
                focusable={true}
                style={AuthenticationScreenStyle.filterInputStyle}
              />
            </View>

            <FlatList
              style={{flex: 1}}
              data={dataCountries}
              extraData={dataCountries}
              keyExtractor={(item, index) => index}
              renderItem={({item}) => {
                return (
                  <TouchableWithoutFeedback
                    onPress={() => onCountryChange(item)}>
                    <View style={AuthenticationScreenStyle.countryModalStyle}>
                      <View
                        style={AuthenticationScreenStyle.modalItemContainer}>
                        <Text style={AuthenticationScreenStyle.modalItemName}>
                          {' '}
                          {item.en}
                        </Text>
                        <Text
                          style={AuthenticationScreenStyle.modalItemDialCode}>
                          {' '}
                          {item.dialCode}
                        </Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                );
              }}
            />
          </View>
          <TouchableOpacity
            onPress={closeModal}
            style={AuthenticationScreenStyle.closeButtonStyle}>
            <Text style={AuthenticationScreenStyle.closeTextStyle}>
              {' '}
              {'Close'}
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    );
  };

  const onPressContinue = () => {
    //You need add if for phone when press continue
    if (phoneNumber.length === placeholder.replace(/ /g, '').length) {
      navigation.navigate('inputOtpScreen');
    } else {
      alert('fuck');
    }
  };

  // const onChangeFocus = () => {};

  const onChangeBlure = () => {
    setfocusInput(false);
  };

  useEffect(() => {
    textInput.focus();
  }, []);

  return (
    <View style={AuthenticationScreenStyle.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={'padding'}
        style={AuthenticationScreenStyle.containerAvoidingView}>
        <Text style={AuthenticationScreenStyle.TextTitle}>
          {'Пожалуйста, введите Ваш мобильный номер'}
        </Text>

        <View
          style={[
            AuthenticationScreenStyle.containerInput,
            {
              borderBottomColor: focusInput ? '#244DB7' : '#ffffff',
            },
          ]}>
          <TouchableOpacity onPress={onShowHideModal}>
            <View style={AuthenticationScreenStyle.openDialogView}>
              <Text> {codeCountry}</Text>
            </View>
          </TouchableOpacity>
          {renderModal()}
          <TextInput
            ref={input => (textInput = input)}
            style={AuthenticationScreenStyle.phoneInputStyle}
            placeholder={placeholder}
            keyboardType={'numeric'}
            value={phoneNumber}
            onChangeText={onChangePhone}
            secureTextEntry={false}
            // onFocus={onChangeFocus}
            onBlur={onChangeBlure}
            autoFocus={focusInput}
          />
        </View>

        <View style={AuthenticationScreenStyle.vievBottom}>
          <TouchableOpacity onPress={onPressContinue}>
            <View
              style={[
                AuthenticationScreenStyle.btnContinue,
                {
                  backgroundColor: phoneNumber ? '#244DB7' : 'gray',
                },
              ]}>
              <Text style={AuthenticationScreenStyle.textContinue}>
                Continue
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
