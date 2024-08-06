export type ResponseDto<T> = {
	success?: boolean,
	data: T,
	message: string
}

export type ResponseErrorType<T = null> = {
	data: T
	message: string
}

export type FormResponseErrorType<ErrorsT, DataT = null> = ResponseErrorType<DataT> & {
	errors: {
		[Property in keyof ErrorsT]?: string[]
	}
}