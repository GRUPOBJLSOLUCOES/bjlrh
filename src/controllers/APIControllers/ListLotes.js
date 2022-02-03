
import LoteHolerite from '../../models/lote'
import LoteIndividual from '../../models/loteindividual'
import { sequelize } from '../../database/index'
import Colaboradores from '../../models/colaborador'
import moment from 'moment';
module.exports = {
    async ListLotes (req,res){
       const BuscaLote = await LoteHolerite.findAll({order: [['id','DESC']]})
       const InfoLote = JSON.parse(JSON.stringify(BuscaLote))
       let arrayInfos = []
       for(let i = 0; i < InfoLote.length; i++){
           const BuscaEnviado = await LoteIndividual.findAll({where: { id_lote:InfoLote[i].id, status:'Email enviado' }})
           const BuscaNaoEncontrado = await LoteIndividual.findAll({where: { id_lote:InfoLote[i].id, status:'Não encontrato' }})
           const BuscaColaboradores = await Colaboradores.findAll()
           const ColaboradoresTotais = JSON.parse(JSON.stringify(BuscaColaboradores)).length 
           const EmailEnviado = JSON.parse(JSON.stringify(BuscaEnviado)).length
           const NaoEncontrato = JSON.parse(JSON.stringify(BuscaNaoEncontrado)).length

           arrayInfos = [...arrayInfos,{
                id_lote: InfoLote[i].id, 
                responsavel_envio: InfoLote[i].responsavel,
                qtd_holerites_processados: InfoLote[i].qtd_holerites,
                qtd_holerites_enviados: EmailEnviado,
                qtd_colaboradores: ColaboradoresTotais,
                holerites_nao_encontrados: NaoEncontrato,
                data_processamento: moment(InfoLote[i].createdAt).format('DD/MM/YYYY HH:mm:ss'),
            }]
        
       }
       return res.status(200).json(arrayInfos)
    }
}