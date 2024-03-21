import {
	NumberValidator,
	RequiredParam,
	Router,
	UnauthorizedError,
	useExposeApiModel,
	useHeaderParams,
	useQueryParams,
} from 'moonflower'

const router = new Router()

router.get('/examples/headers', (ctx) => {
	const headers = useHeaderParams(ctx, {
		'x-basic-authentication': RequiredParam<{ username: string; password: string }>({
			rehydrate: (v) => JSON.parse(v ?? ''),
			validate: (v) => (v.username?.length ?? 0) > 0 && (v.password?.length ?? 0) > 0,
			description: "Basic authentication header, includes 'username' and 'password'.",
			errorMessage: "Must provide 'username' and 'password'.",
		}),
	})

	const { username, password } = headers.xBasicAuthentication

	if (username !== 'foo' || password !== 'bar') {
		throw new UnauthorizedError(`User must be 'foo', password must be 'bar'.`)
	}

	return {
		secretKey: 'qwerty123',
	}
})

type NumberBase = 'bin' | 'dec' | 'hex'

useExposeApiModel<NumberBase>()

router.get('/examples/convertNumber', (ctx) => {
	const query = useQueryParams(ctx, {
		value: NumberValidator,
		base: RequiredParam<NumberBase>({
			rehydrate: (v) => v as NumberBase,
			validate: (v) => v === 'bin' || v === 'dec' || v === 'hex',
			description: "'bin', 'dec' or 'hex'",
		}),
	})

	const radix = (() => {
		switch (query.base) {
			case 'bin':
				return 2
			case 'dec':
				return 10
			case 'hex':
				return 16
		}
	})()

	return {
		originalValue: query.value,
		convertedValue: query.value.toString(radix),
		radix,
	}
})

export const ExamplesRouter = router
