import fs from 'fs'
import moment from 'moment'
import path from 'path'
import { PDFDocument } from 'pdf-lib'


export async function ProcessPDFDocumentService (){
    try{
        const documentBytes = await fs.promises.readFile(path.resolve(__dirname,'..','tmp',`holerite-${moment().format('DDMMYYYY')}.pdf`))
        const pdfDoc = await PDFDocument.load(documentBytes)
        const numberPages = pdfDoc.getPages().length
        for(let i =0;i < numberPages ; i++){
            
            const subDocument = await PDFDocument.create();
            const [copiedPage] = await subDocument.copyPages(pdfDoc, [i])
            subDocument.addPage(copiedPage);
            const pdfBytes = await subDocument.save()
            await writePdfBytesToFile(`file-${i}.pdf`, pdfBytes);
        }
        async function writePdfBytesToFile(fileName, pdfBytes) {
            return fs.promises.writeFile(`${path.resolve(__dirname,'..','tmp','parsefiles',fileName)}`, pdfBytes);
        }
        const qtd_holerites  = numberPages
        const status = 'Processado'
        return { qtd_holerites, status}
    }catch(e){
        const numberPages = 0
        const qtd_holerites  = numberPages
        const status = 'Arquivo não encontrado'
        return { qtd_holerites, status }   
    }
}