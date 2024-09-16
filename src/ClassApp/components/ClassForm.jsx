import { Component, createRef } from "react";
import { DisplayErrorMessage } from "../../ErrorMessage";
import { ClassPhoneInput } from "./ClassPhoneInput";
import { ClassTextInput } from "./classTextInput";
import { classUserContentError } from "../../utils/classUserContentError";
import {
  isThisAFirst,
  isThisALast,
  isThisACity,
  isThisAEmail,
  isThisANumber,
} from "../../utils/validations";
import { formatPhoneNumber } from "../../utils/transformations";
import { allCities } from "../../utils/all-cities";

export class ClassForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validations: {},
      finalUserInput: {
        firstName: "",
        lastName: "",
        email: "",
        city: "",
        phone: ["", "", "", ""],
      },
    };
    this.user = {
      firstName: "",
      lastName: "",
      email: "",
      city: "",
      phone: ["", "", "", ""],
    };
  }

  updateValidations = (value) => {
    return this.setState(value);
  };
  updateFinalUserInput = (value) => {
    return this.setState(value);
  };
  render() {
    const validations = this.state.validations;
    const finalUserInput = this.state.finalUserInput;
    //conditions
    const { firstName, lastName, email, city, phone } =
      this.state.finalUserInput;

    const userInfoValidation = {
      firstName: isThisAFirst(firstName),
      lastName: isThisALast(lastName),
      email: isThisAEmail(email),
      city: isThisACity(city, allCities),
      phone: isThisANumber(formatPhoneNumber(phone)),
      display: "display",
    };

    const isThisAFirstName_ = !this.state.validations.firstName;
    const isThisALastName_ = !this.state.validations.lastName;
    const isThisACity_ = !this.state.validations.city;
    const isThisAEmail_ = !this.state.validations.email;
    const isThisAPhone_ = !this.state.validations.phone;

    //onsubmit
    const handleOnSubmit = (e) => {
      e.preventDefault();
      const shouldNotSubmitInformation =
        Object.values(userInfoValidation).includes(false);
      if (shouldNotSubmitInformation) {
        alert("bad Input Data");
        this.updateValidations({ validations: userInfoValidation });
      } else {
        this.props.setFinal({ final: finalUserInput });
        this.updateFinalUserInput({ finalUserInput: this.user });
        this.updateValidations({ validations: {} });
      }
    };
    //onChangeFirst
    const handleOnChangeFirst = (e) => {
      this.updateFinalUserInput({
        finalUserInput: {
          ...finalUserInput,
          firstName: e.target.value,
        },
      });

      if (this.state.validations.display?.length > 0) {
        this.updateValidations({
          validations: {
            ...validations,
            firstName: isThisAFirst(e.target.value),
          },
        });
      }
    };
    //onChangeLast
    const handleOnChangeLast = (e) => {
      this.updateFinalUserInput({
        finalUserInput: {
          ...finalUserInput,
          lastName: e.target.value,
        },
      });
      if (this.state.validations.display?.length > 0) {
        this.updateValidations({
          validations: {
            ...validations,
            lastName: isThisALast(e.target.value),
          },
        });
      }
    };
    //onChangeEmail
    const handleOnChangeEmail = (e) => {
      this.updateFinalUserInput({
        finalUserInput: {
          ...finalUserInput,
          email: e.target.value,
        },
      });
      if (this.state.validations.display?.length > 0) {
        this.updateValidations({
          validations: {
            ...validations,
            email: isThisAEmail(e.target.value),
          },
        });
      }
    };
    //onChangeCity
    const handleOnChangeCity = (e) => {
      this.updateFinalUserInput({
        finalUserInput: {
          ...finalUserInput,
          city: e.target.value,
        },
      });
      if (this.state.validations.display?.length > 0) {
        this.updateValidations({
          validations: {
            ...validations,
            city: isThisALast(e.target.value),
          },
        });
      }
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

          const updateUserInput = phone.map((phoneInput, indexInput) => {
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

          this.updateFinalUserInput({
            finalUserInput: {
              ...finalUserInput,
              phone: updateUserInput,
            },
          });

          if (this.state.validations.display?.length > 0) {
            this.updateValidations({
              validations: {
                ...validations,
                phone: isThisANumber(e.target.value),
              },
            });
          }
        }
      };
    };

    return (
      <form onSubmit={handleOnSubmit}>
        <u>
          <h3>User Information Form</h3>
        </u>
        <ClassTextInput
          props={{
            label: "First Name",
            placeHolder: "Bilbo",
            onChange: handleOnChangeFirst,
            value: firstName,
            errorMessage: classUserContentError[0].name,
            showError:
              this.state.validations.display?.length > 0
                ? isThisAFirstName_
                : false,
          }}
        />
        <ClassTextInput
          props={{
            label: "Last Name",
            placeHolder: "Baggins",
            onChange: handleOnChangeLast,
            value: lastName,
            errorMessage: classUserContentError[1].last,
            showError:
              this.state.validations.display?.length > 0
                ? isThisALastName_
                : false,
          }}
        />
        <ClassTextInput
          props={{
            label: "Email",
            placeHolder: "bilbo-baggins@adventurehobbits.net",
            onChange: handleOnChangeEmail,
            value: email,
            errorMessage: classUserContentError[2].email,
            showError:
              this.state.validations.display?.length > 0
                ? isThisAEmail_
                : false,
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
            errorMessage: classUserContentError[3].city,
            showError:
              this.state.validations.display?.length > 0 ? isThisACity_ : false,
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
          message={classUserContentError[4].number}
          show={
            this.state.validations.display?.length > 0 ? isThisAPhone_ : false
          }
        />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
