/**
 * ==========================================================================
 * Lógica do Web App EcoMIP - Monitoramento e Análise de Pragas
 * Componente Curricular: Programação Front-End / Concurso Agrinho 2026
 * ==========================================================================
 */

// 1. Captura e mapeamento dos elementos do DOM usando document.querySelector
const botaoCalcular = document.querySelector('#btn-calcular');
const inputArea = document.querySelector('#area-total');
const inputPragas = document.querySelector('#total-pragas');
const containerResultado = document.querySelector('#mensagem-resultado');

// 2. Adição do escutador de eventos (Event Listener) para o clique do botão
botaoCalcular.addEventListener('click', processarMonitoramento);

/**
 * Função principal que valida as entradas e processa as regras de negócio do MIP
 */
function processarMonitoramento() {
    // Captura os valores atuais digitados e converte para números flutuantes/inteiros
    const area = parseFloat(inputArea.value);
    const pragas = parseInt(inputPragas.value, 10);

    // ==========================================================================
    // VALIDACAO ESTRITA: Intercepção de dados inconsistentes ou vazios
    // ==========================================================================
    if (isNaN(area) || isNaN(pragas)) {
        exibirMensagem('Por favor, preencha todos os campos do formulário antes de continuar.', 'msg-erro');
        return; // Interrompe a execução para evitar cálculos incorretos
    }

    if (area <= 0) {
        exibirMensagem('A área inspecionada deve ser um número maior do que zero.', 'msg-erro');
        return;
    }

    if (pragas < 0) {
        exibirMensagem('A quantidade total de pragas não pode ser um número negativo.', 'msg-erro');
        return;
    }

    // ==========================================================================
    // PROCESSAMENTO / REGRA DE NEGÓCIO (Cálculo Ecológico)
    // ==========================================================================
    // Define a média de pragas por hectare
    const pragasPorHectare = (pragas / area).toFixed(1);
    
    // Regra conceitual do MIP: se houver mais de 10 pragas por hectare, o nível de ação foi atingido
    const limiteSeguroMIP = 10; 

    // ==========================================================================
    // RENDERIZAÇÃO ELEGANTE DIRETAMENTE NA TELA (UI/UX)
    // ==========================================================================
    if (pragasPorHectare > limiteSeguroMIP) {
        // Cenário de Alerta Alto: Necessita de intervenção ecológica (Controle Biológico)
        containerResultado.innerHTML = `
            <div class="msg-alerta-alto">
                <p>⚠️ <strong>Atenção: Nível de Ação Atingido!</strong></p>
                <p>A densidade atual é de <strong>${pragasPorHectare} pragas por hectare</strong>.</p>
                <p><em>Recomendação:</em> Inicie o monitoramento constante e utilize o controle biológico para reequilibrar a lavoura, reduzindo o uso de insumos químicos e poupando recursos financeiros.</p>
            </div>
        `;
    } else {
        // Cenário Sustentável: Lavoura equilibrada
        containerResultado.innerHTML = `
            <div class="msg-sustentavel">
                <p>🌱 <strong>Equilíbrio Ecológico Mantido!</strong></p>
                <p>A densidade está controlada em <strong>${pragasPorHectare} pragas por hectare</strong>.</p>
                <p><em>Status:</em> Sua produção de grãos está operando de forma sustentável e segura. Continue monitorando regularmente para garantir as diretrizes do <strong>Programa Agropecuária 2030</strong>.</p>
            </div>
        `;
    }
}

/**
 * Função utilitária para renderizar avisos de erro ou validação na tela do usuário
 * @param {string} texto - A mensagem de orientação que o usuário lerá
 * @param {string} classeCss - A classe de estilo correspondente definida no CSS
 */
function exibirMensagem(texto, classeCss) {
    containerResultado.innerHTML = `
        <div class="${classeCss}">
            <p><strong>Erro de Entrada:</strong> ${texto}</p>
        </div>
    `;
}
