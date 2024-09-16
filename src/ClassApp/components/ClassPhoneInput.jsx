import { Component } from "react";

export class ClassPhoneInput extends Component {
  render() {
    const { handleOnChangePhone, id, placeholder, value, ref } =
      this.props.props;
    return (
      <>
        <input
          ref={ref}
          type="text"
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={handleOnChangePhone}
        />
      </>
    );
  }
}
