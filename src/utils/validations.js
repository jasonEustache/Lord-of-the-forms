export const isNameValid = (name) => {
  const reg = /^[a-z]+$/i;
  return reg.test(name) && name.length - 1 >= 1 ? true : false;
};

export const isNumberValid = (phoneSlugged) => {
  return phoneSlugged?.length === 10;
};

export const isCityValid = (city, allCities) => {
  return allCities.includes(city);
};

export function isEmailValid(emailAddress) {
  return !!emailAddress.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
}
