import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import localFont from "next/font/local";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const iranYekan = localFont({
  src: [
    {
      path: "../public/fonts/IRANYekanX-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/fonts/IRANYekanX-Bold.ttf",
      style: "bold",
      weight: "700",
    },
  ],
});
