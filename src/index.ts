import 'module-alias/register'

import Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import { HttpErrorHandler, initOpenApiEngine, useApiHeader } from 'moonflower'

import { AuthRouter } from './routers/AuthRouter'
import { ExamplesRouter } from './routers/ExamplesRouter'
import { SandboxRouter } from './routers/SandboxRouter'

const app = new Koa()

useApiHeader({
	title: 'Framework Demo App',
	description: 'This is a description field',
	termsOfService: 'https://example.com',
	contact: {
		name: 'Tenebrie',
		url: 'https://github.com/tenebrie',
		email: 'tianara@tenebrie.com',
	},
	license: {
		name: 'MIT',
		url: 'https://example.com',
	},
	version: '1.0.0',
})

app
	.use(HttpErrorHandler)
	.use(
		bodyParser({
			enableTypes: ['text', 'json', 'form'],
		})
	)
	.use(AuthRouter.routes())
	.use(AuthRouter.allowedMethods())
	.use(ExamplesRouter.routes())
	.use(ExamplesRouter.allowedMethods())
	.use(SandboxRouter.routes())
	.use(SandboxRouter.allowedMethods())
	.use(
		initOpenApiEngine({
			tsconfigPath: './tsconfig.json',
		})
	)

app.listen(3000)
console.info('Server up')
