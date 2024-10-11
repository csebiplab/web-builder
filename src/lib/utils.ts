import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export function getCapitalLettersOfName(name: string) {
  const splitted = name.split(" ");

  if (splitted.length > 1) {
    const firstLetter = splitted[0].charAt(0);
    const lastLetter = splitted[1].charAt(0);

    const capitalLetters = (firstLetter + lastLetter).toLocaleUpperCase();

    return capitalLetters;
  } else {
    const firstLetter = name[0];
    const lastLetter = name.at(-1);

    const capitalLetters = (firstLetter + lastLetter).toLocaleUpperCase();

    return capitalLetters;
  }
}

export function errorMessage(error: {
  response: { data: { message: any } };
  request: { message: any };
  message: any;
}) {
  return (
    error?.response?.data?.message ||
    error?.request?.message ||
    error?.message ||
    "ERROR MESSAGE"
  );
}
