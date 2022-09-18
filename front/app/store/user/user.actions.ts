import { createAsyncThunk } from '@reduxjs/toolkit'

import { IAuthResponse, IEmailPassword } from './user.interface'

//reg
export const register = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'auth/register',
	async ({ email, password }, thunkApi) => {
        try {
            const response await
        } catch (error) {
            
        }
    }
)
//login
//logout
//check
