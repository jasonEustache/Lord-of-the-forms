import { Component, createRef } from "react";
import { DisplayErrorMessage } from "../../ErrorMessage";
import { ClassPhoneInput } from "./ClassPhoneInput";
import { ClassTextInput } from "./classTextInput";
import { userContentErrors } from "../../utils/userContentError";
import {
  isNameValid,
  isNumberValid,
  isCityValid,
  isEmailValid,
} from "../../utils/validations";
import { formatPhoneNumber } from "../../utils/transformations";
import { allCities } from "../../utils/all-cities";

export class ClassForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      city: "",
      phone: ["", "", "", ""],
      notValid: false,
    };
  }

  userUpdate = (value) => {
    return this.setState(value);
  };

  render() {
    const userUpdate = this.userUpdate;
    const setUser = this.props.setUser;
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const city = this.state.city;
    const email = this.state.email;
    const phone = this.state.phone;
    const notValid = this.state.notValid;

    //conditions

    const validations = {
      firstName: isNameValid(firstName),
      lastName: isNameValid(lastName),
      email: isEmailValid(email),
      city: isCityValid(city, allCities),
      phone: isNumberValid(formatPhoneNumber(phone)),
    };

    const firstNameError = !validations.firstName;
    const lastNameError = !validations.lastName;
    const cityError = !validations.city;
    const emailError = !validations.email;
    const phoneError = !validations.phone;

    //onsubmit
    const handleOnSubmit = (e) => {
      e.preventDefault();

      if (Object.values(validations).includes(false)) {
        alert("bad Input Data");
        userUpdate({ notValid: true });
      } else {
        setUser({
          final: { firstName, lastName, email, city, phone },
        });
        setUser({
          done: true,
        });
        userUpdate({
          firstName: "",
          lastName: "",
          email: "",
          city: "",
          phone: ["", "", "", ""],
          notValid: false,
        });
      }
    };

    //onChangeFirst
    const handleOnChangeFirst = (e) => {
      userUpdate({ firstName: e.target.value });
    };
    //onChangeLast
    const handleOnChangeLast = (e) => {
      userUpdate({ lastName: e.target.value });
    };
    //onChangeEmail
    const handleOnChangeEmail = (e) => {
      userUpdate({ email: e.target.value });
    };
    //onChangeCity
    const handleOnChangeCity = (e) => {
      userUpdate({ city: e.target.value });
    };
    // onChangePhone
    const [ref1, ref2, ref3, ref4] = [
      createRef(null),
      createRef(null),
      createRef(null),
      createRef(null),
    ];

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
            return staticPhoneIndex === indexInput
              ? e.target.value
              : phoneInput;
          });

          if (shouldGoToNext) {
            nextInput.current.focus();
          }

          if (shouldGoToPrev) {
            previousInput.current.focus();
          }
          userUpdate({ phone: newPhoneInput });
        }
      };
    };

    return (
      <form onSubmit={handleOnSubmit} id="class-form">
        <u>
          <h3>User Information Form</h3>
        </u>
        <ClassTextInput
          props={{
            label: "First Name",
            placeHolder: "Bilbo",
            onChange: handleOnChangeFirst,
            value: firstName,
            errorMessage: userContentErrors[0].firstError,
            showError: notValid ? firstNameError : notValid,
          }}
        />
        <ClassTextInput
          props={{
            label: "Last Name",
            placeHolder: "Baggins",
            onChange: handleOnChangeLast,
            value: lastName,
            errorMessage: userContentErrors[1].lastError,
            showError: notValid ? lastNameError : notValid,
          }}
        />
        <ClassTextInput
          props={{
            label: "Email",
            placeHolder: "bilbo-baggins@adventurehobbits.net",
            onChange: handleOnChangeEmail,
            value: email,
            errorMessage: userContentErrors[2].emailError,
            showError: notValid ? emailError : notValid,
          }}
        />
        <ClassTextInput
          props={{
            type: "text",
            label: "City",
            list: "cities",
            placeHolder: "Hobbiton",
            onChange: handleOnChangeCity,
            value: city,
            errorMessage: userContentErrors[3].cityError,
            showError: notValid ? cityError : notValid,
          }}
        />

        <div className="input-wrap">
          <label htmlFor="phone">Phone:</label>
          <div id="phone-input-wrap">
            <ClassPhoneInput
              props={{
                ref: ref1,
                type: "text",
                id: "phone-input-1",
                placeholder: "55",
                handleOnChangePhone: handleOnChangePhone(0),
                value: phone[0],
              }}
            />
            -
            <ClassPhoneInput
              props={{
                ref: ref2,
                type: "text",
                id: "phone-input-2",
                placeholder: "55",
                handleOnChangePhone: handleOnChangePhone(1),
                value: phone[1],
              }}
            />
            -
            <ClassPhoneInput
              props={{
                ref: ref3,
                type: "text",
                id: "phone-input-3",
                placeholder: "55",
                handleOnChangePhone: handleOnChangePhone(2),
                value: phone[2],
              }}
            />
            -
            <ClassPhoneInput
              props={{
                ref: ref4,
                type: "text",
                id: "phone-input-4",
                placeholder: "5",
                handleOnChangePhone: handleOnChangePhone(3),
                value: phone[3],
              }}
            />
          </div>
        </div>

        <DisplayErrorMessage
          message={userContentErrors[4].numberError}
          show={notValid ? phoneError : notValid}
        />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
