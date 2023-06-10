import {useReducer} from 'react';

const initialInputState = {
    userInputValue: '',
    isInputTouched: false,
};

const InputReducerFn = (state, action) => {
    if (action.type === 'CHANGE_INPUT') {
        return {
            userInputValue: action.inputValue,
            isInputTouched: state.isInputTouched,
        };
    }
    if (action.type === 'BLUR_INPUT') {
        return {
            userInputValue: state.userInputValue,
            isInputTouched: true,
        };
    }
    if (action.type === 'RESET_INPUT') {
        return {
            userInputValue: '',
            isInputTouched: false,
        };
    }
    return initialInputState;
};

const useInput = (validateValueFn) => {
    const [inputState, dispatchInputActionFn] = useReducer(
        InputReducerFn,
        initialInputState,
    );

    const inputValueIsvalid = validateValueFn(inputState.userInputValue);
    const inputHasError = !inputValueIsvalid && inputState.isInputTouched;

    const userInputChangeHandler = (e) => {
        dispatchInputActionFn({
            type: 'CHANGE_INPUT',
            inputValue: e.target.value,
        });
    };
    const inputBlurHandler = (e) => {
        dispatchInputActionFn({
            type: 'BLUR_INPUT',
        });
    };
    const resetInputHandler = (e) => {
        dispatchInputActionFn({
            type: 'RESET_INPUT',
        });
    };

    return {
        value: inputState.userInputValue,
        isValid: inputValueIsvalid,
        inputHasError,
        userInputChangeHandler,
        inputBlurHandler,
        resetInputHandler,
    };
};

export default useInput;
