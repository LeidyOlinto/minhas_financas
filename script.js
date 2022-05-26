
var transacoes = [];
var transacaoRaw = JSON.parse(localStorage.getItem('transacoes'))
if (transacaoRaw != null) {
    transacoes = transacaoRaw
} else {
    transacoes = [];
}
console.log(transacoes);
function envioFormulario(e) {

    console.log(e);
}
function desenhaTabela() {

    linhasTransacao = `  
        `;
    total = 0;
    for (linha of transacoes) {
        linhasTransacao += `
            <tr>
                <td>${linha.tipo} ${linha.nome}</td>
                
                <td class="valor">R$ ${linha.valor.toLocaleString('pt-BR')}</td>
            </tr>
            `;
        total += linha.valor * (linha.tipo == '-' ? -1 : 1)
    }
    totalSemsinal = total * (total >= 0 ? 1 : -1)
    document.querySelector('table').innerHTML = `
                    ${linhasTransacao}
                        <tr>
                            <td colspan="3" class="vt" id="lc"></td>

                        </tr>

                        <tr>
                            <td class="total-esquerda">Total</td>
                            <td class="valor-final">
                                R$ ${totalSemsinal.toLocaleString('pt-BR')}
                                </br>
            `
    if (total > 0) {
        document.querySelector('table').innerHTML += '<tr><td>[LUCRO]</td></tr>'
    }
    if (total < 0) {
        document.querySelector('table').innerHTML += '[PREJUIZO]'
    }
    document.querySelector('table').innerHTML += `
                        
 </td>
 </tr>
`;

}
function limparDados() {
    let userConfirm = confirm("Deseja mesmo remover todas as transações?");
    if (userConfirm == true) {
        transacoes = [];
        localStorage.setItem("transacoes", JSON.stringify([  
        ]))
      
     
    }

  
    desenhaTabela();
}
function deleteUser(p) {
    table.slice(p, 1);
    desenhaTabela();
    localStorage.setItem('table', JSON.stringify(table))
}

function addItem(item) {
    var objeto = {
        tipo: item.currentTarget.elements['operacao'].selectedIndex == 1 ? '-' : '+',
        nome: item.currentTarget.elements['nome'].value,
        valor: item.currentTarget.elements['valor'].value,
    }

    transacoes.push(objeto);
    localStorage.setItem("transacoes", JSON.stringify(transacoes));
    desenhaTabela();

}
    

