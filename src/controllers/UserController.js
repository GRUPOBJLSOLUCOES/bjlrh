import Users from '../models/users'
import bcrypt from 'bcrypt'

module.exports = {
    async Create(req, res) {
        const { username, nome_completo, email, password, active, role, id_permission } = req.body
        try {
            let nomePessoa = nome_completo.toUpperCase()
            let passHash = bcrypt.hash(password, 10, async (err, hash) => {
                if (err) {
                    return res.status(400)
                }
                let name = username.toLowerCase()
                let createdUser
                const user = await Users.findOne({ where: { username: name } })
                if (!user) createdUser = await Users.create({ username: name, nome_completo:nomePessoa, email, password: hash, active: 1, role: 1, id_permission: 1 })
                if (user) return res.status(400).render('pages/users/users', { title: 'BJL MQ - Usuários', name: req.user.username.toUpperCase() })
                return res.status(200).render('pages/users/users', { title: 'BJL MQ - Usuários', name: req.user.username.toUpperCase() })
            })
        } catch (e) {
            return res.status(500).render('pages/users/users', { title: 'BJL MQ - Usuários', name: req.user.username.toUpperCase() })
        }
    },
    async List(req, res) {
        try {
            const result = await Users.findAll()
            return res.status(200).json(result)
        } catch (e) {
            return res.status(500).json({ status: false, message: 'Error' })
        }
    },
    async Find(req, res) {
        const { username, id } = req.body
        try {
            let user
            if (username) user = await Users.findOne({ where: { username: username } })
            if (id) user = await Users.findOne({ where: { id: id } })
            return res.status(200).json(user)
        } catch (e) {
            return res.status(500).json({ status: false, message: 'Error' })
        }
    },
    async Update(req, res) {
        const { id, username, nome_completo, email, password} = req.body
        let passHash = bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                return res.status(400)
            }
            let name = username.toLowerCase()
            let createdUser = await Users.update({ username: name, nome_completo, email, password: hash, active: 1, role: 1, id_permission: 1 }, { where: { id: id } })
            return res.status(200).render('pages/users/users', { title: 'BJL MQ - Usuários', name: req.user.username.toUpperCase() })
        })
    },
    async ChangePass(req, res) {
        const { username, password } = req.body
        let passHash = bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                return res.status(400)
            }
            let name = username.toLowerCase()
            let createdUser = await Users.update({ password: hash}, { where: { username: name } })
            console.log(createdUser)
            return res.status(200).json({message:'Password changes'})
        })
    },
    async Delete(req, res) {
        const { id } = req.body
        try {
            await Users.destroy({ where: { id: id } })
            return res.status(200).render('pages/users/users', { title: 'BJL RH - Usuários', name: req.user.username.toUpperCase() })
        } catch (e) {
            console.log(e)
            return res.status(500).render('pages/users/users', { title: 'BJL MQ - Usuários', name: req.user.username.toUpperCase() })
        }
    },
}
