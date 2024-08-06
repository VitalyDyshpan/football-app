export type GetCodeModelType = {
	subject: string
}

export type GetCodeQueryParametersType = {
	rule: "exist" | "dont_exist" | null
	type: "phone" | "email" | null
}