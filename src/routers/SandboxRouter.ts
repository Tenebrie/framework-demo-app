import { NumberValidator, OptionalParam, Router, useApiEndpoint, useRequestQuery } from '../framework'

const router = new Router()

router.get('/sandbox', () => {
	return {
		greeting: 'hello world',
	}
})

router.get('/random', (ctx) => {
	useApiEndpoint({
		name: 'Generate random',
		summary: 'Random endpoint',
		description: 'Return a number between two limits and given numeric system',
	})

	const { min } = useRequestQuery(ctx, {
		min: OptionalParam(NumberValidator),
	})

	return {
		data: Math.random() * (1 - (min ?? 0)) + (min ?? 0),
	}
})

export const SandboxRouter = router
