import type { FormSchema } from "../../../components/Form";

export const sendMessageSchema: FormSchema[] = [
  {
    name: "message",
    label: "",
    type: "text",
    required: true,
    placeholder: "Write something",
    validation: (value: string) => {
      if (!value?.trim()) {
        return "Message cannot be empty";
      }
      return ""; // Empty string instead of null
    },
  },
];
