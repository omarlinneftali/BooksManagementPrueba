import React, { useEffect, useState } from "react";
import { getInputValue } from "../utils/utilityInputFunctions";

const useForm = (initialState, validations, onSubmit) => {
  const [state, setState] = useState(initialState);
  const [errors, setStateErrors] = useState({});

  const getInputErrorMessage = (input, validations) => {
    const { name, value } = input;
    const errorsMessage = validations[name](value);
    return errorsMessage;
  };
  const getFormErrorMessages = (data, validations) => {

    const validationErrors={};

    for(let validationName in validations){
       let errorMessage= validations[validationName](data[validationName]);

       if(errorMessage){
        validationErrors[validationName]=errorMessage;
       } 
        
    }
    return validationErrors;
  };

  const handleChangeInput = ({ currentTarget: input }) => {
    const value = getInputValue(input);
    const { name } = input;
    const errorMessage = getInputErrorMessage(input, validations);

    const newErrors = { ...errors };

    if (errorMessage) {
      setStateErrors((errors) => ({ ...newErrors, [name]: errorMessage }));
    } else {
      delete newErrors[name];
      setStateErrors((errors) => ({ ...newErrors, [name]: errorMessage }));
    }
    setState((data) => ({ ...data, [name]: value }));
  };
  const handleSubmit = () => {
      const formErrorMessages = getFormErrorMessages(state, validations);
      const errorMessagesCount = Object.entries(formErrorMessages).length;


    if (errorMessagesCount>0) {
      return setStateErrors( formErrorMessages);
    } 
    setStateErrors({});
    onSubmit(state);
  };

  return {  handleChangeInput, handleSubmit,errors, state, setState };

};

export default useForm;
