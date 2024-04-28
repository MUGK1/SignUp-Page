import Image from "next/image";
import { useEffect, useState } from "react";
import correct from "../../public/svg/correct.svg";
import wrong from "../../public/svg/wrong.svg";

function PasswordRules({ password }: { password: string }) {
  const [isAtLeast8, setIsAtLeast8] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [isCommonPassword, setIsCommonPassword] = useState(false);

  const checkPassword = (password: string) => {
    if (password.length >= 8) {
      setIsAtLeast8(true);
    } else {
      setIsAtLeast8(false);
    }
    if (/\d/.test(password)) {
      setHasNumber(true);
    } else {
      setHasNumber(false);
    }
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setHasSpecialChar(true);
    } else {
      setHasSpecialChar(false);
    }
    if (/[A-Z]/.test(password)) {
      setHasUpperCase(true);
    } else {
      setHasUpperCase(false);
    }
    if (/[a-z]/.test(password)) {
      setHasLowerCase(true);
    } else {
      setHasLowerCase(false);
    }
    if (
      password === "123456" ||
      password === "password" ||
      password === "123456789" ||
      password === "12345678" ||
      password === "12345" ||
      password === "1234567" ||
      password === "1234567890" ||
      password === "123123" ||
      password === "000000" ||
      password === "qwert" ||
      password === "abc123" ||
      password === "password1"
    ) {
      setIsCommonPassword(true);
    } else {
      setIsCommonPassword(false);
    }
  };

  useEffect(() => {
    checkPassword(password);
  }, [password]);

  return (
    <div className="border border-primary rounded p-3 mt-4">
      <h2 className="font-bold text-xl mb-3">Password Rules</h2>
      <ul className="grid grid-cols-2 gap-y-2">
        <li className="flex gap-2">
          {isAtLeast8 ? (
            <Image src={correct} alt="correct" width={18} height={18} />
          ) : (
            <Image src={wrong} alt="wrong" width={18} height={18} />
          )}
          Must be at least 8 characters long
        </li>
        <li className="flex gap-2">
          {hasNumber ? (
            <Image src={correct} alt="correct" width={18} height={18} />
          ) : (
            <Image src={wrong} alt="wrong" width={18} height={18} />
          )}
          Must contain at least one number
        </li>
        <li className="flex gap-2">
          {hasSpecialChar ? (
            <Image src={correct} alt="correct" width={18} height={18} />
          ) : (
            <Image src={wrong} alt={"wrong"} width={18} height={18} />
          )}
          Must contain at least one special character
        </li>
        <li className="flex gap-2">
          {hasUpperCase ? (
            <Image src={correct} alt="correct" width={18} height={18} />
          ) : (
            <Image src={wrong} alt="wrong" width={18} height={18} />
          )}
          Must contain at least one uppercase letter
        </li>
        <li className="flex gap-2">
          {hasLowerCase ? (
            <Image src={correct} alt="correct" width={18} height={18} />
          ) : (
            <Image src={wrong} alt="wrong" width={18} height={18} />
          )}
          Must contain at least one lowercase letter
        </li>
        <li className="flex gap-2">
          {!isCommonPassword ? (
            <Image src={correct} alt="correct" width={18} height={18} />
          ) : (
            <Image src={wrong} alt="wrong" width={18} height={18} />
          )}
          No Common Passwords ex. 123456, qwert
        </li>
      </ul>
    </div>
  );
}

export default PasswordRules;
