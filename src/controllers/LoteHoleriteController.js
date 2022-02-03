import ProcessPDFDocumentService from '../models/lote'

module.exports = {
    async List(req , res){
        try{
            const result = await ProcessPDFDocumentService.findAll()
            return res.status(200).json(result)
        }catch(e){
            return res.status(500).json({message: e.message})
        }
    },
    async ListLength(req , res){
        try{
            const result = await ProcessPDFDocumentService.findAll()
            return res.status(200).json(result.length)
        }catch(e){
            return res.status(500).json({message: e.message})
        }
    }
}