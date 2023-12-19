import {configureStore} from '@reduxjs/toolkit'
import EmailSlice from './EmailSlice'
import AuthSlice from './AuthSlice'

const store = configureStore({
    reducer:{ email: EmailSlice.reducer , auth:AuthSlice.reducer}
})

export default store