export const capitalize = (string) => {
  const lowerCase = [...string].map((char) => {
    return char.toLowerCase();
  });
  lowerCase[0] = lowerCase[0].toUpperCase();
  return lowerCase.join("");
};

export const formatPhoneNumber = (userPhoneInputs) => {
  return `${userPhoneInputs[0]}-${userPhoneInputs[1]}-${userPhoneInputs[2]}-${userPhoneInputs[3]}`;
};
