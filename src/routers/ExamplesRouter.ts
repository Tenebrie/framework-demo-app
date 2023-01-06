import { RequiredParam, Router, UnauthorizedError, useHeaderParams } from 'tenebrie-framework'

const router = new Router()

router.get('/examples/headers', (ctx) => {
	const headers = useHeaderParams(ctx, {
		'x-basic-authentication': RequiredParam<{ username: string; password: string }>({
			rehydrate: (v) => JSON.parse(v),
			validate: (v) => (v.username?.length ?? 0) > 0 && (v.password?.length ?? 0) > 0,
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

export const ExamplesRouter = router
