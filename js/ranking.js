// Função para recuperar os resultados do armazenamento local
const getResultsFromLocalStorage = () => {
  const savedResults = JSON.parse(localStorage.getItem("results")) || [];
  return savedResults;
};

const openOptionsModal = () => {
  const optionsModal = document.getElementById("optionsModal");
  optionsModal.style.display = "flex";
};

// Função para fechar o modal de opções
const closeOptionsModal = () => {
  const optionsModal = document.getElementById("optionsModal");
  optionsModal.style.display = "none";
};

const playAgain = () => {
  window.location = "game.html";
};

const changeUser = () => {
  window.location.href = "../index.html";
};

// Função para exibir o ranking na tela
const showRanking = () => {
  // Recupera os resultados do armazenamento local
  const savedResults = getResultsFromLocalStorage();

  // Obtém a referência do container do ranking
  const rankingContainer = document.getElementById("rankingContainer");

  // Verifica se há resultados para exibir
  if (savedResults.length > 0) {
    // Ordene os resultados pelo tempo (menor tempo primeiro)
    savedResults.sort((a, b) => parseInt(a.time) - parseInt(b.time));

    // Cria a estrutura HTML para exibir o ranking
    let rankingHTML = "<ul>";
    savedResults.forEach((result, index) => {
      rankingHTML += `<li>${index + 1}. ${result.player} - ${
        result.time
      } segundos</li>`;
    });
    rankingHTML += "</ul>";

    // Exibe o ranking no container
    rankingContainer.innerHTML = rankingHTML;
  } else {
    // Caso não haja resultados, exibe uma mensagem indicando que o ranking está vazio
    rankingContainer.innerHTML = "<p>O ranking está vazio.</p>";
  }
};

// Chama a função para exibir o ranking ao carregar a página
window.onload = showRanking;
