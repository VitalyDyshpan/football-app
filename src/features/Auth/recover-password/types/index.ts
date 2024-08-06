export type NewPasswordModelType = {
	password: string
	password_confirmation: string
	phone: string
	code: string
}

export type RecoverPasswordRequestDto = NewPasswordModelType