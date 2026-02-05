function fnMontarCardProduto(produto){
    let cartao = `
        <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-3">
                <div class="card">
                    <img src="${produto.foto}"
                        class="card-img-top" alt="${produto.nome}">
                    <div class="card-body">
                        <h5 class="card-title">${produto.titulo}</h5>
                        <p class="card-text">${produto.descricao}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 mb-0">R$ ${produto.preco}</span>
                            <div>
                                <i class="bi bi-star-fill text-warning"></i>
                                <i class="bi bi-star-fill text-warning"></i>
                                <i class="bi bi-star-fill text-warning"></i>
                                <i class="bi bi-star-fill text-warning"></i>
                                <i class="bi bi-star text-warning"></i>
                                <small class="text-muted">(${produto.avaliacao})</small>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-between bg-light">
                        <button class="btn btn-primary btn-sm">Comprar</button>
                        <button class="btn btn-outline-secondary btn-sm"><i class="bi bi-heart"></i></button>
                    </div>
                </div>
            </div>
    `
    document.querySelector(".lista-produtos").innerHTML += cartao
}

function fnCarregarDados() {
    fetch('http://localhost:3000/produtos/', { method: 'GET' })
    .then(response => response.json())
    .then((produtos) => {
        produtos.forEach(produto => {
            fnMontarCardProduto(produto)
        });
    })
    .catch(erro => console.log(erro.message))
}
fnCarregarDados()

const axios = require('axios');
const qs = require('qs');

exports.handler = async function(context, event, callback) {
    // 1. URL do seu Power Automate (Já configurada)
    const CRM_URL = 'https://640a5fe45a8be405badc6d2e67bade.e1.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/315d8dd84f0a41faa69ad85ad3dadc81/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=leOnNnNfcy4OrZ2sDsIomsUNdnmrkjJmYChVfdgZ11I';

    // 2. URL DO SEU BOT (Copilot Studio ou Webhook do Omnichannel)
    // Você deve colar aqui a URL que estava antes no Webhook da Twilio
    const BOT_URL = 'https://m-b0caf677-d172-f311-8587-6045bd3beeea.br.omnichannelengagementhub.com/twillio/incoming?orgId=b0caf677-d172-f311-8587-6045bd3beeea';

    const twiml = new Twilio.twiml.MessagingResponse();

    // LÓGICA 1: Se for LOCALIZAÇÃO
    if (event.MessageType === 'location' || event.Latitude) {
        const payload = {
            From: event.From,
            To: event.To,
            Latitude: event.Latitude,
            Longitude: event.Longitude,
            SmsSid: event.SmsSid || event.MessageSid,
            Body: `📍 Localização: http://googleusercontent.com/maps.google.com/7${event.Latitude},${event.Longitude}`
        };

        try {
            // Envia para o Power Automate em segundo plano
            await axios.post(CRM_URL, qs.stringify(payload), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            
            // Avisa o Bot que a localização chegou para que ele responda ao cliente
            twiml.redirect(BOT_URL);
            return callback(null, twiml);
        } catch (err) {
            console.error("Erro no processamento:", err.message);
            twiml.redirect(BOT_URL);
            return callback(null, twiml);
        }
    }

    // LÓGICA 2: Se for "OI" ou qualquer TEXTO (Pass-Through)
    // Isso faz o bot "acordar" porque a Function repassa a mensagem
    twiml.redirect(BOT_URL);
    return callback(null, twiml);
};