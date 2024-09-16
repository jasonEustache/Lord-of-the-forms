import { allCities } from "../../utils/all-cities";
import { useState, useRef } from "react";
import { formatPhoneNumber } from "../../utils/transformations";
import { FunctionalTextInput } from "./FunctionalTextInput";

import {
  isThisAFirst,
  isThisALast,
  isThisANumber,
  isThisACity,
  isThisAEmail,
} from "../../utils/validations";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";
import { DisplayErrorMessage } from "../../ErrorMessage";
import { userContentErrors } from "../../utils/userContentError";

export const FunctionalForm = (props) => {
  const setUserInformation = props.setUserInformation;
  const [ref1, ref2, ref3, ref4] = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const user = {
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    phone: ["", "", "", ""],
  };

  // State
  const [finalUserInput, setFinalUserInput] = useState(user);
  const [validations, setValidations] = useState({});
  const { city, email, firstName, lastName, phone } = finalUserInput;

  //conditions
  const userInfoValidation = {
    firstName: isThisAFirst(firstName),
    lastName: isThisALast(lastName),
    email: isThisAEmail(email),
    city: isThisACity(city, allCities),
    phone: isThisANumber(formatPhoneNumber(phone)),
    display: "display",
  };
  const isThisAFirstName_ = !validations.firstName;
  const isThisALastName_ = !validations.lastName;
  const isThisACity_ = !validations.city;
  const isThisAEmail_ = !validations.email;
  const isThisAPhone_ = !userInfoValidation.phone;

  //onsubmit
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const shouldNotSubmitInformation =
      Object.values(userInfoValidation).includes(false);
    if (shouldNotSubmitInformation) {
      alert("bad Input Data");
      setValidations(userInfoValidation);
    } else {
      setUserInformation({ ...finalUserInput });
      setFinalUserInput({ ...user });
      setValidations({});
    }
  };
  //onChangeFirst
  const handleOnChangeFirst = (e) => {
    setFinalUserInput({
      ...finalUserInput,
      firstName: e.target.value,
    });
    isThisAFirst(e.target.value);

    if (validations.display?.length > 0) {
      setValidations({
        ...validations,
        firstName: isThisAFirst(e.target.value),
      });
    }
  };
  //onChangeLast
  const handleOnChangeLast = (e) => {
    setFinalUserInput({
      ...finalUserInput,
      lastName: e.target.value,
    });

    if (validations.display?.length > 0) {
      setValidations({
        ...validations,
        lastName: isThisALast(e.target.value),
      });
    }
  };
  //onChangeEmail
  const handleOnChangeEmail = (e) => {
    setFinalUserInput({
      ...finalUserInput,
      email: e.target.value,
    });

    if (validations.display?.length > 0) {
      setValidations({
        ...validations,
        email: isThisAEmail(e.target.value),
      });
    }
  };
  //onChangeCity
  const handleOnChangeCity = (e) => {
    setFinalUserInput({
      ...finalUserInput,
      city: e.target.value,
    });

    if (validations.display?.length > 0) {
      setValidations({
        ...validations,
        city: isThisACity(e.target.value, allCities),
      });
    }
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

        const updateUserInput = phone.map((phoneInput, indexInput) => {
          return staticPhoneIndex === indexInput ? e.target.value : phoneInput;
        });

        if (shouldGoToNext) {
          nextInput.current.focus();
        }

        if (shouldGoToPrev) {
          previousInput.current.focus();
        }

        setFinalUserInput({
          ...finalUserInput,
          phone: updateUserInput,
        });

        if (validations.display?.length > 0) {
          setValidations({
            ...validations,
            phone: isThisANumber(e.target.value),
          });
        }
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
          value: finalUserInput.firstName,
          handleOnChange: handleOnChangeFirst,
          errorMessage: userContentErrors[0].name,
          showError:
            validations.display?.length > 0 ? isThisAFirstName_ : false,
        }}
      />
      <FunctionalTextInput
        props={{
          label: "Last Name",
          placeHolder: "Baggins",
          value: finalUserInput.lastName,
          handleOnChange: handleOnChangeLast,
          errorMessage: userContentErrors[1].last,
          showError: validations.display?.length > 0 ? isThisALastName_ : false,
        }}
      />
      <FunctionalTextInput
        props={{
          label: "Email",
          placeHolder: "bilbo-baggins@adventurehobbits.net",
          value: finalUserInput.email,
          handleOnChange: handleOnChangeEmail,
          errorMessage: userContentErrors[2].email,
          showError: validations.display?.length > 0 ? isThisAEmail_ : false,
        }}
      />
      <FunctionalTextInput
        props={{
          label: "City",
          type: "text",
          list: "cities",
          placeHolder: "Hobbiton",
          value: finalUserInput.city,
          handleOnChange: handleOnChangeCity,
          errorMessage: userContentErrors[3].city,
          showError: validations.display?.length > 0 ? isThisACity_ : false,
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
        message={userContentErrors[4].number}
        show={validations.display?.length > 0 ? isThisAPhone_ : false}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};
