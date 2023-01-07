import {
	BadRequestError,
	EmailString,
	NonEmptyStringValidator,
	Router,
	UnauthorizedError,
	useApiEndpoint,
	useRequestBody,
} from 'tenebrie-framework'

import { TokenService } from '../services/TokenService'
import { UserService } from '../services/UserService'

const router = new Router()

router.post('/auth', (ctx) => {
	useApiEndpoint({
		name: 'createAccount',
		summary: 'Registration endpoint',
		description: 'Creates a new user account with provided credentials',
	})

	const body = useRequestBody(ctx, {
		email: EmailString,
		username: NonEmptyStringValidator,
		password: NonEmptyStringValidator,
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
		password: NonEmptyStringValidator,
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
