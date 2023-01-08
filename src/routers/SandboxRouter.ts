import { Router } from 'tenebrie-framework'

const router = new Router()

router.get('/sandbox', (ctx) => {
	return {
		greeting: 'hello world',
	}
})

export const SandboxRouter = router
