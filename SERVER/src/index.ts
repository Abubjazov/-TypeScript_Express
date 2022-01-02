import cookieSession from 'cookie-session'
import express from 'express'
import { AppRouter } from './AppRouter'
import './controllers/LoginController'
import './controllers/RootController'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(cookieSession({ keys: ['dghd53554354tgdfdgf'] }))
app.use(AppRouter.getInstance())

app.listen(3000, () => {
    console.log('Server started on port: 3000')
})
