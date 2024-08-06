export type GetCodeForRegistrationModelType = {
	subject: string
	agreeProcessing: boolean
	agreeConfidencePolicy: boolean
}

export type RegisterModelType = {
	first_name: string | undefined
	last_name: string | undefined
	middle_name: string | undefined
	password: string
	password_confirmation: string
	phone?: string
	email?: string
	code: string
}