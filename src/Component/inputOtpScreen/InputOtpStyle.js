import React from 'react';
import {StyleSheet} from 'react-native';

const InputOtpStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerAvoidingView: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },

  TextTitle: {
    marginBottom: 50,
    marginTop: 50,
    fontSize: 16,
  },

  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    // paddingHorizontal: 12,
    // borderRadius: 10,
    // backgroundColor: 'white',
    // alignItems: 'center',
    // borderBottomWidth: 1.5,
  },
  cellView: {
    paddingVertical: 11,
    width: 40,
    height: 55,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
  },
  cellText: {
    textAlign: 'center',
    fontSize: 16,
  },

  bottomView: {
    flexDirection: 'row',
    flex: 1,
    // justifyContent: 'flex-end',
    marginBottom: 50,
    alignItems: 'flex-end',
  },
  btnChangeNumber: {
    width: 150,
    height: 50,
    borderRadius: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  textChange: {
    color: '#234DB7',
    alignItems: 'center',
    fontSize: 15,
  },
  btnResend: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  textResend: {
    alignItems: 'flex-end',
    fontSize: 15,

  },
});

export default InputOtpStyle;
