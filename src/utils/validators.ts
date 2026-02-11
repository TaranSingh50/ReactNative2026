type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

type FormDataLogin = {
  username: string;
  password: string;
};

type Errors = Record<string, string>;

export const validateForm = (form: FormData): Errors => {
  const errors: Errors = {};

  if (!form.firstName.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!form.lastName.trim()) {
    errors.lastName = 'Last name is required';
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = 'Email is invalid';
  }

  if (!form.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^\d{10}$/.test(form.phone)) {
    errors.phone = 'Phone number is invalid';
  }

  if (!form.password) {
    errors.password = 'Password is required';
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = 'Confirm password is required';
  } else if (form.confirmPassword !== form.password) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

export const validateLoginForm = (form: FormDataLogin): Errors => {
  const errors: Errors = {};

  if (!form.username.trim()) {
    errors.username = 'Username is required';
  } 

  if (!form.password) {
    errors.password = 'Password is required';
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};

  
