//puchando a tabela do localStorage

var transacaoRaw = localStorage.getItem('transacao')
if(transacaoRaw != null){
    var transacao = JSON.parse(transacaoRaw)
}else {
var transacao = [];
}
 

// transacoes = 




    function desenhaTabela() {

        linhasTransacao = `  
        `;
        total = 0;
        for (linha of transacaoRaw) {
            linhasTransacao += `
            <tr>
                <td>${linha.tipo}</td>
                <td>${linha.nome} </td>
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
                                <br/>
            `
        if (total < 0) {
            document.querySelector('table').innerHTML += '[LUCRO]'
        }
        if (total > 0) {
            document.querySelector('table').innerHTML += '[PREJUIZO]'
        }
        document.querySelector('table').innerHTML += `
                        
 </td>
 </tr>
`;

    }

    function limparDados() {
        transacoes = [];
       
        desenhaTabela();

    }
    function deleteUser(p){
        table.slice(p ,1);
        desenhaTabela();
        localStorage.setItem('table', JSON.stringify(table))

    }
    
    function addItem(item){
        var objeto  = {
            tipo: item.currentTarget.elements['operacao'].selectedIndex == 1 ? '+': '-',
            nome: item.currentTarget.elements['nome'].value,
            valor:item.currentTarget.elements['valor'].value,

        }
       
        transacoes.push(objeto);       
         desenhaTabela();

    }

   