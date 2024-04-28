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
  if (hasUpper) entropyPerChar += 5.17;
  if (hasLower) entropyPerChar += 5.17;
  if (hasNumber) entropyPerChar += 3.32;
  if (hasSpecial) entropyPerChar += 5.95;

  const totalEntropy = entropyPerChar * password.length;

  // Estimate crack time: we assume 10 billion guesses per second
  const crackTimeSeconds = Math.pow(2, totalEntropy) / 10_000_000_000;
  const crackTimeYears = crackTimeSeconds / (60 * 60 * 24 * 365);

  return [totalEntropy, crackTimeYears];
};
