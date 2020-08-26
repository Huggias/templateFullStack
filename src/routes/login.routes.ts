import { Router, Request, Response } from "express";
import passport from "passport";
const router = Router();

// middleware for aunthenticate
router.use( (req:Request, res:Response, next:Function)=>{
    // isAuthenticated(req, res, next);
    next();
})
function isAuthenticated(req:Request, res:Response,next:Function){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/signup');
}
router.route('/profile')
    .get(isAuthenticated, (req: Request, res: Response) => {
        res.render('profile');
    })
router.route('/signin')
    .get( (req: Request, res: Response)=> { res.render('signin'); } )
    .post(passport.authenticate('local-signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        passReqToCallback: true
    }))

router.route('/logout')
    .get( (req: Request, res: Response)=>{
        req.logOut();
        res.redirect('/signup');
    })

router.route('/signup')
    .get( (req: Request, res: Response)=> { res.render('signup'); } )
    .post(passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        passReqToCallback: true
    }))

export default router;