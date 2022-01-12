import Equipe from '../models/equipes'

module.exports = {
    async Create (req,res){
        const { equipe_nome,responsavel,id_setor }= req.body;
        try{
            const existEquipe = await Equipe.findOne({ where: { equipe_nome: equipe_nome } })
            if(existEquipe) return res.status(400).json({message:"Equipe already exist"})
            const createSetor = await Equipe.create({ equipe_nome, responsavel,id_setor})
            return res.status(200).render('pages/departamentos/equipes', { title: 'BJL RH - Equipes', name: req.user.username.toUpperCase() })
        }catch(e){
            return res.status(500).json(e)
        }
    },
    async List(req, res){
        try{
            const listEquipe = await Equipe.findAll()
            return res.status(200).json(listEquipe)
        }catch(e){
            return res.status(500).json(e)
        }
    },
    async Update(req, res){
        const { equipe_nome, responsavel, id_setor } = req.body
        try{
            const updateEquipe = await Equipe.update({ equipe_nome,responsavel,id_setor }, { where: { equipe_nome: equipe_nome } })
            return res.status(200).json(updateEquipe)
        }catch(e){
            return res.status(500).json(e)
        }
    },
    async Find(req, res){
        const { equipe_nome } = req.body
        try{
            const findEquipe = await Equipe.findOne({ where: { equipe_nome: equipe_nome}})
            return res.status(200).json(findEquipe)
        }catch(e){
            return res.status(500).json(e)
        }
    },
    async Delete(req, res) {
        const { equipe_nome } = req.body
        try{
            const deleteEquipe = await Equipe.destroy({ where: { equipe_nome}})
            return res.status(200).json({message:"Deleted"})
        }catch(e){
            return res.status(500).json(e)
        }
    }
}