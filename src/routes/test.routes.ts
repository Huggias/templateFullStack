import { Router, Request, Response } from "express";
import multer from "../libs/multer/basic";
// import {main} from "../models/settings";
const router = Router();

router.route('/testImg')
    .post( multer.single('image'), async (req: Request, res: Response) => {
        console.log(req.file);
        return res.send("Hola");
    });


    

export default router;