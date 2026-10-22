// Define preços ilustrativos para demonstrar o funcionamento do sistema.

// Localiza o formulário de agendamento no documento HTML.
const formulario = document.getElementById("formAgendamento");

// Verifica se o formulário existe antes de executar o código.
// Isso evita erros em páginas que não possuem esse formulário.
if (formulario) {
    // Obtém o campo de seleção do serviço principal.
    const seletorServico = document.getElementById("servico");

    // Obtém todos os campos de seleção dos serviços adicionais.
    const adicionais = document.querySelectorAll(".adicional");

    // Obtém os elementos HTML que exibem os valores calculados.
    const textoServico = document.getElementById("servicoSelecionado");
    const textoAdicionais = document.getElementById("totalAdicionais");
    const textoTotal = document.getElementById("totalGeral");

    // Cria uma função para formatar números como valores monetários.
    // toLocaleString utiliza as convenções de formatação do Brasil.
    // BRL representa o real brasileiro.
    const formatarMoeda = (valor) =>
        valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    // Calcula e atualiza os preços do serviço principal e dos adicionais.
    function calcularTotal() {
        // Obtém a opção atualmente selecionada no menu.
        const opcao = seletorServico.options[seletorServico.selectedIndex];

        // Lê o preço definido no atributo data-price da opção.
        // Number converte o valor para número.
        // Se não houver preço, utiliza zero.
        const precoServico = Number(opcao.dataset.price || 0);

        // Inicializa a variável que acumula os preços dos adicionais.
        let totalAdicionais = 0;

        // Cria uma lista para armazenar os nomes e preços dos adicionais.
        const itensAdicionais = [];

        // Percorre todos os campos de serviços adicionais.
        adicionais.forEach((item) => {
            // Verifica se o adicional está marcado.
            if (item.checked) {
                // Obtém o preço do adicional selecionado.
                const preco = Number(item.dataset.price || 0);

                // Adiciona o preço ao total dos serviços adicionais.
                totalAdicionais += preco;

                // Armazena o nome e o preço formatado do adicional.
                itensAdicionais.push(
                    `${item.value} (${formatarMoeda(preco)})`
                );
            }
        });

        // Verifica se o usuário selecionou um serviço principal.
        if (seletorServico.value) {
            // Exibe o nome do serviço e seu preço formatado.
            // trim() remove espaços em branco no início e no fim do texto.
            textoServico.textContent =
                `${opcao.textContent.trim()} — ${formatarMoeda(precoServico)}`;
        } else {
            // Exibe uma orientação quando nenhum serviço foi selecionado.
            textoServico.textContent =
                "Selecione um serviço para ver o preço.";
        }

        // Exibe o valor total dos serviços adicionais selecionados.
        textoAdicionais.textContent = formatarMoeda(totalAdicionais);

        // Soma o preço do serviço principal aos preços dos adicionais.
        // Em seguida, exibe o resultado em formato monetário.
        textoTotal.textContent =
            formatarMoeda(precoServico + totalAdicionais);
    }

    // Adiciona um evento ao seletor do serviço principal.
    // Quando a seleção muda, os preços são recalculados.
    seletorServico.addEventListener("change", calcularTotal);

    // Adiciona um evento a cada serviço adicional.
    // Marcar ou desmarcar uma opção atualiza os valores exibidos.
    adicionais.forEach((item) =>
        item.addEventListener("change", calcularTotal)
    );

    // Detecta quando o usuário tenta enviar o formulário.
    formulario.addEventListener("submit", function (evento) {
        // Impede o comportamento padrão de envio do formulário,
        // evitando que a página seja recarregada.
        evento.preventDefault();

        // Verifica se todos os campos obrigatórios são válidos.
        if (!formulario.checkValidity()) {
            // Solicita ao navegador que apresente as mensagens de validação.
            formulario.reportValidity();

            // Interrompe a execução se houver campos inválidos.
            return;
        }

        // Obtém a opção do serviço principal selecionado.
        const opcao =
            seletorServico.options[seletorServico.selectedIndex];

        // Obtém o preço do serviço principal.
        const precoServico = Number(opcao.dataset.price || 0);

        // Converte os campos de adicionais em um array.
        // filter() mantém somente os adicionais marcados.
        // reduce() soma os preços desses adicionais.
        const totalAdicionais = Array.from(adicionais)
            .filter((item) => item.checked)
            .reduce(
                (soma, item) =>
                    soma + Number(item.dataset.price || 0),
                0
            );

        // Calcula o valor final somando o serviço principal
        // ao total dos serviços adicionais selecionados.
        const total = precoServico + totalAdicionais;

        // Cria uma lista de mensagens com os dados da solicitação.
        const confirmacao = [
            // Informa que a solicitação foi preparada.
            "Solicitação preparada!",

            // Obtém e apresenta o nome do responsável.
            `Responsável: ${document.getElementById("nome").value}`,

            // Obtém e apresenta o nome do animal.
            `Animal: ${document.getElementById("animal").value}`,

            // Apresenta o serviço principal selecionado.
            `Serviço: ${opcao.textContent.trim()}`,

            // Apresenta o preço total estimado.
            `Total estimado: ${formatarMoeda(total)}`,

            // Adiciona uma linha em branco para separar as informações.
            "",

            // Esclarece que a demonstração não envia os dados a uma clínica.
            "Este site é uma demonstração: a solicitação não foi enviada a uma clínica."
        ].join("\n");

        // Exibe a mensagem de confirmação em uma janela do navegador.
        alert(confirmacao);
    });

    // Executa o cálculo inicial assim que o código é carregado.
    // Isso permite apresentar os valores iniciais sem esperar uma interação.
    calcularTotal();
}
```
