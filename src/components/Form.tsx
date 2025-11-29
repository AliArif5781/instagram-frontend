import React, { useEffect, useState } from "react";
// import Dropdown from "./Dropdown";

export interface FormSchema {
  name: string;
  type: "text" | "number" | "email" | "password" | "dropdown" | "file";
  label?: string;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  validation?: (value: string) => string;
}

interface FormProps {
  schema: FormSchema[];
  onSubmit: (data: Record<string, string>) => void;
  resetSubmit?: boolean;
  initialValues?: Record<string, string>;
}

const Form = ({ schema, onSubmit, resetSubmit, initialValues }: FormProps) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form with initialValues
  useEffect(() => {
    if (initialValues && Object.keys(initialValues).length > 0) {
      setValues(initialValues);
    }
  }, [initialValues]);

  const handleChange = (name: any, value: any) => {
    // console.log(name, value, "========= name,value");
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error when typing
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let formIsValid = true;

    schema.forEach((field) => {
      const { name, validation, required } = field;

      const value = values[name] || "";
      // required validation
      if (required && !value) {
        setErrors((prev) => ({
          ...prev,
          [name]: `${name} is required`,
        }));
        formIsValid = false;
        return;
      }

      // custom validation
      if (validation) {
        const error = validation(value);
        if (error) {
          setErrors((prev) => ({ ...prev, [name]: error }));
          formIsValid = false;
          return;
        }
      }

      // clear error if no problem
      setErrors((prev) => ({ ...prev, [name]: "" }));
    });

    if (formIsValid) {
      onSubmit(values);
    }

    // Reset form if resetAfterSubmit is true
    if (resetSubmit) {
      setValues({});
      setErrors({});
    }
  };

  return (
    <form id="login-form" onSubmit={handleSubmit} className="space-y-4">
      {schema.map((field, index) => (
        <div key={index} className="flex flex-col">
          {field.label && (
            <label htmlFor={field.name} className="mb-1 font-medium text-white">
              {field.label}
            </label>
          )}

          {field.type === "file" ? (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleChange(field.name, e.target.files[0]);
                }
              }}
              className="text-white"
            />
          ) : (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              value={values[field.name] || ""}
              // required={field.required}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className={`border rounded px-3 py-2 outline-none text-white  ${
                errors[field.name] ? "border-red-500" : "border-slate-700"
              } ${[field.name === "username" ? "lowercase" : ""]}

            `}
            />
          )}

          {/* 👇 show error message */}
          {errors[field.name] && (
            <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
          )}
        </div>
      ))}
    </form>
  );
};

export default Form;
