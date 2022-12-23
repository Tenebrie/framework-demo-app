export type User = {
	id: string
	email: string
	username: string
	password: string
}

const database: User[] = []

export const UserService = {
	findByEmail: (email: string): User | null => {
		return database.find((user) => user.email === email) ?? null
	},

	register: (email: string, username: string, password: string): User => {
		const user = {
			id: String(Math.random() * 100000),
			email,
			username,
			password,
		}
		database.push(user)
		return user
	},

	login: (email: string, password: string): User | null => {
		const user = UserService.findByEmail(email)
		if (!user) {
			return null
		}

		if (user.password === password) {
			return user
		}
		return null
	},
}
