import { Component } from "react";
import { DisplayErrorMessage } from "../../ErrorMessage";

export class ClassTextInput extends Component {
  render() {
    const {
      errorMessage,
      label,
      onChange,
      placeHolder,
      showError,
      value,
      type,
      list,
    } = this.props.props;

    return (
      <>
        <div className="input-wrap">
          <label>{label}:</label>
          <input
            list={list}
            placeholder={placeHolder}
            onChange={onChange}
            value={value}
            type={type}
          />
        </div>
        <DisplayErrorMessage message={errorMessage} show={showError} />
      </>
    );
  }
}
