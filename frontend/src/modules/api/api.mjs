import store from '../store/index.mjs'
import signal from '../signal/eventSource.mjs'
import config from '../../../../config/config.mjs'
export default (object = {}) => {
    return new Promise(async (resolve, reject) => {
        resolve({
            peer: async (id) => {
                try {
                    object.params.id = id
                    resolve({
                        status: true,
                        success: true,
                        message: object.api
                    })
                } catch (e) {
                    resolve({
                        status: false,
                        success: false,
                        message: e
                    })
                }
            },
            role: async (role) => {
                try {
                    switch (role) {
                        case `${config.role.initiator}`:
                            object.params.initiator = true
                            break
                        case `${config.role.recipient}`:
                            object.params.recipient = true
                            break
                        default:
                            console.warn('неизвестная роль', role)
                            break
                    }
                    resolve({
                        status: true,
                        success: true,
                        message: object.api
                    })
                } catch (e) {
                    resolve({
                        status: false,
                        success: false,
                        message: e
                    })
                }
            },
            await: async (oldPath, newPath) => {
                try {
                    let Await = await fs.symlink(oldPath, newPath);
                    resolve({
                        status: true,
                        success: true,
                        message: Await
                    })
                } catch (e) {
                    resolve({
                        status: false,
                        success: false,
                        message: e
                    })
                }
            },
            connect: async (signal) => {
                try {
                    let connect = ''
                    resolve({
                        status: true,
                        success: true,
                        message: connect
                    })
                } catch (e) {
                    resolve({
                        status: false,
                        success: false,
                        message: e
                    })
                }
            },
            request: async (type = {}, params = {}, dir = '/newKind') => {
                try {
                    let request = await fs.mount(type, params, dir)
                    resolve({
                        status: true,
                        success: true,
                        message: request
                    })
                } catch (e) {
                    resolve({
                        status: false,
                        success: false,
                        message: e
                    })
                }
            },
            call: async (mountPoint = '/newKind') => {
                try {
                    let unmount = await fs.call(mountPoint)
                    resolve({
                        status: true,
                        success: true,
                        message: call
                    })
                } catch (e) {
                    resolve({
                        status: false,
                        success: false,
                        message: e
                    })
                }
            },
            UpCall: (path) => {
                return new Promise(async (resolve, reject) => {
                    try {
                        let UpCall = await fs.mkdir(path)
                        resolve({
                            status: true,
                            success: true,
                            message: UpCall
                        })
                    }catch (e) {
                        resolve({
                            status: false,
                            success: false,
                            message: e
                        })
                    }
                })
            },
            message: (path) => {
                return new Promise(async (resolve, reject) => {
                    try {
                        let message = await fs.readdir(path)
                        resolve({
                            status: true,
                            success: true,
                            message: message
                        })
                    } catch (e) {
                        resolve({
                            status: false,
                            success: false,
                            message: e
                        })
                    }
                })
            },
            stream: (path) => {
                return new Promise(async (resolve, reject) => {
                    try {
                        let stream = await fs.rmdir(path)
                        resolve({
                            status: true,
                            success: true,
                            message: stream
                        })
                    }catch (e) {
                        resolve({
                            status: false,
                            success: false,
                            message: e
                        })
                    }
                })
            },
            disconnect: (path) => {
                return new Promise(async (resolve, reject) => {
                    try {
                        let disconnect = await fs.cwd()
                        resolve({
                            status: true,
                            success: true,
                            message: disconnect
                        })
                    }catch (e) {
                        resolve({
                            status: false,
                            success: false,
                            message: e
                        })
                    }
                })
            },
            multichannel: (file, result) => {
                return new Promise(async (resolve, reject) => {
                    try {
                        let multichannel = await fs.rename(file, result)
                        resolve({
                            status: true,
                            success: true,
                            message: multichannel
                        })
                    }catch (e) {
                        resolve({
                            status: false,
                            success: false,
                            message: e
                        })
                    }
                })
            },
            store: store
        })
    })
}
