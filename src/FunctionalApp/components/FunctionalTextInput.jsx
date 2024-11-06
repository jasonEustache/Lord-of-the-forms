import { DisplayErrorMessage } from "../../ErrorMessage";

export const FunctionalTextInput = ({ props }) => {
  const {
    label,
    placeHolder,
    value,
    handleOnChange,
    errorMessage,
    showError,
    type,
    list,
  } = props;

  return (
    <>
      <div className="input-wrap">
        <label>{label}:</label>
        <input
          type={type ? type : ""}
          list={list ? list : ""}
          placeholder={placeHolder}
          value={value}
          onChange={handleOnChange}
        />
      </div>
      <DisplayErrorMessage message={errorMessage} show={showError} />
    </>
  );
};
