// Os preços são ilustrativos e servem para demonstrar o funcionamento.

// Localiza o formulário de agendamento pelo seu ID.
const formulario = document.getElementById("formAgendamento");

// Só executa a lógica se o formulário existir nesta página.
if (formulario) {
    // Localiza o seletor do serviço principal.
    const seletorServico = document.getElementById("servico");

    // Localiza todos os adicionais que podem ser selecionados.
    const adicionais = document.querySelectorAll(".adicional");

    // Localiza os elementos que mostram os preços na página.
    const textoServico = document.getElementById("servicoSelecionado");
    const textoAdicionais = document.getElementById("totalAdicionais");
    const textoTotal = document.getElementById("totalGeral");

    // Converte números para o formato monetário brasileiro.
    const formatarMoeda = (valor) =>
        valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    // Calcula o preço do serviço, os adicionais e o total.
    function calcularTotal() {
        // Obtém a opção selecionada no menu de serviços.
        const opcao = seletorServico.options[seletorServico.selectedIndex];

        // Lê o preço armazenado no atributo data-price.
        const precoServico = Number(opcao.dataset.price || 0);

        // Inicializa a soma dos adicionais.
        let totalAdicionais = 0;

        // Guarda os nomes e os preços dos adicionais selecionados.
        const itensAdicionais = [];

        // Percorre todos os adicionais disponíveis.
        adicionais.forEach((item) => {
            // Considera apenas os itens marcados.
            if (item.checked) {
                // Obtém o preço do adicional selecionado.
                const preco = Number(item.dataset.price || 0);

                // Soma o preço ao total dos adicionais.
                totalAdicionais += preco;

                // Registra o nome e o preço do item.
                itensAdicionais.push(
                    `${item.value} (${formatarMoeda(preco)})`
                );
            }
        });

        // Atualiza a descrição do serviço escolhido.
        if (seletorServico.value) {
            textoServico.textContent =
                `${opcao.textContent.trim()} — ${formatarMoeda(precoServico)}`;
        } else {
            // Orienta o usuário caso nenhum serviço tenha sido escolhido.
            textoServico.textContent =
                "Selecione um serviço para ver o preço.";
        }

        // Exibe a soma dos adicionais.
        textoAdicionais.textContent = formatarMoeda(totalAdicionais);

        // Exibe o total do serviço principal mais os adicionais.
        textoTotal.textContent =
            formatarMoeda(precoServico + totalAdicionais);
    }

    // Recalcula os preços quando o serviço principal muda.
    seletorServico.addEventListener("change", calcularTotal);

    // Recalcula os preços sempre que um adicional é marcado ou desmarcado.
    adicionais.forEach((item) =>
        item.addEventListener("change", calcularTotal)
    );

    // Intercepta o envio do formulário.
    formulario.addEventListener("submit", function (evento) {
        // Impede o recarregamento da página.
        evento.preventDefault();

        // Verifica se os campos obrigatórios são válidos.
        if (!formulario.checkValidity()) {
            // Mostra as mensagens de validação do navegador.
            formulario.reportValidity();
            return;
        }

        // Obtém o serviço selecionado.
        const opcao =
            seletorServico.options[seletorServico.selectedIndex];

        // Lê o preço do serviço.
        const precoServico = Number(opcao.dataset.price || 0);

        // Soma os preços de todos os adicionais marcados.
        const totalAdicionais = Array.from(adicionais)
            .filter((item) => item.checked)
            .reduce(
                (soma, item) =>
                    soma + Number(item.dataset.price || 0),
                0
            );

        // Calcula o valor final.
        const total = precoServico + totalAdicionais;

        // Monta a mensagem de confirmação com os dados informados.
        const confirmacao = [
            "Solicitação preparada!",
            `Responsável: ${document.getElementById("nome").value}`,
            `Animal: ${document.getElementById("animal").value}`,
            `Serviço: ${opcao.textContent.trim()}`,
            `Total estimado: ${formatarMoeda(total)}`,
            "",
            "Este site é uma demonstração: a solicitação não foi enviada a uma clínica."
        ].join("\n");

        // Exibe a confirmação em uma janela do navegador.
        alert(confirmacao);
    });

    // Calcula os valores iniciais assim que o script é executado.
    calcularTotal();
}
