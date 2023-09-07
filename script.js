const gameboard = document.querySelector('#gameboard')
const result = document.querySelector('#result')
const restart = document.querySelector('#restart')

restart.addEventListener('click', () => {
  Gameboard.clearFields()
  DisplayController.updateDisplay()
})

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
  const clearFields = () => {
    fields = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
  }

  return { getFields, setField, clearFields }
})()

const DisplayController = (() => {
  const fields = Gameboard.getFields()
  const updateDisplay = () => {
    fields.forEach((line, i) => {
      line.forEach((field, index) => {
        gameboard.childNodes.forEach(node => node.textContent = field)
      })
    })
  }
  fields.forEach((line, i) => {
    line.forEach((field, index) => {
      const div = document.createElement('div')
      div.textContent = field
      div.addEventListener('click', () => {
        if (fields[i][index] === '') {
          Gameboard.setField(i, index)
          div.textContent = fields[i][index]
          Game.findWinner()
          Game.changeTurn()
        }
      })
      gameboard.appendChild(div)
    })
  })

  return { updateDisplay }
})()

const Game = (() => {
  let fields = Gameboard.getFields()
  const concatFields = () => {
    let array = []
    fields.forEach(line => {
      const newFields = array.concat(line)
      array = newFields
    })

    return array
  }
  const WINNER_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
  ]
  const changeTurn = () => turn === player1 ? turn = player2 : turn = player1
  const findWinner = () => {
    const newFields = concatFields()

    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo

      if (
        newFields[a] !== '' &&
        newFields[a] === newFields[b] &&
        newFields[a] === newFields[c]
      ) {
        const playerMarker = turn.getMarker()
        result.textContent = `Player ${playerMarker} win!`
        Gameboard.clearFields()
        DisplayController.updateDisplay()
      } else if (
        !newFields.includes('') && newFields[a] !== newFields[b] ||
        !newFields.includes('') && newFields[a] !== newFields[c]
      ) {
        result.textContent = 'Tie'
        Gameboard.clearFields()
        DisplayController.updateDisplay()
      }
    }
  }

  return { changeTurn, findWinner }
})()