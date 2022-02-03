import LoteIndividual from '../models/loteindividual'
import { io } from '../index'
export async function SocketEmit(loteNumero) {
    io.emit("new:Loading")
    setTimeout(async() =>{
    io.emit("new:LoadingDimiss")
    const resultIndividual = await LoteIndividual.findAll({where: { id_lote: loteNumero }})
    const result = JSON.parse(JSON.stringify(resultIndividual))
    for(let i = 0; i < result.length; i++) {
        if(result[i].status === "Sucesso"){
            io.emit('new:successHolerite', result[i].nome_completo, result[i].status, result[i].matricula, result[i].arquivo)
        }
        if(result[i].status === "Não encontrato"){
            io.emit('new:failHolerite', result[i].nome_completo, result[i].status)
        }
    }
    io.emit("new:BtnEmail")
},7000)
}