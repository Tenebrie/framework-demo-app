import { UserService } from '../services/UserService'
import { TokenService } from '../services/TokenService'
import {
	BadRequestError,
	EmailString,
	NonEmptyString,
	Router,
	UnauthorizedError,
	useApiEndpoint,
	useRequestBody,
} from '@src/framework'

const router = new Router()

router.post('/auth', (ctx) => {
	useApiEndpoint({
		name: 'createAccount',
		summary: 'Registration endpoint',
		description: 'Creates a new user account with provided credentials',
	})

	const body = useRequestBody(ctx, {
		email: EmailString,
		username: NonEmptyString,
		password: NonEmptyString,
	})

	const existingUser = UserService.findByEmail(body.email)
	if (existingUser) {
		throw new BadRequestError('User already exists')
	}

	const user = UserService.register(body.email, body.username, body.password)
	const token = TokenService.generateJwtToken(user)

	return {
		accessToken: token,
	}
})

router.post('/auth/login', (ctx) => {
	useApiEndpoint({
		name: 'postLogin',
		summary: 'Login endpoint',
		description: 'Exchanges user credentials for a JWT token',
	})

	const body = useRequestBody(ctx, {
		email: EmailString,
		password: NonEmptyString,
	})

	const user = UserService.login(body.email, body.password)
	if (!user) {
		throw new UnauthorizedError('Email or password do not match')
	}

	const token = TokenService.generateJwtToken(user)

	return {
		accessToken: token,
	}
})

export const AuthRouter = router
