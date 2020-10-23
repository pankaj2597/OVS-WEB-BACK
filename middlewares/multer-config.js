const multer = require('multer');

multer({ dest: 'public/image/' });

var imageStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/image/');
    },
    filename:(req,file,cb)=>{
        var fileName = Math.random().toString(8).slice(2) + Date.now() + ".png";
        cb(null,fileName);
    }
});


var upload = multer({storage:imageStorage});

module.exports = upload;