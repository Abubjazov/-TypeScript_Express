import { Request, Response, Router } from 'express';

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.send(`
        <div>
            <h1> Hello!!! ) </h1>        
        </div>
        `
    )
})

export { router }
