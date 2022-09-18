import { IAuthResponse, ITokens } from './../../store/user/user.interface'

export const saveTokensStorage = (data: ITokens) => {}

export const saveToStorage = (data: IAuthResponse) => {
	localStorage.setItem('user', JSON.stringify(data.user))
}
