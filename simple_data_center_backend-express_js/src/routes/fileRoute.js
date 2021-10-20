import { getFiles, addFile, diskSpace, renameFile, deleteFile } from '../controllers/fileController'
import { upload, deleteFileFromDisk, renameFileInDisk } from './middlewares'

const routes = (app) => {
    app.route('/diskspace')
        .get(diskSpace)

    app.route('/upload')
        .post(upload.single('foo'), addFile)

    app.route('/file')
        .get(getFiles)
    
    app.route('/file/:fileName')
        .put((req, res, next) => {
            renameFileInDisk(req.params.fileName, req.body.name)
            next()
        }, renameFile)
        .delete((req, res, next) => {
            deleteFileFromDisk(req.params.fileName)
            next()
        }, deleteFile)
}

export default routes