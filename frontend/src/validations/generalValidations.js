export const isInvalidInput = (errors, name) => {
  if (errors && errors[name]) {
    return true;
  }
  return false;
};

export function isValidPhone(string = "") {
  const regEx = /^(\()?\d{3}-?(\))?\d{3}-?\d{4}$/;
  if (string && string.match(regEx)) return true;
  else return false;
}

export const hasEnoughLength = (string, minimunCount) => {
  if (string?.length >= minimunCount) return true;
  else return false;
};
export const istNullOrEmpty = (string) => {
  if (string?.trim()?.length == 0 || string==null) return true;
  else return false;
};
export const isGreaterThanZero = (num) => {
  if (num>0) return true;
  else return false;
};
