export const FunctionalPhoneInput = ({ props }) => {
  const { handleOnChange, id, ref, placeHolder, value } = props;

  return (
    <>
      <input
        onChange={handleOnChange}
        type="text"
        id={id}
        ref={ref}
        placeholder={placeHolder}
        value={value}
      />
    </>
  );
};
