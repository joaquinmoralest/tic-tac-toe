const gameboard = document.querySelector('#gameboard')

const Gameboard = (() => {
  let fields = [
    ['x', 'o', 'x'],
    ['o', 'x', 'o'],
    ['x', 'o', 'x']
  ]
  const getFields = () => fields

  return { getFields }
})()

const DisplayController = (() => {
  Gameboard.getFields().forEach(line => {
    line.forEach(field => {
      const div = document.createElement('div')
      div.textContent = field
      gameboard.appendChild(div)
    })
  });
})()

const Player = (name, mark) => {
  const getName = () => name
  const getMark = () => mark

  return { getName, getMark }
}

const player1 = Player('Steve', 'x')
const player2 = Player('Jhon', 'o')

DisplayController