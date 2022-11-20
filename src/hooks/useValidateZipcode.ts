import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from "postcode-validator";

export const validateZipcode = (address: {
  zipcode: string;
  country: string;
}) => {
  if (postcodeValidatorExistsForCountry(address.country)) {
    return postcodeValidator(address.zipcode, address.country);
  }
  return true;
};
