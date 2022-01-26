import React, {useState, useEffect, useRef} from 'react';
import {
  Button,
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {AuthenticationScreen} from '../authentication/AuthenticationScreen';
import InputOtpStyle from './InputOtpStyle';

export function InputOtpScreen({navigation}) {
  const textInput = useRef(null);
  const clockCall = useRef(null);
  const lengthInput = 6;
  const [internalVal, setInternalVal] = useState('');
  const [countDown, setCountDown] = useState(5);
  const [enableResend, setEnableResent] = useState(false);

  useEffect(() => {
    clockCall.current = setInterval(() => {
      decrementClock();
    }, 1000);
    return () => {
      clearInterval(clockCall.current);
    };
  });

  const decrementClock = () => {
    if (countDown === 0) {
      setEnableResent(true);
      clearInterval(clockCall.current);
    } else {
      setCountDown(countDown - 1);
    }
  };

  const onChangeText = val => {
    setInternalVal(val);
    if(val.length === lengthInput){
      navigation.navigate('HomeScreen')
    }
  };

  const onResendOTp = () => {
    if (enableResend) {
      setCountDown(5);
      setEnableResent(false);
      clearInterval(clockCall.current);
      clockCall.current = setInternalVal(() => {
        decrementClock();
        return '';
      }, 1000);
    }
  };
  const onChangeNumber = ( ) => {

    setInternalVal('');

  };

  useEffect(() => {
    textInput.current?.focus?.();
  }, [textInput]);

  return (
    <View style={InputOtpStyle.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={'padding'}
        style={InputOtpStyle.containerAvoidingView}>
        <Text style={InputOtpStyle.TextTitle}>
          {'Введите Ваш OTP код из смс'}
        </Text>
        <View>
          <TextInput
            //????ref
            ref={textInput}
            onChangeText={onChangeText}
            style={{width: 0, height: 0}}
            value={internalVal}
            maxLength={lengthInput}
            returnKeyType="done"
            keyboardType="numeric"
          />
          <View style={InputOtpStyle.containerInput}>
            {Array(lengthInput)
              .fill()
              .map((data, index) => (
                <View
                  key={index}
                  style={[
                    InputOtpStyle.cellView,
                    {
                      borderColor:
                        index === internalVal?.length ? '#FB6C6A' : '#234DB7',
                    },
                  ]}>
                  <Text
                    style={InputOtpStyle.cellText}
                    onPress={() => textInput}>
                    {internalVal?.length >= 0
                      ? internalVal[index]
                      : ''}
                  </Text>
                </View>
              ))}
          </View>
        </View>

        <View style={InputOtpStyle.bottomView}>
          <TouchableOpacity onPress={onChangeNumber}>
            <View style={InputOtpStyle.btnChangeNumber}>
              <Text style={InputOtpStyle.textChange}> Ввести заново</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onResendOTp}>
            <View style={InputOtpStyle.btnResend}>
              <Text
                style={[
                  InputOtpStyle.textResend,
                  {
                    color: enableResend ? '#234DB7' : 'gray',
                  },
                ]}>
                Обновить OTP({countDown})
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
