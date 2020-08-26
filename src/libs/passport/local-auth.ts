import passport from "passport";
import strategy from 'passport-local';
import { Request } from "express";
import { User } from "../../models/user";

const LocalEstrategy = strategy.Strategy;

passport.serializeUser((user: User, done) => {
    console.log(user);
    done(null, user.id)
})

passport.deserializeUser(async (id: number, done: Function) => {
    let user = await User.findByPk(id);
    done(null, user);
})

passport.use('local-signin', new LocalEstrategy( {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req: Request, email: string, password: string, done: Function)=>{
    try {
        let newUser = await User.create({
            email,
            username: req.body.username,
            password: User.encryptPassword(password)
        })
        done(null, newUser)
    } catch (error) {
        return done(null, false, req.flash('signinMessage','El email ya existe'))
    }
}));
passport.use('local-signup', new LocalEstrategy( {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req: Request, email: string, password: string, done: Function)=> {
    let entryUser = await User.findOne({where:{email}});
    if (entryUser && entryUser.comparePassword(password)) {
        done(null, entryUser);
    }else{
        done(null, false, req.flash('signupMessage', 'Las credenciales de usuario son incorrectas'));
    }
}));