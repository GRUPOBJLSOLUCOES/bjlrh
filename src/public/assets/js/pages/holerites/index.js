(async()=>{
    let requestOptions = {
        method: 'GET',
        redirect: 'follow',
    }
    await fetch('/listarqtdlotes', requestOptions)
        .then(response => response.text())
        .then(async result => {    
        document.getElementById('lote_numero').value = `LOTE N° - ${parseInt(result) + 1}`
    })


    let btnProcessarArquivos = document.getElementById('processar_arquivos')
    btnProcessarArquivos.addEventListener('click',async (e) => {
        e.preventDefault();
        const form = document.getElementById('drop_form')
        const validForm = form.getAttribute('class')
        if(validForm === 'dropzone dz-clickable dz-started') {
            document.getElementById('processar_arquivos').disabled = true
            let myHeaders = new Headers()
            myHeaders.append('Content-Type', 'application/json')
            let usernameRH = localStorage.getItem('usernameRH')
            let myBody = JSON.stringify({ responsavel: usernameRH })
            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: myBody,
                redirect: 'follow',
            }
            await fetch('/processarpdf', requestOptions)
                .then(response => response.text())
                .then(async result => {})
        }else{
                $(".notify").addClass("active-toast");
                $("#notifyType").addClass("failure");
                
                setTimeout(function(){
                  $(".notify").removeClass("active-toast");
                  $("#notifyType").removeClass("failure");
                },4000);
        }

       
    })
})();


