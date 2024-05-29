const panelRegisterValidationSchema = {
  name: {
    exists: {
      errorMessage: "Name is required",
      options: { checkFalsy: true },
    },
    trim: true,
    isString: { errorMessage: "Name should be a string" },
    isLength: {
      options: {
        min: 5,
      },
      errorMessage: "Minimum name length is 5",
    },
  },
  email: {
    exists: {
      errorMessage: "Email is required",
      options: { checkFalsy: true },
    },
    trim: true,
    isEmail: { errorMessage: "Valid email is required" },
  },
  phone: {
    exists: {
      errorMessage: "Phone is required",
      options: { checkFalsy: true },
    },
    trim: true,
    isMobilePhone: {
      errorMessage: "Valid Phone Required",
    },
  },
  password: {
    exists: {
      errorMessage: "Password is required",
      options: { checkFalsy: true },
    },
    isLength: {
      options: {
        min: 4,
      },
      errorMessage: "Minimum password length is 4",
    },
  },
};

module.exports = { panelRegisterValidationSchema };
