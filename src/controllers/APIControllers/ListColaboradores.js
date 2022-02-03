import Colaborador from '../../models/colaborador'
import Equipe from '../../models/equipes'
import Usuario from '../../models/users'
module.exports = {
    async FindColaboradores(req,res){
        try{
            const result_colaboradores = await Colaborador.findAll()
            const dados = JSON.parse(JSON.stringify(result_colaboradores))
            let newArray = []
            for(let i = 0; i < dados.length; i++){
                const result_equipe = JSON.parse(JSON.stringify(await Equipe.findOne({where:{id : dados[i].id_equipe}})))
                const result_gestor = JSON.parse(JSON.stringify(await Usuario.findOne({where:{id : dados[i].id_gestor}})))
                newArray = [...newArray, { 
                    id:dados[i].id,
                    matricula: dados[i].matricula,
                    nome_completo:dados[i].nome_completo,
                    cpf:dados[i].cpf,
                    email:dados[i].email,
                    telefone:dados[i].telefone,
                    equipe: result_equipe.equipe_nome,
                    gestor: result_gestor.nome_completo,
                 }]
            }

            return res.status(200).json(newArray)
        }catch(e){
            
        }
    }
}