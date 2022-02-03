import Colaborador from '../models/colaborador'

module.exports = {
    async Create (req,res ){
        const { nome_completo,cpf,email,matricula,telefone,id_equipe,id_gestor } = req.body;
        try{
            const exist_colaborator = await Colaborador.findOne({ where: { nome_completo: nome_completo } })
            if(exist_colaborator) return res.status(400).json({message: "colaborator already exists"})
            const create_colaborator = await Colaborador.create( {nome_completo,cpf,email,telefone,id_equipe,id_gestor,matricula })
            return res.status(200).render('pages/departamentos/colaboradores', { title: 'BJL RH - Colaboradores', name: req.user.username.toUpperCase() })
        }catch(e){
            return res.status(500).json({message: e.message})
        }
    },
    async List(req , res){
        try{
            const result = await Colaborador.findAll()
            return res.status(200).json(result)
        }catch(e){
            return res.status(500).json({message: e.message})
        }
    }
}