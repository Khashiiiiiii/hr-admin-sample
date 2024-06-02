"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

const Error = () => {
  useEffect(() => {
    signOut();
  }, []);

  return <div>۵۰۵ مشکل در سرور</div>;
};

export default Error;
