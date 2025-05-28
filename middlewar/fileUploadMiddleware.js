import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    const resumesDir = path.join('public', 'resumes');
    cb(null,resumesDir);
  },
  filename: (req, file, cb) => {
    const name = Date.now() + '-' + file.originalname;
    cb(null, name);
  }
});

export default multer({ storage });
