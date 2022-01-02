import 'reflect-metadata'
import { AppRouter } from '../../AppRouter'
import { MetadataKeys } from './MetadataKeys'
import { Methods } from './Methods'

export function controller(routePrefix: string) {
    return function(target: Function) {
        const router = AppRouter.getInstance()

        for (let key in target.prototype) {
            const routeHandler = target.prototype[key]            
            const path = Reflect.getMetadata(MetadataKeys.Path, target.prototype, key)
            const method: Methods = Reflect.getMetadata(MetadataKeys.Method, target.prototype, key)

            if (path) {
                router[method](routePrefix + path, routeHandler)
            }
        }
    }
}