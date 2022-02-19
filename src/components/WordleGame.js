import confetti from 'canvas-confetti'
import WORDS from '../assets/words.json'
import './WordleWord.js'
import './WordleKeyboard.js'
import './WordleSummary.js'

const LOSE_SOUND = new Audio('sounds/lose.mp3')
const WIN_SOUND = new Audio('sounds/win.mp3')

const LETTERS = [
  'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
  'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ',
  'z', 'x', 'c', 'v', 'b', 'n', 'm'
]

class WordleGame extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.startGame()
  }

  static get styles() {
    return `
      :host {
        --exact-color: #6aaa64;
        --exist-color: #c9b458;
        --used-color: #3a3a3c;
      }

      .container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 100vh;
      }

      h1 {
        text-transform: uppercase;
        border-bottom: 1px solid #555;
        margin-bottom: 0;
        color: Tomato;
      }

      h2 {
        font-weight: lighter;
        font-size: 1rem;
        text-align: center;
        margin-top: .5rem;
      }

      h2 a {
        color: Navy;
      font-weight: 400;
      }

      h2 a:hover {
        color: #a22;
 

      .words {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-weight: bold;
      }
    `
  }

  startGame() {
    const randomIndex = Math.floor(Math.random() * WORDS.length)
    this.secretWord = WORDS[randomIndex].toLowerCase()
    this.ending = false
  }

  connectedCallback() {
    this.render()
    this.currentWord = this.shadowRoot.querySelector('wordle-word[current]')
    this.keyboard = this.shadowRoot.querySelector('wordle-keyboard')
    document.addEventListener('keyup', (ev) => this.pushLetter(ev.key))
    document.addEventListener('keyboard', (ev) => this.pushLetter(ev.detail))
  }

  pushLetter(letter) {
    if (this.ending) { return }

    const key = letter.toLowerCase()
    const isEnter = key === 'enter'
    const isBackSpace = key === 'backspace'

    isEnter && this.checkRestrictions()
    isBackSpace && this.currentWord.removeLetter()

    const isLetter = LETTERS.includes(key)
    const isEmptyWord = this.currentWord.isEmpty()

    if (isLetter && isEmptyWord) {
      this.currentWord.addLetter(key)
    }
  }

  checkRestrictions() {
    const isEmpty = this.currentWord.isEmpty()
    if (isEmpty) {
      alert('La palabra consta de 5 letras')
      return
    }

    const word = this.currentWord.toString()
    const existentWord = WORDS.includes(word)
    if (!existentWord) {
      alert('No existe esta palabra en el diccionario')
      return
    }

    const solved = this.resolve()
    if (!solved) {
      this.nextWord()
      return
    }

    this.win()
  }

  resolve() {
    const word = this.currentWord.toString()
    const possibleLetters = word.split('')
    const secretLetters = this.secretWord.split('')

    possibleLetters.forEach((letter, index) => {
      const exactLetter = letter === this.secretWord[index]

      if (exactLetter) {
        this.currentWord.setExactLetter(index)
        this.keyboard.setLetter(letter, 'exact')
        secretLetters[index] = ' '
      }
    })

    possibleLetters.forEach((letter, index) => {
      const existLetter = secretLetters.includes(letter)

      if (existLetter) {
        this.currentWord.setExistLetter(index)
        this.keyboard.setLetter(letter, 'exist')
        const pos = secretLetters.findIndex(l => l === letter)
        secretLetters[pos] = ' '
      } else {
        this.keyboard.setLetter(letter, 'used')
      }
    })

    this.currentWord.classList.add('sended')
    this.currentWord.setRAELink(word)
    return this.currentWord.isSolved()
  }

  nextWord() {
    this.currentWord = this.shadowRoot.querySelector('wordle-word[current]')
    const nextWord = this.currentWord.nextElementSibling

    if (nextWord) {
      nextWord.setAttribute('current', '')
      this.currentWord.removeAttribute('current')
      this.currentWord = nextWord
      return
    }

    this.lose()
  }

  win() {
    WIN_SOUND.play()
    confetti()
    this.startSummary(true)
    this.ending = true
  }

  lose() {
    LOSE_SOUND.play()
    this.startSummary(false)
    this.ending = true
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${WordleGame.styles}</style>
      <div class="container">
        <header>
          <h1>Wordle</h1>
          <h2>Por: <a href="#">GabrielRIP</a></h2>
        </header>
        <div class="words">
          <wordle-word current></wordle-word>
          <wordle-word></wordle-word>
          <wordle-word></wordle-word>
          <wordle-word></wordle-word>
          <wordle-word></wordle-word>
          <wordle-word></wordle-word>
        </div>
        <wordle-keyboard></wordle-keyboard>
      </div>
    `
  }
}

customElements.define('wordle-game', WordleGame)
