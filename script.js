
//declaração de variaveis
var transacoes = [];
var linhasTransacao = ``;
var totalString=``;
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
   totalString = `
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
        totalString +='<a style=" font-size: 10px;">[LUCRO]</a>'
    }
    if (total < 0) {
        totalString += '<a style=" font-size: 10px;">[PREJUIZO]</a>'
    }
    totalString += `
      </td>
      </tr>             
`;
document.querySelector('table').innerHTML += totalString
}
function limparDados() {
    let userConfirm = confirm("Deseja mesmo remover todas as transações?");
    if (userConfirm == true) {
        transacoes = [];
        localStorage.setItem("transacoes", JSON.stringify([  
        ]))
        linhasTransacao = ``;
         totalString=``;
         document.querySelector('table').innerHTML ='';
        
    desenhaTabela();
     
     
    }
  
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
    

