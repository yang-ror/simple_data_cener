import fs from 'fs'
import checkDiskSpace from 'check-disk-space'

export const diskSpace = (req, res) => {
    checkDiskSpace('/').then((diskSpace) => {
        let diskInfo = {
            free: diskSpace.free,
            size: diskSpace.size
        }
        res.json(diskInfo)
    })
}

export const addFile = (req, res) => {
    const file = req.file
    var filename = getFileName(file.originalname)

    let stats = fs.lstatSync('./public/files/' + filename);
    
    let newFile = {
        name: filename,
        path: '/files/' + filename,
        size: stats.size,
        date: stats.mtime
    }

    res.json(newFile)

    function getFileName(fn){
        let filename = fn
        let filenameBeforeExt = filename.substring(0, filename.lastIndexOf('.'))
        let fileExt = filename.substring(filename.lastIndexOf('.'), filename.length)

        let i = 2
        while (fs.existsSync('./public/files/' + filename)) {
            filename = filenameBeforeExt + '(' + (i++).toString() + ')' + fileExt
        }
        if(i == 3){
            return fn
        }
        else{
            return filenameBeforeExt + '(' + (i-2).toString() + ')' + fileExt
        }
    }
}

export const getFiles = (req, res) => {
    var path = './public/files/'
    if (!fs.existsSync(path)){
        fs.mkdirSync(path);
    }
    var files = []

    fs.readdirSync(path).forEach(file => {
        if(!file.startsWith('.')){
            let stats = fs.lstatSync(path + file);
            if(!stats.isDirectory()){
                let newFile = {
                    name: file,
                    path: '/files/' + file,
                    size: stats.size,
                    date: stats.mtime
                }
                files.push(newFile)
            }
        }
    });
    files.sort((a, b) => a.date + b.date)
    res.json(files)
}

// export const getFileByName = (req, res) => {
//     File.findById(req.params.fileName, (err, file) => {
//         if(err){
//             res.send(err)
//         }
//         res.json(file)
//     })
// }

export const renameFile = (req, res) => {
    var filename = req.body.name
    let stats = fs.lstatSync('./public/files/' + filename);
    
    let newFile = {
        name: filename,
        path: '/files/' + filename,
        size: stats.size,
        date: stats.mtime
    }
    res.json(newFile)
}

export const deleteFile = (req, res) => {
    res.sendStatus(200)
}