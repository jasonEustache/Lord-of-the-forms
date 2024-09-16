import { formatPhoneNumber } from "./transformations";

export function isEmailValid(emailAddress) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}
export const includesNumber = (string) => {
  return [...string].filter((char) => {
    if (char > 0) {
      return char;
    }
  });
};

export const excludesNumber = (string) => {
  const capLetters = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
  const toLowerCase = "abcdefghijklmnopqrstuvwxyz";
  return [...string].filter((char) => {
    if (capLetters.includes(char) || toLowerCase.includes(char)) {
      return char;
    }
  });
};
//static submission
export const isThisAFirst = (finalUserInput) => {
  const isFirst =
    !includesNumber(finalUserInput)?.length > 0 &&
    excludesNumber(finalUserInput)?.length - 1 >= 1;
  return isFirst;
};

export const isThisALast = (finalUserInput) => {
  const isLast =
    !includesNumber(finalUserInput)?.length > 0 &&
    excludesNumber(finalUserInput)?.length - 1 >= 1;
  return isLast;
};

export const isThisANumber = (phoneSlugged) => {
  const phoneWithSlug = phoneSlugged;
  const isThisAPhone = phoneWithSlug?.length === 10;
  return isThisAPhone;
};

export const isThisACity = (finalUserInput, allCities) => {
  return allCities.includes(finalUserInput);
};

export const isThisAEmail = (finalUserInput) => {
  return isEmailValid(finalUserInput);
};
