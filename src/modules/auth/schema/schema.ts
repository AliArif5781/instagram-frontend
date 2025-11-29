import type { FormSchema } from "../../../components/Form";

export const signupSchema: FormSchema[] = [
  {
    name: "fullName",
    label: "fullName",
    type: "text",
    required: true,
    placeholder: "fullName",
  },
  {
    name: "username",
    label: "Username",
    type: "text",
    required: true,
    placeholder: "username",
    validation: (value: any) => {
      if (value.length < 3 || value.length > 32) {
        return "username must me between 3 to 32 character";
      }
      return "";
    },
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "Enter your email",
    validation: (value: any) => {
      if (!value.includes("@")) {
        return "Please enter a valid email";
      }
      return "";
    },
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
    placeholder: "Enter your password",
    validation: (value: any) => {
      if (value.length < 8) {
        return "Password must be at least 8 characters long";
      }
      return "";
    },
  },
  {
    name: "profileImage",
    type: "file",
    label: "Profile Image",
    // required: true,
  },
];

export const LoginSchema: FormSchema[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "Enter your email",
    validation: (value) => {
      if (!value.includes("@")) {
        return "Please enter a valid email";
      }
      return "";
    },
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
    placeholder: "Enter your password",
    validation: (value) => {
      if (value.length < 8) {
        return "Password must be at least 8 characters long";
      }
      return "";
    },
  },
];
