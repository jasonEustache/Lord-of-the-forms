import { allCities } from "../../utils/all-cities";
import { useState, useRef } from "react";
import { formatPhoneNumber } from "../../utils/transformations";
import { FunctionalTextInput } from "./FunctionalTextInput";

import {
  isNameValid,
  isNumberValid,
  isCityValid,
  isEmailValid,
} from "../../utils/validations";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";
import { DisplayErrorMessage } from "../../ErrorMessage";
import { userContentErrors } from "../../utils/userContentError";

export const FunctionalForm = (props) => {
  const setUser = props.setUser;

  const [ref1, ref2, ref3, ref4] = [
    useRef(""),
    useRef(""),
    useRef(""),
    useRef(""),
  ];

  // State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState(["", "", "", ""]);
  const [notValid, setNotValid] = useState(false);
  //conditions
  const validations = {
    first: isNameValid(firstName),
    last: isNameValid(lastName),
    email: isEmailValid(email),
    city: isCityValid(city, allCities),
    phone: isNumberValid(formatPhoneNumber(phone)),
  };

  const firstNameError = !validations.first;
  const lastNameError = !validations.last;
  const cityError = !validations.city;
  const emailError = !validations.email;
  const numberError = !validations.phone;

  //onsubmit
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (Object.values(validations).includes(false)) {
      alert("bad Input Data");
      setNotValid(true);
    } else {
      setUser({
        firstName,
        lastName,
        email,
        city,
        phone,
      });
      setNotValid(false);
      setFirstName("");
      setLastName("");
      setCity("");
      setEmail("");
      setPhone(["", "", "", ""]);
    }
  };

  //onChangeFirst
  const handleOnChangeFirst = (e) => {
    setFirstName(e.target.value);
  };

  //onChangeLast
  const handleOnChangeLast = (e) => {
    setLastName(e.target.value);
  };

  //onChangeEmail
  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  //onChangeCity
  const handleOnChangeCity = (e) => {
    setCity(e.target.value);
  };

  // onChangePhone
  const handleOnChangePhone = (staticPhoneIndex) => {
    return (e) => {
      if (e.target.value >= 0) {
        const eachPhoneInputMax = [2, 2, 2, 1];
        const currentInputMax = eachPhoneInputMax[staticPhoneIndex];
        const value = e.target.value;
        const eachPhoneInput = [ref1, ref2, ref3, ref4];
        const nextInput = eachPhoneInput[staticPhoneIndex + 1];
        const previousInput = eachPhoneInput[staticPhoneIndex - 1];
        const currentInput = eachPhoneInput[staticPhoneIndex];
        const shouldGoToNext =
          currentInputMax === value.length && nextInput?.current;
        const shouldGoToPrev = value.length === 0 && previousInput?.current;
        currentInput.current.maxLength = currentInputMax;
        const newPhoneInput = phone.map((phoneInput, indexInput) => {
          return staticPhoneIndex === indexInput ? e.target.value : phoneInput;
        });

        if (shouldGoToNext) {
          nextInput.current.focus();
        }

        if (shouldGoToPrev) {
          previousInput.current.focus();
        }

        setPhone(newPhoneInput);
      }
    };
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <ul>
        <h3>User Information Form</h3>
      </ul>
      <FunctionalTextInput
        props={{
          label: "First Name",
          placeHolder: "Bilbo",
          value: firstName,
          handleOnChange: handleOnChangeFirst,
          errorMessage: userContentErrors[0].firstError,
          showError: notValid ? firstNameError : notValid,
        }}
      />
      <FunctionalTextInput
        props={{
          label: "Last Name",
          placeHolder: "Baggins",
          value: lastName,
          handleOnChange: handleOnChangeLast,
          errorMessage: userContentErrors[1].lastError,
          showError: notValid ? lastNameError : notValid,
        }}
      />
      <FunctionalTextInput
        props={{
          label: "Email",
          placeHolder: "bilbo-baggins@adventurehobbits.net",
          value: email,
          handleOnChange: handleOnChangeEmail,
          errorMessage: userContentErrors[2].emailError,
          showError: notValid ? emailError : notValid,
        }}
      />
      <FunctionalTextInput
        props={{
          label: "City",
          type: "text",
          list: "cities",
          placeHolder: "Hobbiton",
          value: city,
          handleOnChange: handleOnChangeCity,
          errorMessage: userContentErrors[3].cityError,
          showError: notValid ? cityError : notValid,
        }}
      />
      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">
          <FunctionalPhoneInput
            props={{
              handleOnChange: handleOnChangePhone(0),
              id: "phone-input-1",
              ref: ref1,
              placeHolder: "55",
              value: phone[0],
            }}
          />
          -
          <FunctionalPhoneInput
            props={{
              handleOnChange: handleOnChangePhone(1),
              id: "phone-input-2",
              ref: ref2,
              placeHolder: "55",
              value: phone[1],
            }}
          />
          -
          <FunctionalPhoneInput
            props={{
              handleOnChange: handleOnChangePhone(2),
              id: "phone-input-3",
              ref: ref3,
              placeHolder: "55",
              value: phone[2],
            }}
          />
          -
          <FunctionalPhoneInput
            props={{
              handleOnChange: handleOnChangePhone(3),
              id: "phone-input-4",
              ref: ref4,
              placeHolder: "5",
              value: phone[3],
            }}
          />
        </div>
      </div>
      <DisplayErrorMessage
        message={userContentErrors[4].numberError}
        show={notValid ? numberError : notValid}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};
