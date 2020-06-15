import React, {
  useContext,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { TextInputProps, Animated } from 'react-native';
import { ThemeContext } from 'styled-components';
import { useField } from '@unform/core';

import { Container, TextInput, Icon, Error, ErrorText } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface inputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, ...rest },
  ref,
) => {
  const { colors } = useContext(ThemeContext);
  const inputElementRef = useRef<any>(null);
  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<inputValueReference>({ value: defaultValue });
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [errorY, setErrorY] = useState(new Animated.Value(-24));
  const [errorOpacity, setErrorOpacity] = useState(new Animated.Value(0));

  const iconColor = useMemo(() => {
    const color = error ? 'red' : 'grayHard';

    return colors[isFilled || isFocused ? 'orange' : color];
  }, [isFilled, isFocused, colors, error]);

  const setErrorApear = useCallback(
    (bottom: number, opacity: number): void => {
      const slide = Animated.spring(errorY, {
        bounciness: 10,
        toValue: bottom,
        useNativeDriver: false,
      });

      const fade = Animated.spring(errorOpacity, {
        bounciness: 10,
        toValue: opacity,
        useNativeDriver: false,
      });

      Animated.parallel([slide, fade], {
        stopTogether: true,
      }).start();
    },
    [errorOpacity, errorY],
  );

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
    setErrorY(new Animated.Value(-24));
    setErrorOpacity(new Animated.Value(0));
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current?.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(_: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current?.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  useEffect(() => {
    if (error) {
      setErrorApear(-12, 1);
    }
  }, [error, setErrorApear]);

  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      {error && !isFocused && (
        <Error style={{ bottom: errorY, opacity: errorOpacity }}>
          <ErrorText>{error}</ErrorText>
        </Error>
      )}

      <Icon name={icon} size={20} color={iconColor} />

      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor={colors.grayHard}
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
