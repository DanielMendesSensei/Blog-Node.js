function enviarMensagem() {
    const mensagem = document.getElementById('mensagem').value;

    // Enviar solicitação AJAX
    fetch('/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mensagem: mensagem }),
    })
    .then(response => response.json())
    .then(data => exibirMensagem(data.mensagem))
    .catch(error => console.error('Erro:', error));
  }

  function exibirMensagem(mensagem) {
    const mensagemContainer = document.getElementById('mensagem-container');
    mensagemContainer.innerHTML = `<p>${mensagem}</p>`;
  }