// Jogador: 'O' ou 'X'
let jogador = 'O'

const botao0x0 = document.getElementById('botao0x0')
const botao0x1 = document.getElementById('botao0x1')
const botao0x2 = document.getElementById('botao0x2')
const botao1x0 = document.getElementById('botao1x0')
const botao1x1 = document.getElementById('botao1x1')
const botao1x2 = document.getElementById('botao1x2')
const botao2x0 = document.getElementById('botao2x0')
const botao2x1 = document.getElementById('botao2x1')
const botao2x2 = document.getElementById('botao2x2')

const elJogador = document.getElementById('jogador')

// Mapa do jogo
let jogo = [
    ['-','-','-'],
    ['-','-','-'],
    ['-','-','-'],
]

const mapaBotoes = [
    [botao0x0, botao0x1, botao0x2],
    [botao1x0, botao1x1, botao1x2],
    [botao2x0, botao2x1, botao2x2],
]

function reiniciar() {
    jogo = [
        ['-','-','-'],
        ['-','-','-'],
        ['-','-','-'],
    ]

    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            mapaBotoes[x][y].innerHTML = '-'
            mapaBotoes[x][y].disabled = false              
        }
    }

}

// Faz a jogada e verifica o resultado
function fazerJogada(x,y) {
    
    const botao = mapaBotoes[x][y]
    
    jogo[x][y] = jogador
    botao.innerHTML = jogador
    botao.disabled = true
    
    const resultado = verificaResultado()

    if(resultado != '-') {
        // Cria o anuncio do resultado e o botao de reiniciar        
        const anuncioDoReultado = document.createElement('span')
        if(resultado == 'E') { 
            anuncioDoReultado.innerHTML = 'O jogo acabou em empate'   
        } else {
            anuncioDoReultado.innerHTML = '"' + resultado + '" ganhou o jogo'
        }

        const botaoDeReiniciar = document.createElement('button')
        botaoDeReiniciar.innerHTML = 'REINICIAR'

        botaoDeReiniciar.onclick = function() {
            document.body.removeChild(anuncioDoReultado)
            document.body.removeChild(botaoDeReiniciar)
            
            reiniciar()
        }


        document.body.appendChild(anuncioDoReultado)
        document.body.appendChild(botaoDeReiniciar)

        // Desabilita todos os botoes
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                mapaBotoes[x][y].disabled = true           
            }
        }

        // Bota o jogador inicial como "O"
        jogador = 'O'    
        elJogador.innerHTML = jogador
        return
    }

    // Troca o jogador no final do turno
    if(jogador == 'X') {
        jogador = 'O'
    } else if(jogador == 'O') {
        jogador = 'X'
    }
        
    elJogador.innerHTML = jogador
}

function verificaResultado() {
    const ganhador = verificarGanhador()
    
    // Verificador de empates
    let ehEmpate = true
    
    // Se algum dos valores estiverem vazios não pode ser empate
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            if(jogo[x][y] == '-') {
                ehEmpate = false
            }           
        }
    }

    if(ganhador == '-' && ehEmpate) {
        return 'E'
    }

    return ganhador
}

function verificarGanhador() {
    let ganhador = '-'

    for(let x = 0; x < 3; x++) {
        const xFazLinhaVertical = jogo[0][x] == 'X' && jogo[1][x] == 'X' && jogo[2][x] == 'X'
        const oFazLinhaVertical = jogo[0][x] == 'O' && jogo[1][x] == 'O' && jogo[2][x] == 'O'
        
        if(xFazLinhaVertical) {
            ganhador = 'X'
            break
        }

        if(oFazLinhaVertical) {
            ganhador = 'O'
            break
        }
    }

    for(let y = 0; y < 3; y++) {
        const xFazLinhaHorizontal = jogo[y][0] == 'X' && jogo[y][1] == 'X' && jogo[y][2] == 'X'
        const oFazLinhaHorizontal = jogo[y][0] == 'O' && jogo[y][1] == 'O' && jogo[y][2] == 'O'
        
        if(xFazLinhaHorizontal) {
            ganhador = 'X'
            break
        }

        if(oFazLinhaHorizontal) {
            ganhador = 'O'
            break
        }
    }

    // Verificar diagonais
    const xFazDiagonalDescendente = jogo[0][0] == 'X' && jogo[1][1] == 'X' && jogo[2][2] == 'X'
    const xFazDiagonalCrescente = jogo[2][0] == 'X' && jogo[1][1] == 'X' && jogo[0][2] == 'X'

    if(xFazDiagonalCrescente || xFazDiagonalDescendente) {
        ganhador = 'X'
    }

    const oFazDiagonalDescendente = jogo[0][0] == 'O' && jogo[1][1] == 'O' && jogo[2][2] == 'O'
    const oFazDiagonalCrescente = jogo[2][0] == 'O' && jogo[1][1] == 'O' && jogo[0][2] == 'O'

    if(oFazDiagonalCrescente || oFazDiagonalDescendente) {
        ganhador = 'O'
    }

    return ganhador
    
}

elJogador.innerHTML = jogador