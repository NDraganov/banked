// FORM TYPES
declare type SignUpParams = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postCode: string;
  dateOfBirth: string;
  email: string;
  password: string;
};

declare interface signInProps {
  email: string;
  password: string;
}
