import events from "@newkind/events"
import {IDBFS} from '@newkind/fs'
import loader from '@newkind/universe'
import wasmBinary from './modules/newkind/wasmBinary.mjs'
import elite from "./modules/newkind/index.mjs";

export default async () => {
    let universe = await loader()
    await universe.dom(window)
    universe.data.wasmBinary = wasmBinary
    let Module = await universe.init()
    elite(Module);
}