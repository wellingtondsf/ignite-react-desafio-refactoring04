import {
    useEffect,
    useState,
    useCallback,
    createRef,
    InputHTMLAttributes,
  } from 'react';
  
  import { useField } from '@unform/core';
  
  import { Container } from './styles';

  interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    icon?: any;
    name: string;
  }
  
  const Input = ({ name, icon: Icon, ...rest } : InputProps) => {
    const inputRef = createRef<HTMLInputElement>();
  
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
  
    const { fieldName, defaultValue, registerField } = useField(name);
  
    const handleInputFocus = useCallback(() => {
      setIsFocused(true);
    }, []);
  
    const handleInputBlur = useCallback(() => {
      setIsFocused(false);
  
      setIsFilled(!!inputRef.current?.value);
    }, [inputRef]);
  
    useEffect(() => {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'value',
      });
    }, [fieldName, inputRef, registerField]);
  
    return (
      <Container isFilled={isFilled} isFocused={isFocused}>
        {Icon && <Icon size={20} />}
  
        <input
          {...rest}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          ref={inputRef}
        />
      </Container>
    );
  };
  
  export default Input;