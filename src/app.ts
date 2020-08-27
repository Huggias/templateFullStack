
// modules
import express, { Application, json, Request, Response } from "express";
import morgan from "morgan";
import path from 'path';
import passport = require('passport');
import session from "express-session";
import flash from 'connect-flash';
import helmet from 'helmet';
import cookieParser  from 'cookie-parser';

// por alguna razon la forma import ej from module no anduvo
const multer = require('multer');
const engine = require("ejs-mate"); 
require("./libs/passport/local-auth");

// routes
import indexRoutes from "./routes/index.routes";
import loginRoutes from "./routes/login.routes";
import testRoutes from "./routes/test.routes";

// scripts
import { init, assosiations, syncs } from "./models/settings";



// application
export class App {
    private app: Application;
    constructor(port?:number){
        this.app = express();
        this.settings(port);
        this.middleware();
        this.routes();
        this.listen();
        
        // set models of database
        init();
        assosiations();
        
        // only when modified model of databse
        // syncs();  

    }
    private routes(): void{
        this.app.use(indexRoutes);
        this.app.use(loginRoutes);
        this.app.use(testRoutes);
    }
    private middleware(): void{
        this.app.use(morgan("dev"));
        this.app.use(json());
        // this.app.use(helmet());
        // this.app.use(cookieParser());
        this.app.use(express.urlencoded({extended: false}))
        this.app.use(session({
            secret: 'key',
            resave: false,
            saveUninitialized: false
        }))
        this.app.use(flash());
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        this.app.use( (req:Request, res:Response, next: Function) => {
            this.app.locals.signinMessage = req.flash("signinMessage");
            this.app.locals.signupMessage = req.flash("signupMessage");
            this.app.locals.user = req.user;
            next();
        })

        // static files
        this.app.use(express.static(path.join(__dirname, 'views')));
        this.app.use('/public',express.static(path.join(__dirname, '../public'))); 
    }
    private settings(port?: number){
        this.app.set('views', path.join(__dirname, 'views'))
        this.app.engine('ejs', engine);
        this.app.set('view engine', 'ejs');
        this.app.set('port', process.env.PORT || port || 3000);
    }
    private listen(): void{
        this.app.listen(this.app.get("port"), () => {
            console.log("server on port: ", this.app.get("port"));
        })
    }
}