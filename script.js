let tabelaCount = 0;

const nomesPorTabela = [
    // Primeira tabela
    ["DENISE DE FÁTIMA C CASTILHO",
    "HELOISA UBEDA",
    "ANA JÚLIA CRUZ DE SOUZA",
    "SARAH LAGE DA FONSECA"
    ],

    // Segunda tabela
    ["MARCOS PAULO DE SOUZA",
    "RICARDO ASSAGRA DENIPOTI",
    "GABRIEL SILVA RODRIGUES ",
    "EDUARDO MEIWA"
    ],     

    // Terceira tabela
    ["ANGELO ALVES FERREIRA JUNIOR"],

    // Quarta tabela
    ["LARA MIYUKI DA PAZ OGATA",
    "AMANDA ALVES DALL' AGNOL"
    ]
];

// Altere a função gerarTabela para usar nomes diferentes:
function gerarTabela(mesAno = null, container = null) {
    let data = mesAno || document.getElementById('mes').value;
    if (!data) {
        alert('Escolha um mês!');
        return;
    }

    const [ano, mes] = data.split('-').map(Number);
    const diasNoMes = new Date(ano, mes, 0).getDate();
    const nomesDias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    const dataEscolhidaDiv = document.getElementById('data-escolhida');
    if (dataEscolhidaDiv) {
        dataEscolhidaDiv.textContent = `Mês selecionado: ${String(mes).padStart(2, '0')}/${ano}`;
    } else {
        const div = document.createElement('div');
        div.id = 'data-escolhida';
        div.className = 'text-center text-lg font-semibold my-2';
        div.textContent = `Mês selecionado: ${String(mes).padStart(2, '0')}/${ano}`;
        const headerImgs = document.querySelector('.container.mx-auto.py-6.flex');

        if (headerImgs && headerImgs.parentNode) {
        headerImgs.parentNode.insertBefore(div, headerImgs.nextSibling);
        }
    }

    const tabela = document.createElement('table');
    tabela.className = 'border border-black tabela-escala w-full bg-white rounded shadow text-xs mb-1';

    // Cabeçalho
    const thead = tabela.createTHead();
    const trCabecalho = thead.insertRow();
    let thNome = document.createElement('th');
    thNome.className = 'border border-black nome bg-gray-200 text-gray-700 font-semibold';
    thNome.style.width = "200px";
    let inputThNome = document.createElement('input');
    inputThNome.type = 'text';
    inputThNome.value = 'Nome';
    inputThNome.className = 'input-th-nome font-bold w-full bg-transparent outline-none';
    inputThNome.oninput = function() {
        thNome.title = inputThNome.value;
    };
    thNome.appendChild(inputThNome);
    trCabecalho.appendChild(thNome);

    for (let dia = 1; dia <= diasNoMes; dia++) {
        const dataAtual = new Date(ano, mes - 1, dia);
        const diaSemana = dataAtual.getDay();
        let th = document.createElement('th');
        th.textContent = `${dia}\n${nomesDias[diaSemana]}`;
        th.className = 'border border-black dia whitespace-pre-wrap px-0 py-1';
        th.style.width = "15px";
        if (diaSemana === 0 || diaSemana === 6) th.classList.add('bg-gray-300');
        trCabecalho.appendChild(th);
    }

    let thAuto = document.createElement('th');
    thAuto.textContent = 'Autopreencher';
    thAuto.className = 'border border-black autopreenchimento bg-gray-200 text-gray-700 font-semibold';
    thAuto.style.width = "150px";
    trCabecalho.appendChild(thAuto);

    let thExcluir = document.createElement('th');
    thExcluir.textContent = 'Excluir';
    thExcluir.className = 'border border-black excluir bg-gray-200 text-gray-700 font-semibold';
    thExcluir.style.width = "50px";
    trCabecalho.appendChild(thExcluir);

    // Corpo
    const tbody = tabela.createTBody();
    // Escolhe o conjunto de nomes conforme o número da tabela
    const nomesPadrao = nomesPorTabela[tabelaCount] || [];
    nomesPadrao.forEach((nome, idx) => {
        adicionarLinha(tbody, diasNoMes, nome, ano, mes, idx);
    });

    // Botão imprimir
    const btnImprimir = document.createElement('button');
    btnImprimir.textContent = 'Imprimir';
    btnImprimir.className = 'btn-imprimir bg-gray-700 hover:bg-gray-900 text-white px-3 py-1 rounded mb-2 mt-2 mr-2';
    btnImprimir.onclick = function() {
        window.print();
    };

    // Botão adicionar linha
    const btnAddLinha = document.createElement('button');
    btnAddLinha.textContent = 'Adicionar Linha';
    btnAddLinha.className = 'btn-add-linha bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded mb-2 mt-2';
    btnAddLinha.onclick = function() {
        adicionarLinha(tbody, diasNoMes, "", ano, mes, tbody.rows.length);
    };

    // Adiciona tabela ao container
    const divTabela = document.createElement('div');
    divTabela.appendChild(tabela);
    divTabela.appendChild(btnImprimir);
    divTabela.appendChild(btnAddLinha);

    // Botão apagar tabela
    const btnApagarTabela = document.createElement('button');
    btnApagarTabela.textContent = 'Apagar Tabela';
    btnApagarTabela.className = 'btn-apagar-tabela bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded mb-2 mt-2 ml-2';
    btnApagarTabela.onclick = function() {
        divTabela.remove();
    };
    divTabela.appendChild(btnApagarTabela);

    if (container) {
        container.appendChild(divTabela);
    } else {
        document.getElementById('tabelas').appendChild(divTabela);
    }

    tabelaCount++; // Incrementa para a próxima tabela usar outro conjunto de nomes
    }

    // Função adicionar linhas
    function adicionarLinha(tbody, diasNoMes, nome, ano, mes, idx = null) {
        const rowIndex = idx !== null ? idx : tbody.rows.length;
        const bgClass = rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-200';

        const tr = tbody.insertRow();
        tr.classList.add(bgClass); // Adiciona a classe de cor alternada
        tr.style.height = "15px";
        let tdNome = tr.insertCell();
        tdNome.className = 'nome border border-black';
        tdNome.style.width = "200px";
        let inputNome = document.createElement('input');
        inputNome.type = 'text';
        inputNome.value = nome;
        inputNome.className = 'input-nome w-full bg-transparent outline-none';
        tdNome.appendChild(inputNome);
        

        for (let dia = 1; dia <= diasNoMes; dia++) {
            const dataAtual = new Date(ano, mes - 1, dia);
            const diaSemana = dataAtual.getDay();
            let td = tr.insertCell();
            td.className = 'border border-black dia px-0 py-0';
            td.style.width = "15px";
            if (diaSemana === 0 || diaSemana === 6) td.classList.add('bg-gray-300');
            let input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 2;
            input.className = 'input-dia w-full text-center bg-transparent outline-none';
            
            // Adiciona o evento para aplicar estilos especiais
            input.addEventListener('input', function() {
                // Remove estilos anteriores
                input.style.color = '';
                input.style.backgroundColor = '';
                // Aplica estilos conforme o valor
                if (input.value.toUpperCase() === 'F') {
                    input.style.color = 'red';
                }
                else if (input.value.toUpperCase() === 'X') {
                    input.style.backgroundColor = 'yellow';
                }
            });
            td.appendChild(input);
        }

        // Autopreenchimento
        let tdAuto = tr.insertCell();
        tdAuto.className = 'border border-black autopreenchimento';
        tdAuto.style.width = "150px";
        let inp1 = document.createElement('input');
        inp1.type = 'text';
        inp1.maxLength = 2;
        inp1.className = 'border rounded px-1 py-0.5 w-10 mr-1 text-center text-xs';
        let inp2 = document.createElement('input');
        inp2.type = 'text';
        inp2.maxLength = 2;
        inp2.className = 'border rounded px-1 py-0.5 w-10 mr-1 text-center text-xs';
        let btn = document.createElement('button');
        btn.textContent = 'Auto';
        btn.className = 'bg-gray-400 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs';
        btn.onclick = function() {
            const tds = tr.querySelectorAll('td.dia input');
            for (let i = 0; i < tds.length; i++) {
            if (i % 2 === 0) tds[i].value = inp1.value;
            else tds[i].value = inp2.value;
            }
        };
        tdAuto.appendChild(inp1);
        tdAuto.appendChild(inp2);
        tdAuto.appendChild(btn);

        // Botão excluir linha
        let tdExcluir = tr.insertCell();
        tdExcluir.className = 'border border-black excluir';
        tdExcluir.style.width = "50px";
        let btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'X';
        btnExcluir.className = 'btn-excluir bg-red-600 hover:bg-red-800 text-white px-2 py-1 rounded text-xs ml-2';
        btnExcluir.onclick = function() {
            tr.remove();
        };
        tdExcluir.appendChild(btnExcluir);
    }

    function adicionarNovaTabela() {
        const data = document.getElementById('mes').value;
        if (!data) {
            alert('Escolha um mês!');
            return;
        }
        gerarTabela(data, document.getElementById('tabelas'));
    }