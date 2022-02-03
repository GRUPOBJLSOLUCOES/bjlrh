import {} from 'dotenv/config'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import path from 'path'
import hbs from 'express-handlebars'
import session from 'express-session'
import Users from './models/users'
import bcrypt from 'bcrypt'
import fs from 'fs'
import passport from 'passport'
import localStrategy from 'passport-local'
import { router } from './routes/router'
import socketio from 'socket.io'
import http from 'https'
import moment from 'moment'
import multer from 'multer'


const storage = multer.diskStorage({
    destination: path.join('src','tmp'),
    filename: function(req,file,cb){
        cb(null, `holerite-${moment().format('DDMMYYYY')}${file.mimetype === 'application/pdf'? '.pdf': ''}`)
    }
})

const upload = multer({ storage: storage })
export const app = express()


app.engine('hbs', hbs({ extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(session({ secret: 'verygoodsecret', resave: false, saveUninitialized: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.use(passport.initialize())
app.use(passport.session())
app.use(helmet())
app.use(cors({ origin: '*' }))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(router)

app.post('/uploadholerite', upload.single('file'), (req, res) => {
    res.status(200).json({message: 'Uploaded file successfully'})
  })

passport.serializeUser(async function (user, done) {
    done(null, user.id)
})

passport.deserializeUser(async function (id, done) {
    try {
        const user = await Users.findOne({ where: { id: id } })
        const UsersList = JSON.parse(JSON.stringify(user))
        done(null, UsersList)
    } catch (err) {
        done(err, null)
    }
})

passport.use(
    new localStrategy(async function (username, password, done) {
        const name = username.toLowerCase()
        try {
            const user = await Users.findOne({ where: { username: name } })
            const UsersList = JSON.parse(JSON.stringify(user))
            if (!UsersList) {
                return done(null, false)
            }
            const isValid = bcrypt.compareSync(password, UsersList.password)
            if (!isValid){
                return done(null, false)
            } 
            return done(null, user)
        } catch (e) {
           
            return done(e, false)
        }
    })
)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next()
    res.redirect('/login')
}

function isLoggedOut(req, res, next) {
    if (!req.isAuthenticated()) return next()
    res.redirect('/')
}

app.get('/login', isLoggedOut, (req, res) => {
    const response = {
        title: 'Login - BJL RH',
        error: req.query.error,
    }

    res.render('index', response)
})


// ? Routes 
app.get('/', isLoggedIn, (req, res) => {
    res.render('pages/dashboard', { title: 'BJL RH - Home', name: req.user.username.toUpperCase(), permission: req.user.id_permission })
})

// ? Users
app.get('/users', isLoggedIn, (req, res) => {
    res.render('pages/users/users', { title: 'BJL RH - Usuários', name: req.user.username.toUpperCase(), permission: req.user.id_permission })
})


// ? Setores 
app.get('/setores', isLoggedIn, (req, res) => {
    res.render('pages/departamentos/setores', { title: 'BJL RH - Setores', name: req.user.username.toUpperCase(), permission: req.user.id_permission })
})

// ? Equipes 
app.get('/equipes', isLoggedIn, (req, res) => {
    res.render('pages/departamentos/equipes', { title: 'BJL RH - Equipes', name: req.user.username.toUpperCase(), permission: req.user.id_permission })
})

// ? Colaboradores 
app.get('/colaboradores', isLoggedIn, (req, res) => {
    res.render('pages/departamentos/colaboradores', { title: 'BJL RH - Colaboradores', name: req.user.username.toUpperCase(), permission: req.user.id_permission })
})


// ? Holerites 
app.get('/holerites', isLoggedIn, (req, res) => {
    res.render('pages/dp/holerites', { title: 'BJL RH - Holerites', name: req.user.username.toUpperCase(), permission: req.user.id_permission })
})




app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login?error=true' }))

app.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/login')
})

const port = process.env.PORT || 3000
const url = process.env.BASE_URL || '0.0.0.0'
const options = {
    key: fs.readFileSync(path.resolve(__dirname, 'cert', 'chaveprivada.key')),
    cert: fs.readFileSync(path.resolve(__dirname, 'cert', 'chave.crt')),
}

const server = http.createServer(options, app).listen(port, url, function () {
    console.log('Express server listening on port ' + port)
})
export const io = socketio(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
})

