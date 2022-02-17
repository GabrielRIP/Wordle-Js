import WORDS from '../assets/words.json'
import './WordleWord.js'
import './WordleKeyboard.js'

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
      :host {}

      .container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 100vh;
      }

      h1 {
        text-transform: uppercase;
        color: Tomato;
      }

      .words {
        display: flex;
        flex-direction: column;
        font-weight: bold;
      }
    `
  }

  startGame() {
    const randomIndex = Math.floor(Math.random() * WORDS.length)
    this.secretWord = WORDS[randomIndex]
    this.ending = false
  }

  connectedCallback() {
    this.render()
    this.currentWord = this.shadowRoot.querySelector('wordle-word[current]')
    this.keyboard = this.shadowRoot.querySelector('wordle-keyboard')
    document.addEventListener('keyup', (ev) => this.pushLetter(ev.key))
  }

  pushLetter(letter) {
    if (this.ending) { return }

    const key = letter.toLowerCase()
    const isEnter = key === 'enter'
    const isBackSpace = key === 'backspace'

    if (isEnter) {
      // Check restrictions
    }

    if (isBackSpace) {
      // remove last letter
    }

    const isLetter = LETTERS.include(key)
    const isEmptyWord = this.currentWord.isEmpty()
    if (isLetter && isEmptyWord) {
      // add letter
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${WordleGame.styles}</style>
      <div class="container">
        <h1>wordle </h1>
        <div class="words">
          <wordle-word current></wordle-word>
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
