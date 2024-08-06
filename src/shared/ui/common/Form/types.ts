import type { ZodIssue, ZodType , z } from "zod";
import type { VForm } from "./index";
import type { MaybeRef } from "vue";

export type ValidationSchemaType<T> = {
	[Property in keyof Partial<T>]: ZodType<T[Property]> | ZodType<Partial<T>[Property]>
}

export type FormInstance = InstanceType<typeof VForm>

export type FormItemContextType = {
	isErrorField: MaybeRef<boolean>,
	validateField: () => Promise<void>
}

export type FormContextType = {
	validationErrors: MaybeRef<ZodIssue[] | undefined>
	model: MaybeRef<Record<string, unknown> | undefined> | undefined
	rules: MaybeRef<ValidationSchemaType<Record<string, unknown>> | undefined> | undefined
	formValidationSchema: MaybeRef<z.ZodObject<ValidationSchemaType<Record<string, unknown>>> | undefined>
	setValidationError: (error: ZodIssue[] | undefined) => void
	removeValidationError: (prop: string) => void
}