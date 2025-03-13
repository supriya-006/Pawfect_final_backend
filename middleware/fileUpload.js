const multer = require('multer')
const fs = require('fs')//file system
const path = require('path')//file path

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let dstn = 'public/uploads'

        if (!fs.existsSync(dstn)) {
            fs.mkdirSync(dstn, { recursive: true })
        }
        cb(null, dstn)
    },
    filename: function (req, file, cb) {
        let extname = path.extname(file.originalname)
        let basename = path.basename(file.originalname, extname)

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        let finalName = `${file.fieldname}-${basename}-${uniqueSuffix}${extname}`

        cb(null,finalName)
    }
})

const fileFilter = (req, file, cb) =>{
    if(!file.originalname.match(/[.](jpg|jpeg|png|gif|svg|webp|JPG|JPEG|PNG|GIF|SVG|WEBP)$/)){
        cb(new Error("File format invalid"),false)
        //return res.status(400).json({error:"file format invalid. only images are allowed"})
    }
    cb(null, true)
}

const upload = multer({ 
    storage,
    fileFilter,
    limits:{
        fileSize:2000000
    }

})

module.exports = upload