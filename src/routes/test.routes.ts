import { Router, Request, Response } from "express";
import { jsPDF } from "jspdf";
const router = Router();

router.route('/test')
    .get((req: Request, res: Response) => {
        // print pdf
        const doc = new jsPDF();
        doc.text("Hello world!", 10, 10);
        doc.save("./public/pdf/a4.pdf");
        console.log(doc);
        res.render("test");
    });


    

export default router;