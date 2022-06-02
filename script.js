
//declaração de variaveis
var transacoes = [];
var linhasTransacao = ``;
var totalString = ``;
var transacaoRaw = JSON.parse(localStorage.getItem('transacoes'))

if (transacaoRaw != null) {
    transacoes = transacaoRaw
} else {
    transacoes = [];
}
console.log(transacoes);

function desenhaTabela() {
    //Tabela dinamica.
    total = 0;
    for (linha of transacoes) {
        linhasTransacao += `
            <tr>
                <td>${linha.tipo} ${linha.nome}</td>  
                <td class="valor">R$ ${linha.valor.toLocaleString('pt-BR',{minimumFractionDigits:2})}</td>
            </tr>
        `;
        total += linha.valor * (linha.tipo == '-' ? -1 : 1)
    }
    totalSemsinal = total * (total >= 0 ? 1 : -1)
    if (transacoes.length == 0) {
        totalString = `<h4 style="text-align: center;
        display: flow-root;">Nenhuma transação adicionada</h4>`;
    } else {
        totalString =
            `
                <thead>
                    <tr>
                        <th class="mercadoria-esquerda">Mercadoria</th>
                        <th class="valor">Valor</th>
                    </tr>
                </thead>
                ${linhasTransacao}
                <tr>
                    <td colspan="3" class="vt" id="lc"></td>
                </tr>
                <tr>
                    <td class="total-esquerda">Total</td>
                    <td class="valor-final">
                        R$ ${totalSemsinal.toLocaleString('pt-BR',{minimumFractionDigits:2})}
                        </br>
            `
        if (total > 0) {
            totalString += '<a style=" font-size: 10px;">[LUCRO]</a>'
        }
        if (total < 0) {
            totalString += '<a style=" font-size: 10px;">[PREJUIZO]</a>'
        }
        totalString += `
            </td>
        </tr>             
            `;
    }
    document.getElementById('tabela').innerHTML += totalString
}//limpar os dados da transação.
function limparDados() {
    let userConfirm = confirm("Deseja mesmo remover todas as transações?");
    if (userConfirm == true) {
        transacoes = [];
        localStorage.setItem("transacoes", JSON.stringify([
        ]))
        linhasTransacao = ``;
        totalString = ``;
        document.querySelector('table').innerHTML = '';

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
}
//Aqui fecha a aba do modal para telas de tablete e celular.
function fechaModal(){
    document.getElementsByClassName('modal-fechar')[0].style.display = 'none';
}
function abreModal(){
    document.getElementsByClassName('modal-fechar')[0].style.display = 'block';

}