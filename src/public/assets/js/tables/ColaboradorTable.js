;(async () => {

    $('#form_validation').submit(function (evt) {
        window.location.href = '/colaboradores'
    })


    let colaboradorAdd = document.getElementById('adicionarColaborador')

    colaboradorAdd.addEventListener('click',async(e)=>{
        e.preventDefault();
        let requestOptions = {
            method: 'GET',
            redirect: 'follow',
        }
        await fetch('/listarequipe', requestOptions)
            .then(response => response.text())
            .then(async result => {
                let dados = JSON.parse(result)
                console.log(dados)
                for(let i = 0; i <dados.length; i++) {
                    const InnerHtml = document.createElement('option')
                    InnerHtml.value = dados[i].id
                    InnerHtml.innerText = dados[i].equipe_nome
                    const appd = document.getElementById('equipe_select').appendChild(InnerHtml)
                }
        })
        await fetch('/listarusuarios', requestOptions)
            .then(response => response.text())
            .then(async result => {
                let dados = JSON.parse(result)
                console.log(dados)
                for(let i = 0; i <dados.length; i++) {
                    const InnerHtml = document.createElement('option')
                    InnerHtml.value = dados[i].id
                    InnerHtml.innerText = dados[i].nome_completo
                    const appd = document.getElementById('gestor_select').appendChild(InnerHtml)
                }
    })

    })


    let requestOptions = {
        method: 'GET',
        redirect: 'follow',
    }
    await fetch('/listagemcolaboradores', requestOptions)
        .then(response => response.text())
        .then(async result => {
            let dados = JSON.parse(result)
            $(document).ready(function () {
                getDataForDatatables()
            })
            function getDataForDatatables() {
                var jsonData = {
                    data: dados,
                }
                setDataToTable(jsonData)
            }
            function setDataToTable(jsonData) {
                $('#form_validation').submit(function (evt) {
                    window.location.href = '/colaboradores'
                })
                $('#dataTableUsuarios').DataTable({
                    responsive: true,

                    language: {
                        emptyTable: 'Nenhum registro encontrado',
                        info: 'Mostrando de _START_ at?? _END_ de _TOTAL_ registros',
                        infoEmpty: 'Mostrando 0 at?? 0 de 0 registros',
                        infoFiltered: '(Filtrados de _MAX_ registros)',
                        infoThousands: '.',
                        loadingRecords: 'Carregando...',
                        processing: 'Processando...',
                        zeroRecords: 'Nenhum registro encontrado',
                        search: 'Pesquisar',
                        paginate: {
                            next: 'Pr??ximo',
                            previous: 'Anterior',
                            first: 'Primeiro',
                            last: '??ltimo',
                        },

                        aria: {
                            sortAscending: ': Ordenar colunas de forma ascendente',
                            sortDescending: ': Ordenar colunas de forma descendente',
                        },
                        select: {
                            rows: {
                                _: 'Selecionado %d linhas',
                                1: 'Selecionado 1 linha',
                            },
                            cells: {
                                1: '1 c??lula selecionada',
                                _: '%d c??lulas selecionadas',
                            },
                            columns: {
                                1: '1 coluna selecionada',
                                _: '%d colunas selecionadas',
                            },
                        },

                        buttons: {
                            copySuccess: {
                                1: 'Uma linha copiada com sucesso',
                                _: '%d linhas copiadas com sucesso',
                            },
                            collection: 'Cole????o  <span class="ui-button-icon-primary ui-icon ui-icon-triangle-1-s"></span>',
                            colvis: 'Visibilidade da Coluna',
                            colvisRestore: 'Restaurar Visibilidade',
                            copy: 'Copiar',
                            copyKeys: 'Pressione ctrl ou u2318 + C para copiar os dados da tabela para a ??rea de transfer??ncia do sistema. Para cancelar, clique nesta mensagem ou pressione Esc..',
                            copyTitle: 'Copiar para a ??rea de Transfer??ncia',
                            csv: 'CSV',
                            excel: 'Excel',
                            pageLength: {
                                '-1': 'Mostrar todos os registros',
                                _: 'Mostrar %d registros',
                            },
                            pdf: 'PDF',
                            print: 'Imprimir',
                        },
                        autoFill: {
                            cancel: 'Cancelar',
                            fill: 'Preencher todas as c??lulas com',
                            fillHorizontal: 'Preencher c??lulas horizontalmente',
                            fillVertical: 'Preencher c??lulas verticalmente',
                        },
                        lengthMenu: 'Exibir _MENU_ resultados por p??gina',
                        searchBuilder: {
                            add: 'Adicionar Condi????o',
                            button: {
                                0: 'Construtor de Pesquisa',
                                _: 'Construtor de Pesquisa (%d)',
                            },
                            clearAll: 'Limpar Tudo',
                            condition: 'Condi????o',
                            conditions: {
                                date: {
                                    after: 'Depois',
                                    before: 'Antes',
                                    between: 'Entre',
                                    empty: 'Vazio',
                                    equals: 'Igual',
                                    not: 'N??o',
                                    notBetween: 'N??o Entre',
                                    notEmpty: 'N??o Vazio',
                                },
                                number: {
                                    between: 'Entre',
                                    empty: 'Vazio',
                                    equals: 'Igual',
                                    gt: 'Maior Que',
                                    gte: 'Maior ou Igual a',
                                    lt: 'Menor Que',
                                    lte: 'Menor ou Igual a',
                                    not: 'N??o',
                                    notBetween: 'N??o Entre',
                                    notEmpty: 'N??o Vazio',
                                },
                                string: {
                                    contains: 'Cont??m',
                                    empty: 'Vazio',
                                    endsWith: 'Termina Com',
                                    equals: 'Igual',
                                    not: 'N??o',
                                    notEmpty: 'N??o Vazio',
                                    startsWith: 'Come??a Com',
                                },
                                array: {
                                    contains: 'Cont??m',
                                    empty: 'Vazio',
                                    equals: 'Igual ??',
                                    not: 'N??o',
                                    notEmpty: 'N??o vazio',
                                    without: 'N??o possui',
                                },
                            },
                            data: 'Data',
                            deleteTitle: 'Excluir regra de filtragem',
                            logicAnd: 'E',
                            logicOr: 'Ou',
                            title: {
                                0: 'Construtor de Pesquisa',
                                _: 'Construtor de Pesquisa (%d)',
                            },
                            value: 'Valor',
                            leftTitle: 'Crit??rios Externos',
                            rightTitle: 'Crit??rios Internos',
                        },
                        searchPanes: {
                            clearMessage: 'Limpar Tudo',
                            collapse: {
                                0: 'Pain??is de Pesquisa',
                                _: 'Pain??is de Pesquisa (%d)',
                            },
                            count: '{total}',
                            countFiltered: '{shown} ({total})',
                            emptyPanes: 'Nenhum Painel de Pesquisa',
                            loadMessage: 'Carregando Pain??is de Pesquisa...',
                            title: 'Filtros Ativos',
                        },
                        thousands: '.',
                        datetime: {
                            previous: 'Anterior',
                            next: 'Pr??ximo',
                            hours: 'Hora',
                            minutes: 'Minuto',
                            seconds: 'Segundo',
                            amPm: ['am', 'pm'],
                            unknown: '-',
                            months: {
                                0: 'Janeiro',
                                1: 'Fevereiro',
                                10: 'Novembro',
                                11: 'Dezembro',
                                2: 'Mar??o',
                                3: 'Abril',
                                4: 'Maio',
                                5: 'Junho',
                                6: 'Julho',
                                7: 'Agosto',
                                8: 'Setembro',
                                9: 'Outubro',
                            },
                            weekdays: ['Domingo', 'Segunda-feira', 'Ter??a-feira', 'Quarta-feira', 'Quinte-feira', 'Sexta-feira', 'S??bado'],
                        },
                        editor: {
                            close: 'Fechar',
                            create: {
                                button: 'Novo',
                                submit: 'Criar',
                                title: 'Criar novo registro',
                            },
                            edit: {
                                button: 'Editar',
                                submit: 'Atualizar',
                                title: 'Editar registro',
                            },
                            error: {
                                system: 'Ocorreu um erro no sistema (<a target="\\" rel="nofollow" href="\\">Mais informa????es</a>).',
                            },
                            multi: {
                                noMulti: 'Essa entrada pode ser editada individualmente, mas n??o como parte do grupo',
                                restore: 'Desfazer altera????es',
                                title: 'Multiplos valores',
                                info: 'Os itens selecionados cont??m valores diferentes para esta entrada. Para editar e definir todos os itens para esta entrada com o mesmo valor, clique ou toque aqui, caso contr??rio, eles manter??o seus valores individuais.',
                            },
                            remove: {
                                button: 'Remover',
                                confirm: {
                                    _: 'Tem certeza que quer deletar %d linhas?',
                                    1: 'Tem certeza que quer deletar 1 linha?',
                                },
                                submit: 'Remover',
                                title: 'Remover registro',
                            },
                        },
                        decimal: ',',
                    },

                    bDestroy: true,
                    pagination: 'bootstrap',
                    data: jsonData.data,
                    lengthMenu: [5, 10, 25],
                    pageLength: 10,
                    columns: [{ data: 'id' }, {data: 'matricula'} ,{ data: 'nome_completo' }, { data: 'cpf' },{ data: 'email' },{ data: 'telefone' },{ data: 'equipe' },{ data: 'gestor' }],
                })
            }
        })
})()
