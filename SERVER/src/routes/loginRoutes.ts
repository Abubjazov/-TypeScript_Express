import { NextFunction, Request, Response, Router } from 'express'

interface RequestWithBody extends Request {
    body: { [key: string]: string | undefined }
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
    if (req.session && req.session.loggedIn) {
        next()
        return
    }
    
    res.status(403)
    res.send('Access denied')
}

const router = Router()

router.get('/', (req: Request, res: Response) => {
    if (req.session && req.session.loggedIn) {
        res.send(`
        <div>
            <h1>Welcome to our website ${req.session.login}</h1>
            <hr>
            <p>You are logged in</p>
            <a href="/auth/logout">Logout</a>     
        </div>
        `)
    } else {
        res.send(`
        <div>
            <h1>Sorry</h1>
            <hr>
            <p>You are not logged in</p>
            <a href="/auth/login">Login</a>     
        </div>
        `)
    }
})

router.get('/protected', requireAuth, (req: Request, res: Response) => {
    res.send('Welcome to protected route, logged in user')
})

export { router }
