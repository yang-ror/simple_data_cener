import multer from 'multer'
import fs from 'fs'

const filePath = './public/files'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, filePath)
    },
    filename: (req, file, cb) => {
        var fn = filenameChecker(file.originalname)
        cb(null, fn)
    }
})

const filenameChecker = (fn) => {
    let filename = fn
    let filenameBeforeExt = filename.substring(0, filename.lastIndexOf('.'))
    let fileExt = filename.substring(filename.lastIndexOf('.'), filename.length)

    let i = 2
    while (fs.existsSync(filePath + '/' + filename)) {
        filename = filenameBeforeExt + '(' + (i++).toString() + ')' + fileExt
    }

    return filename
}

export const upload = multer({ storage: storage })

export const renameFileInDisk = (curName, newName) => {
    var fs = require('fs');
    try {
        fs.renameSync(filePath + '/' + curName, filePath + '/' + newName,)
    }
    catch(err) {
        console.log(err)
    }
}

export const deleteFileFromDisk = (fileName) => {
    try {
        fs.unlinkSync(filePath + '/' + fileName)
    }
    catch(err) {
        console.log(err)
    }
}