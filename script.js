const gameboard = document.querySelector('#gameboard')

const Player = (name, mark) => {
  const getName = () => name
  const getMarker = () => mark
  let isPlaying = false
  const play = () => {
    isPlaying = true
    return isPlaying
  }

  return { getName, getMarker, play }
}

const player1 = Player('Steve', 'X')
const player2 = Player('David', 'O')
let turn = player1

const Gameboard = (() => {
  let fields = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]
  const getFields = () => fields

  return { getFields }
})()

const Game = (() => {
  const changeTurn = () => turn === player1 ? turn = player2 : turn = player1

  return { changeTurn }
})()

const DisplayController = (() => {
  Gameboard.getFields().forEach(line => {
    line.forEach(field => {
      const div = document.createElement('div')
      div.textContent = field
      div.addEventListener('click', () => {
        div.textContent = turn.getMarker()
        Game.changeTurn()
      })
      gameboard.appendChild(div)
    })
  });
})()

