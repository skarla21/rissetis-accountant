import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCurrentDate = () => {
  const date = new Date();
  const formattedDate = `${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${date
    .getDate()
    .toString()
    .padStart(2, "0")}.${date.getFullYear()}`;

  return formattedDate;
};
