import { axiosClassic } from 'api/interceprors'

import { getAuthUrl } from '@/config/api.config'

import { IAuthResponse } from './../../store/user/user.interface'

export const AuthService = {
	async register(email: string, password: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('/register'),
			{ email, password }
		)
		if (response.data.accesToken) {
			console.log('jija')
		}
		//save
		return response
	},
}
