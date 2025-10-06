const canvas = document.getElementById("roleta");
const ctx = canvas.getContext("2d");
const botao = document.getElementById("botao-girar");
const resultado = document.getElementById("resultado");

const segmentos = [
  { texto: "ALEGRIA", cor: "#FFD700" },
  { texto: "ORGULHO", cor: "#FFA500" },
  { texto: "CORAGEM", cor: "#FF4500" },
  { texto: "AMIZADE", cor: "#FF69B4" },
  { texto: "RESPEITO", cor: "#800080" },
  { texto: "GRATIDÃO", cor: "#1E90FF" },
  { texto: "SUPER-PODER", cor: "#20B2AA" },
  { texto: "MÚSICA", cor: "#32CD32" }
];

const raio = canvas.width / 2;
const anguloPorSegmento = (2 * Math.PI) / segmentos.length;
let anguloAtual = 0;
let girando = false;

function desenharRoleta() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < segmentos.length; i++) {
    const inicio = anguloAtual + i * anguloPorSegmento;
    const fim = inicio + anguloPorSegmento;

    ctx.beginPath();
    ctx.moveTo(raio, raio);
    ctx.arc(raio, raio, raio, inicio, fim);
    ctx.fillStyle = segmentos[i].cor;
    ctx.fill();

    // Texto
    ctx.save();
    ctx.translate(raio, raio);
    ctx.rotate(inicio + anguloPorSegmento / 2);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 14px Arial";
    ctx.fillText(segmentos[i].texto, raio * 0.6, 0);
    ctx.restore();
  }

  desenharSeta();
}

function desenharSeta() {
  const x = canvas.width;      // borda direita do canvas
  const y = raio;              // centro vertical

  ctx.beginPath();
  ctx.moveTo(x, y);            // ponta da seta
  ctx.lineTo(x - 30, y - 15);  // canto superior da base
  ctx.lineTo(x - 30, y + 15);  // canto inferior da base
  ctx.closePath();
  ctx.fillStyle = "#333";
  ctx.fill();
}
function girarRoleta() {
  if (girando) return;
  girando = true;

  let velocidade = Math.random() * 0.3 + 0.3;
  let desaceleracao = 0.005;

  const animacao = setInterval(() => {
    anguloAtual += velocidade;
    velocidade -= desaceleracao;

    if (velocidade <= 0) {
      clearInterval(animacao);
      girando = false;
      mostrarResultado();
    }

    desenharRoleta();
  }, 20);
}

function mostrarResultado() {
  const anguloFinal = anguloAtual % (2 * Math.PI);
  const indice = Math.floor(((2 * Math.PI - anguloFinal) % (2 * Math.PI)) / anguloPorSegmento);
  resultado.textContent = `Você caiu em: ${segmentos[indice].texto}`;
}

botao.addEventListener("click", girarRoleta);
desenharRoleta();
