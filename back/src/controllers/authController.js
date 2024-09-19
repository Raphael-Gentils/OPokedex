import { User } from '../models/User.js';
import { Scrypt } from '../auth/Scrypt.js';

const authController = {
	async signup(req, res, next) {
		const { email, password } = req.body;
		try {
			const existingUser = await User.findOne({ where: { email } });
			if (existingUser) {
				return res.status(400).json({ message: 'Email already in use' });
			}

			const hashedPassword = Scrypt.hash(password);
			const user = await User.create({ email, password: hashedPassword });

			req.session.user = { id: user.id, email: user.email };
			res.status(201).json({ message: 'User created successfully' });
		} catch (error) {
			return next(error);
		}
	},

	async login(req, res, next) {
		const { email, password } = req.body;
		try {
			const user = await User.findOne({ where: { email } });
			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}

			const isMatch = Scrypt.compare(password, user.password);
			if (!isMatch) {
				return res.status(400).json({ message: 'Invalid credentials' });
			}

			req.session.user = { id: user.id, email: user.email };
			res.json({ message: 'Login successful' });
		} catch (error) {
			return next(error);
		}
	},

	logout(req, res, next) {
		req.session.destroy(() => {
			res.clearCookie('connect.sid');
			res.json({ message: 'Logout successful' });
		});
	},
};

export { authController };
