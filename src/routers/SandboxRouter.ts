import { Router } from '../framework'

const router = new Router()

router.get('/sandbox', () => {
	return {
		greeting: 'hello world',
	}
})

export const SandboxRouter = router
