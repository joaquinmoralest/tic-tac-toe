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
  const setField = (line, field) => fields[line][field] = turn.getMarker()

  return { getFields, setField }
})()

const DisplayController = (() => {
  const fields = Gameboard.getFields()
  fields.forEach((line, i) => {
    line.forEach((field, index) => {
      const div = document.createElement('div')
      div.textContent = field
      div.addEventListener('click', () => {
        if (fields[i][index] === '') {
          Gameboard.setField(i, index)
          div.textContent = fields[i][index]
          Game.changeTurn()
          Game.findWinner()
        }
      })
      gameboard.appendChild(div)
    })
  })
})()

const Game = (() => {
  const changeTurn = () => turn === player1 ? turn = player2 : turn = player1
  const findWinner = () => {
    let winner
    let fields = Gameboard.getFields()

    for (const i of fields) {
      console.log(i[0])
    }
  }

  return { changeTurn, findWinner }
})()