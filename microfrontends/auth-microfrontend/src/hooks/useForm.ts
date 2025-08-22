import React, { useState, useCallback } from "react";
import { useApiError } from "./useApiError";

export interface FormErrors {
	[key: string]: string;
}

export interface UseFormOptions<T> {
	initialValues: T;
	validate: (values: T) => FormErrors;
	onSubmit: (values: T) => Promise<void> | void;
}

export const useForm = <T extends Record<string, any>>({
	initialValues,
	validate,
	onSubmit,
}: UseFormOptions<T>) => {
	const [values, setValues] = useState<T>(initialValues);
	const [errors, setErrors] = useState<FormErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const handleApiError = useApiError();

	const handleChange = useCallback(
		(e: CustomEvent) => {
			const target = e.detail?.target as HTMLInputElement;
			if (!target) return;

			const { name, value } = target;

			setValues((prev) => ({ ...prev, [name]: value }));

			// Clear error when user starts typing
			if (errors[name]) {
				setErrors((prev) => ({ ...prev, [name]: "" }));
			}
		},
		[errors]
	);

	const handleSubmit = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();

			const formErrors = validate(values);
			setErrors(formErrors);

			if (Object.keys(formErrors).length > 0) {
				return;
			}

			setIsSubmitting(true);
			try {
				await onSubmit(values);
			} catch (error) {
				handleApiError(error);
			} finally {
				setIsSubmitting(false);
			}
		},
		[values, validate, onSubmit, handleApiError]
	);

	const reset = useCallback(() => {
		setValues(initialValues);
		setErrors({});
		setIsSubmitting(false);
	}, [initialValues]);

	return {
		values,
		errors,
		isSubmitting,
		handleChange,
		handleSubmit,
		reset,
	};
};
