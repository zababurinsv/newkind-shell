import api from './modules/api/api.mjs'
import isEmpty from "./modules/isEmpty/isEmpty.mjs";
export default (debug = true, peer = '',initiator = undefined) => {
    return new Promise(async (resolve, reject) => {
        try {
            let object = { }
            object.params = { }
            object.api = { }
            object.params.debug = debug
            object.params.recipient = false
            object.params.initiator = false
            object.params.location = false
            object.params.id = false
            object.api = await api(object)
            resolve(new Proxy(object.api,{
                get: (obj, prop) => {
                    switch (prop) {
                        case 'params':
                            return object[prop];
                            break
                        default:
                            break
                    }
                    if(object.params.debug) {
                        console.log({
                            _:'proxy get',
                            prop:prop,
                            obj:obj,
                            value:obj[prop]
                        })
                    }
                    return obj[prop];
                },
                set: (obj, prop, value) => {
                    if(object.params.debug) {
                        console.log({
                            _:'proxy set',
                            prop:prop,
                            obj:obj,
                            value:value
                        })
                    }
                    if(isEmpty(obj[prop])){
                        obj[prop] = []
                    }
                    obj[prop] = value;
                    return true
                }}))
        } catch (e) {
            resolve({
                message: e.message,
                success: true,
                status: true
            })
        }
    })
}