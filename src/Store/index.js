import {configureStore} from '@reduxjs/toolkit'
import EmailSlice from './EmailSlice'
import AuthSlice from './AuthSlice'
import ModalSlice from './ModalSlice'

const store = configureStore({
    reducer:{ email: EmailSlice.reducer , auth:AuthSlice.reducer , modal:ModalSlice.reducer}
})

export default store