import type { FormSchema } from "../../../components/Form";

export const createPostSchema: FormSchema[] = [
  {
    name: "caption",
    label: "caption",
    type: "text",
    required: true,
    placeholder: "Enter your caption",
  },
];

export const UserProfileSchema: FormSchema[] = [
  {
    name: "fullName",
    label: "fullName",
    type: "text",
    required: true,
    placeholder: "Enter your fullName",
  },
  {
    name: "username",
    label: "username",
    type: "text",
    required: true,
    placeholder: "Enter your username",
  },
  {
    name: "email",
    label: "email",
    type: "email",
    required: true,
    placeholder: "Enter your email",
  },
  {
    name: "bio",
    label: "bio",
    type: "text",
    required: false,
    placeholder: "Enter your bio",
  },
];

export const formSchema: FormSchema[] = [
  {
    name: "fullName",
    type: "text",
    label: "Full Name",
    placeholder: "Enter your full name",
    required: false,
    validation: (value: string) => {
      if (value.length > 50) {
        return "Full name must be less than 50 characters";
      }
      return "";
    },
  },
  {
    name: "username",
    type: "text",
    label: "Username",
    placeholder: "Enter username",
    required: true,
    validation: (value: string) => {
      if (!value.trim()) {
        return "Username is required";
      }
      if (value.length < 3) {
        return "Username must be at least 3 characters";
      }
      if (value.length > 20) {
        return "Username must be less than 20 characters";
      }
      if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        return "Username can only contain letters, numbers and underscores";
      }
      return "";
    },
  },
  {
    name: "bio",
    type: "text",
    label: "Bio",
    placeholder: "Tell something about yourself...",
    required: false,
    validation: (value: string) => {
      if (value.length > 30) {
        return "Bio must be less than 15 characters";
      }
      return "";
    },
  },
  {
    name: "City",
    type: "text",
    label: "City",
    placeholder: "In Which city you live",
    required: false,
    validation: (value: string) => {
      if (value.length > 168) {
        return "City must be less than 168 characters";
      }
      return "";
    },
  },
  {
    name: "Country",
    type: "text",
    label: "Country",
    placeholder: "In Which Country you live",
    required: false,
    validation: (value: string) => {
      if (value.length > 56) {
        return "Country must be less than 56 characters";
      }
      return "";
    },
  },
];
