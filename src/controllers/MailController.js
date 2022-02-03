import nodemailer from 'nodemailer';
import LoteIndividual from '../models/loteindividual'
import Colaborador from '../models/colaborador'
import {io} from '../index'
import fs from 'fs';
import path from 'path';
module.exports = {
    async SendHoleriteEmail(req, res ){
        const { id_lote } = req.body;
        const loteIndivdual = await LoteIndividual.findAll({ where: { id_lote: id_lote, status: 'Sucesso' }})
        const loteJson = JSON.parse(JSON.stringify(loteIndivdual));

        const transporter = nodemailer.createTransport({
            host: 'smtp.grupobjl.com.br',
            port: 465,
            auth: {user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD},
            tls: { rejectUnauthorized: false }
        })

        for(let i = 0; i < loteJson.length; i++){
            fs.unlinkSync(path.join(__dirname, '..','public','assets','tmp',`${loteJson[i].matricula}-${loteJson[i].nome_completo}.pdf`));
            const colaboradorInfos = await Colaborador.findOne({where:{ nome_completo: loteJson[i].nome_completo, matricula: loteJson[i].matricula }})
            const colaboradorJSON = JSON.parse(JSON.stringify(colaboradorInfos))
            transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: colaboradorJSON.email,
                subject: 'Holerite Mensal',
                text: `Holerite mensal ${colaboradorJSON.nome_completo}`,
                attachments: [{
                    path: loteJson[i].arquivo
                }]
            }).then(async(info) => {
                await LoteIndividual.update({status:'Email enviado' }, {where: { nome_completo: colaboradorJSON.nome_completo, id_lote: id_lote }})
            }).catch(async (err) => {
                await LoteIndividual.update({status: 'Falha ao enviar email.' }, {where: { nome_completo: colaboradorJSON.nome_completo, id_lote: id_lote }})
            })
        }
        io.emit('new:OpenResultProgress')


        let p = 1;              
        function myLoop() { 
            setTimeout(function() { 
                if(p === 100){
                    io.emit('new:ProgressBar', p, 'success')
                }else{
                    io.emit('new:ProgressBar', p, 'info')
                } 
                p++;
                if (p < 101) {
                    myLoop();
                }
                if(p === 100){
                    io.emit('new:EmailsEnviados')
                }
            }, 250)
        }
        myLoop();  

        return res.status(200).json({status:true,message:'Mail sent successfully'})
    }
}