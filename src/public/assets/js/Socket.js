var socket = io()
socket.on('password:wrong', function () {
    var newElement = document.createElement('div')
    newElement.className = 'alert alert-danger'
    newElement.innerHTML = `
    <strong>Usuário ou senha inválidos.</strong>`
    document.getElementById('invalid_password').appendChild(newElement)

})