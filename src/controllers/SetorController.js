import Setor from '../models/setores'

module.exports = {
    async Create(req, res){
        const { setor_nome } = req.body
        try{
            let exist_setor = await Setor.findOne({ where: { setor_nome: setor_nome } })
            if(exist_setor) return res.status(400).json({message:"Setor Já Existente"})
            const createSetor = await Setor.create({ setor_nome })
            return res.status(200).render('pages/departamentos/setores', { title: 'BJL RH - Setores', name: req.user.username.toUpperCase() })
        }catch(e){
            return res.status(500).json(e)
        }
    },
    async List(req, res){
        try{
            const listSetor = await Setor.findAll()
            return res.status(200).json(listSetor)
        }catch(e){
            return res.status(500).json(e)
        }
    },
    async Find(req, res){
        const { setor_nome } = req.body
        try{
            let exist_setor = await Setor.findOne({ where: { setor_nome: setor_nome } })
            if(!exist_setor.length) return res.status(404).json({message: "Not Found"})
            return res.status(200).json(exist_setor)
        }catch(e){
            return res.status(500).json(e)
        }
    },
    async Update(req,res) {
        const { setor_nome } = req.body
        try{
            let updateSetor = await Setor.update({ setor_nome }, { where: { setor_nome: setor_nome } })
            return res.status(200).render('pages/departamentos/setores', { title: 'BJL RH - Setores', name: req.user.username.toUpperCase() })
        }catch(e){
            return res.status(500).json(e)
        }
    },
    async Delete(req, res) {
        const { setor_nome } = req.body
        try{
            let deleteSetor = await Setor.destroy({ where: { setor_nome: setor_nome } })
            return res.status(200).render('pages/departamentos/setores', { title: 'BJL RH - Setores', name: req.user.username.toUpperCase() })
        }catch(e){
            return res.status(500).json(e)
        }
    }
}