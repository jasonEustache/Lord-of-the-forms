const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const userContentErrors = [
  { name: firstNameErrorMessage, show: false },
  { last: lastNameErrorMessage, show: false },
  { email: emailErrorMessage, show: false },
  { city: cityErrorMessage, show: false },
  { number: phoneNumberErrorMessage, show: false },
];
