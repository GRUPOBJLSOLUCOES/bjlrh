
import { ProcessPDFDocumentService } from '../services/ProcessPDFDocumentService'
import { ReadAndSave } from '../services/ReadAndSaveHolerites'
import LoteHolerite from '../models/lote'
import { SocketEmit } from '../services/HoleritesIOService'
module.exports = {
    async ProcessPDFDocument(req,res){
        const { responsavel } = req.body;
        const { qtd_holerites, status  } = await ProcessPDFDocumentService()
        const loteInfos = await LoteHolerite.create({qtd_holerites, status, responsavel})
        const loteNumero = JSON.parse(JSON.stringify(loteInfos))
        await ReadAndSave(loteNumero.id)
        await SocketEmit(loteNumero.id)
        return res.status(200).json( {message:"Process successfully finish!"} )
    }
}