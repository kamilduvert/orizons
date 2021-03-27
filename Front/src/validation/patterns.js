const validationPatterns = {
  textOnlyPattern: /^[A-Za-z0-9\-\s]+$/,
  passwordPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  alphanumPattern: /^[a-zA-Z\d]{6,}$/,
};

module.exports = validationPatterns;
