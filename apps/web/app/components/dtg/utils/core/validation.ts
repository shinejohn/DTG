/**
 * Validation utilities for form inputs and data
 */
// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
// Password strength validation
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  return {
    isValid: errors.length === 0,
    errors
  };
}
// URL validation
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}
// Phone number validation (US format)
export function isValidPhoneNumber(phoneNumber: string): boolean {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phoneRegex.test(phoneNumber);
}
// Required field validation
export function isRequired(value: any): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}
// Min/max length validation
export function validateLength(value: string, min: number, max?: number): boolean {
  if (value.length < min) return false;
  if (max !== undefined && value.length > max) return false;
  return true;
}
// Number range validation
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}
// Form validation helper
export function validateForm<T extends Record<string, any>>(values: T, validations: Record<keyof T, (value: any) => boolean | string>): Record<keyof T, string | undefined> {
  const errors: Partial<Record<keyof T, string>> = {};
  Object.entries(validations).forEach(([field, validate]) => {
    const key = field as keyof T;
    const result = validate(values[key]);
    if (typeof result === 'string') {
      errors[key] = result;
    } else if (result === false) {
      errors[key] = 'Invalid value';
    }
  });
  return errors as Record<keyof T, string | undefined>;
}