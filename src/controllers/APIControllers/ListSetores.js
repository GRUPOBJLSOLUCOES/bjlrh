import Setor from '../../models/setores'
import Equipe from '../../models/equipes'

module.exports = {
    async FindEquipes (req,res){
        let newArr = []
        try{
            const listEquipe = await Equipe.findAll()
            if(listEquipe.length){
                for(let i=0; i<listEquipe.length; i++){
                    let setor = await Setor.findOne({ where: { id: listEquipe[i].id_setor } })
                    let datab = JSON.parse(JSON.stringify(setor))
                    newArr = [...newArr,{ id: listEquipe[i].id, equipe_nome: listEquipe[i].equipe_nome, responsavel: listEquipe[i].responsavel, setor: datab.setor_nome }]
                }
            }
            return res.status(200).json(newArr)
        }catch(e){

        }
    }
}