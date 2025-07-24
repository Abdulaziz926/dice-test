const btnRoll = document.querySelector('.btn--roll')
const btnNew = document.querySelector('.btn--new')
const btnHold = document.querySelector('.btn--hold')
const diceImg = document.querySelector('.dice')

diceImg.style.display = 'none'

let currentScore = 0
let activePlayer = 0
let score = [0, 0]
let gameOver = true

const switchPlayer = () => {
	currentScore = 0
	document.getElementById(`current--${activePlayer}`).textContent = 0
	activePlayer = activePlayer === 0 ? 1 : 0
	document.querySelector('.player--0').classList.toggle('player--active')
	document.querySelector('.player--1').classList.toggle('player--active')
}

btnRoll.addEventListener('click', () => {
	if (gameOver) {
		diceImg.style.display = 'block'
		const rand = Math.floor(Math.random() * 6) + 1
		diceImg.src = `dice-${rand}.png`
		if (rand !== 1) {
			currentScore += rand
			document.getElementById(`current--${activePlayer}`).textContent =
				currentScore
		} else {
			switchPlayer()
		}
	}
})

btnHold.addEventListener('click', () => {
	if (gameOver) {
		score[activePlayer] += currentScore
		document.getElementById(`score--${activePlayer}`).textContent =
			score[activePlayer]
		if (score[activePlayer] >= 100) {
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.add('player--winner')
			gameOver = false
		} else {
			switchPlayer()
		}
	}
})

btnNew.addEventListener('click', () => {
	currentScore = 0
	activePlayer = 0
	score = [0, 0]
	gameOver = true
	diceImg.style.display = 'none'
	document.getElementById(`score--0`).textContent = 0
	document.getElementById(`score--1`).textContent = 0
	document.getElementById(`current--0`).textContent = 0
	document.getElementById(`current--1`).textContent = 0
	document.querySelector('.player--0').classList.add('player--active')
	document.querySelector('.player--1').classList.remove('player--active')
	document.querySelector('.player--0').classList.remove('player--winner')
	document.querySelector('.player--1').classList.remove('player--winner')
})

window.addEventListener('orientationchange', () => {
	location.reload()
})
