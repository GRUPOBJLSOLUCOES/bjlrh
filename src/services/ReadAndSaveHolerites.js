import path from 'path'
import fs from 'fs'
import moment from 'moment'
import {PDFExtract} from 'pdf.js-extract';
import Colaborador from '../models/colaborador'
import { Op } from 'sequelize'
import LoteIndividual from '../models/loteindividual'
import LoteHolerite from '../models/lote'
const pdfExtract = new PDFExtract();

export async function ReadAndSave(loteNumero){
    const totalColaboradores = await Colaborador.findAll()
    let dataBase =  JSON.parse(JSON.stringify(totalColaboradores))

    const date_ref = moment().format('YYYY-MM-DD')
    for(let i = 0; i < dataBase.length ; i++) {
        // Salvar o lote individal da pessoa com o status processando.
        await LoteIndividual.create({ id_lote: loteNumero,matricula: dataBase[i].matricula ,nome_completo: dataBase[i].nome_completo ,status:'Processando'})

        let filePath = path.join(__dirname,'..','tmp','parsefiles',`file-${i}.pdf`)
        pdfExtract.extract(filePath, {}, async function (err, data) {
            if (err){
                return null
            }
            const dadosLote = await LoteHolerite.findAll()
            const numeroLote = JSON.parse(JSON.stringify(dadosLote)).length
            const NomePDF = JSON.parse(JSON.stringify(data, null, '\t'))
            for(let x = 0; x < 30; x++) {
                let buscarColaborador = NomePDF.pages[0].content[x].str
                let parseName = buscarColaborador.split(' ')
                const searchColaboradorDatabase = await Colaborador.findOne({ where: { nome_completo: { [Op.like]: `${parseName[0]}%` }} })
                if(searchColaboradorDatabase){
                    let colaboradorInfos = JSON.parse(JSON.stringify(searchColaboradorDatabase))
                    let parsedBanco = colaboradorInfos.nome_completo.split(' ')
                    if(parsedBanco[0] === parseName[0]){
                            let newPath = process.platform === 'linux' ? path.join('/mnt/7-rh/Holerites/', date_ref ) : path.join('//192.168.1.254/7-rh/Holerites/', date_ref );
                            const searchMatricula = await Colaborador.findOne({ where: { nome_completo: buscarColaborador} })
                            let dadosMatricula =  JSON.parse(JSON.stringify(searchMatricula))
                            if(!dadosMatricula)  continue
                            if (!fs.existsSync(newPath)) fs.mkdirSync(newPath, { recursive: true })
                            const data = fs.readFile(filePath, (err,pdfBuffer)=>{
                                const resultData = path.join(newPath, dadosMatricula.matricula + '-' + dadosMatricula.nome_completo +'.pdf')
                                const innerPath = path.join(__dirname,'..','public','assets','tmp', dadosMatricula.matricula + '-' + dadosMatricula.nome_completo +'.pdf')
                                fs.writeFile(resultData,pdfBuffer,async(err,data)=>{
                                    if(err) console.log(err)
                                    await LoteIndividual.update({status:'Sucesso', arquivo: path.join(newPath, dadosMatricula.matricula + '-' + dadosMatricula.nome_completo +'.pdf') }, {where: { nome_completo: dadosMatricula.nome_completo, id_lote: numeroLote }})
                                    fs.unlinkSync(path.join(__dirname,'..','tmp','parsefiles',`file-${i}.pdf`));
                                })
                                fs.writeFile(innerPath,pdfBuffer,async(err,data)=>{
                                    if(err) throw err                                
                                })
                            })
                           
                    }
                }
            }
        });
    }
    const totaisProcessando = await LoteIndividual.findAll({where: {id_lote: loteNumero, status: 'Processando'}})
    const jsonTotaisProcessando = JSON.parse(JSON.stringify(totaisProcessando))
    for(let t = 0 ; t < jsonTotaisProcessando.length ; t++){
        await LoteIndividual.update({status:'Não encontrato'},{where:{id_lote: loteNumero,nome_completo: jsonTotaisProcessando[t].nome_completo}})
    }

    fs.unlinkSync(path.join(__dirname, '..','tmp',`holerite-${moment().format('DDMMYYYY')}.pdf`));


    for(let r = 0 ; r < 500 ; r++){
        try{
           fs.unlinkSync(path.join(__dirname,'..','tmp','parsefiles',`file-${r}.pdf`));
        }catch(e){

        }
    }

    return true
}

