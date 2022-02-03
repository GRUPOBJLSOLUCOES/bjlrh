(async()=>{

    let confirmarBTNEmails = document.getElementById('enviar_emails_confirmacao')
    confirmarBTNEmails.addEventListener('click',async (e)=>{
        e.preventDefault();
        document.getElementById('enviar_emails').disabled = true
        let numeroLote = document.getElementById('lote_numero').value;
        let lote = numeroLote.split('- ')
        let myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        let loteBody = JSON.stringify({ id_lote: lote[1] })
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: loteBody,
            redirect: 'follow',
        }
        await fetch('/holeriteemail', requestOptions)
            .then(response => response.text())
            .then(async result => {
                console.log('requisitou')
                return JSON.parse(result)
            })
    })


    document.getElementById('enviar_emails').disabled = true;
    let socket = io()
    socket.on('new:successHolerite', function (nome, status, matricula, arquivo) {
        let newElement = document.createElement('div')
        newElement.innerHTML = `
        <div id="matricula-${matricula}" data-bs-toggle="modal"
        data-bs-target="#ModalPDFHolerite" style="height:40px;background-color:#e0e0e09a;margin-bottom:13px;border:rgba(121, 121, 121, 0.096) 1px solid;box-shadow: rgba(0, 0, 0, 0.096) 0px 5px 15px 0px;border-radius:10px 10px 10px 10px;cursor:pointer">
        <div style="display:flex;flex-direction:row;justify-content:left;align-items:left">
                 <div style="display:flex;justify-content:center;aling-items:center;width:40px;height:37px;margin-top:0.5px;background-color:#4AA96C;border-radius:10px 0px 0px 10px">
                     <div style="margin-top: 5px;">
                             <i class="material-icons" style="color:white">done</i>                                                   
                     </div>
                 </div>
                 <div style="margin-top:8px;margin-left:20px">
                     <label><b>NOME:&nbsp&nbsp</b></label><label> ${nome}</label>
                 </div>
                 <div class="verticalLine" style="margin-left:10px;border-left:1px solid rgb(209, 209, 209)">
                     
                     </div>
                  <div style="margin-top:8px;margin-left:10px;">
                            <label style="color:#0e973e"><b>${status}</b></label>
                 </div>
         </div>
        </div>`
        document.getElementById('process_content').appendChild(newElement)

        let divMatricula = document.getElementById(`matricula-${matricula}`)
        divMatricula.addEventListener('click',async(e)=>{
            e.preventDefault();
            document.getElementById('ModalPDFHoleriteTitle').innerText = `Holerite - ${nome}`
            let contentModal =  document.getElementById('innerFrame')
            if(contentModal) contentModal.remove();
            let newElement = document.createElement('div')
            newElement.id = 'innerFrame'
            newElement.innerHTML = `
            <iframe src="../../assets/tmp/${matricula}-${nome}.pdf" style="width: 100%;height: 1150px;border: none;"></iframe>
            `
            document.getElementById('modalcontentID').appendChild(newElement)
        })




    })
    socket.on('new:failHolerite', function (nome, status) {
        let newElement = document.createElement('div')
        newElement.innerHTML = `
        <div style="height:40px;background-color:#e0e0e09a;margin-bottom:13px;border:rgba(121, 121, 121, 0.096) 1px solid;box-shadow: rgba(0, 0, 0, 0.096) 0px 5px 15px 0px;border-radius:10px 10px 10px 10px">
        <div style="display:flex;flex-direction:row;justify-content:left;align-items:left">
                 <div style="display:flex;justify-content:center;aling-items:center;width:40px;height:37px;margin-top:0.5px;background-color:#a11b1b;border-radius:10px 0px 0px 10px">
                       <div style="margin-top: 5px;">
                             <i class="material-icons" style="color:white">close</i>                                                   
                       </div>
                 </div>
                 <div style="margin-top:8px;margin-left:20px">
                       <label><b>NOME:&nbsp&nbsp</b></label><label> ${nome}</label>
                 </div>
                 <div class="verticalLine" style="margin-left:10px;border-left:1px solid rgb(209, 209, 209)">
                       
                       </div>
                    <div style="margin-top:8px;margin-left:10px;">
                             <label style="color:#a11b1b"><b>${status}</b></label>
                 </div>
           </div>
        </div>`
        document.getElementById('process_content').appendChild(newElement)
    })

    socket.on('new:Loading', function () {
        let newElement = document.createElement('div')
        newElement.innerHTML = `
        <div id="loading_content" style="margin-top:100px">
            <center>
                <h5>PROCESSANDO ARQUIVOS</h5>
                <img src="../../assets/images/loading.gif" width="10%">
            </center>
        </div>
        `
        document.getElementById('process_content').appendChild(newElement)
    })
    socket.on('new:LoadingDimiss', function () {
        document.getElementById('loading_content').remove()
    })
    socket.on('new:BtnEmail', function () {
        document.getElementById('enviar_emails').disabled = false;
    })

    socket.on('new:OpenResultProgress', function () {
        let newElement = document.createElement('div')
        newElement.innerHTML = `
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="card">
            <div class="header">
                <h2>
                    <strong>Progresso do envio de emails</strong>
            </div>
            <div class="body">
                <div class="progress">
                    <div id="progress_envios" class="progress-bar progress-bar-success width-per-0" role="progressbar" 
                        aria-valuemin="0" aria-valuemax="100">0%</div>
                </div>
            </div>
        </div>
    </div>
        `
        document.getElementById('div_progress').appendChild(newElement)
    })
    socket.on('new:ProgressBar', function (index,stage) {
        let progress = document.getElementById('progress_envios')
        progress.innerText = index + "%"
        progress.setAttribute('class',`progress-bar progress-bar-${stage} width-per-${index}`)
    })
    socket.on('new:EmailsEnviados', function () {
      $('#enviadoEmail').modal('show')
      let confirmBtn = document.getElementById('email_enviado')
      confirmBtn.addEventListener('click', function(e){
          e.preventDefault();
          window.location.reload()
      })
    })

})();


