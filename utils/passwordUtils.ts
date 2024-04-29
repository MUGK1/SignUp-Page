export const calculatePasswordStrength = (
  password: string,
): [number, number] => {
  const upperCase = /[A-Z]/;
  const lowerCase = /[a-z]/;
  const number = /[0-9]/;
  const specialChars = /[!@#$%^&*()\-_=+[\]{};:'",.<>?]/;

  const hasUpper = upperCase.test(password);
  const hasLower = lowerCase.test(password);
  const hasNumber = number.test(password);
  const hasSpecial = specialChars.test(password);

  let entropyPerChar = 0;
  let charTypesCount = 0;

  if (hasUpper) {
    entropyPerChar += 5.17;
    charTypesCount++;
  }
  if (hasLower) {
    entropyPerChar += 5.17;
    charTypesCount++;
  }
  if (hasNumber) {
    entropyPerChar += 3.32;
    charTypesCount++;
  }
  if (hasSpecial) {
    entropyPerChar += 5.95;
    charTypesCount++;
  }

  const totalEntropy = (entropyPerChar * password.length) / charTypesCount;

  const crackTimeSeconds = Math.pow(2, totalEntropy) / 10_000_000_000;
  const crackTimeYears = crackTimeSeconds / (60 * 60 * 24 * 365);

  return [totalEntropy, crackTimeYears];
};

export const generateStrongPassword = (): string => {
  const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specialCharacters = "!@#$%^&*()-_=+[]{};:'\",.<>?";

  const allChars =
    upperCaseLetters + lowerCaseLetters + numbers + specialCharacters;
  const charSetSize = allChars.length;

  const requiredEntropy = 130;
  const minLength = Math.ceil(requiredEntropy / Math.log2(charSetSize));

  const getRandomChar = (): string => {
    const randomIndex =
      crypto.getRandomValues(new Uint32Array(1))[0] % allChars.length;
    return allChars[randomIndex];
  };

  let password = "";
  for (let i = 0; i < minLength; i++) {
    password += getRandomChar();
  }

  return password;
};
