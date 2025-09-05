import { useState, ChangeEvent, FormEvent } from 'react';
interface FormOptions<T> {
  initialValues: T;
  onSubmit: (values: T, isValid: boolean) => void;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
}
export function useForm<T extends Record<string, any>>({
  initialValues,
  onSubmit,
  validate
}: FormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {
      name,
      value,
      type
    } = e.target;
    const fieldName = name as keyof T;
    // Handle different input types
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setValues(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }));
    // Clear error when field is changed
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: undefined
      }));
    }
  };
  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {
      name
    } = e.target;
    const fieldName = name as keyof T;
    setTouched(prev => ({
      ...prev,
      [fieldName]: true
    }));
    // Validate on blur if validate function exists
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
    }
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mark all fields as touched
    const allTouched = Object.keys(initialValues).reduce((acc, key) => {
      acc[key as keyof T] = true;
      return acc;
    }, {} as Record<keyof T, boolean>);
    setTouched(allTouched as Partial<Record<keyof T, boolean>>);
    // Validate all fields
    let validationErrors = {};
    if (validate) {
      validationErrors = validate(values);
      setErrors(validationErrors);
    }
    const isValid = Object.keys(validationErrors).length === 0;
    onSubmit(values, isValid);
    setIsSubmitting(false);
  };
  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues
  };
}