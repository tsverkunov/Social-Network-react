//to Form-Redux======================================
// export const required = value => {
//     if (value) return undefined;
//     return "Field is required";
// }

const maxLength = max => value =>
   value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const maxLength35 = maxLength(35);

const minLength = min => value =>
   value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength2 = minLength(2);
export const minLength4 = minLength(4);

export const email = value =>
   value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ? 'Invalid email address'
      : undefined


//to Formik=====================================

const validateEmail = (min, max) => value => {
  if (!value) {
    return 'Field is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  } else if (value.length < min) {
    return `Must be ${min} characters or more`
  } else if (value.length > max) {
    return `Must be ${max} characters or less`
  }
}
export const validateEmail235 = validateEmail(2, 35);

const validate = (min, max) => value => {
  if (!value) {
    return 'Field is required';
  } else if (value.length < min) {
    return `Must be ${min} characters or more`
  } else if (value.length > max) {
    return `Must be ${max} characters or less`
  }
}

export const validate28 = validate(2, 8);
export const validate835 = validate(8, 35);


// new to Formik

export const required = value => {
  if (!value) {
    return 'Required';
  }
}