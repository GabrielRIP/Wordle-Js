import KEYBOARD_INITIAL_STATE from '../assets/keyboardState.json'

class WordleKeyboard extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.letters = KEYBOARD_INITIAL_STATE
  }

  static get styles() {
    return `
      :host {
        --size-letter: 33px;
      }
      .container {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        width: 415px;
        margin: 1rem 0;
      }

      .letter {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-family: Arial;
        font-weight: bold;
        text-transform: uppercase;
        width: var(--size-letter);
        height: var(--size-letter);
        border: 2px solid #ccc;
        margin: 3px 2px;
        border-radius: 5px;
      }

      .letter.special {
        width: 53.5px;
        color: #404040;
      }
    `
  }

  connectedCallback() {
    this.render()
  }

  getKeyboardInitial() {
    return this.letters
      .map(letter => `<div class="letter ${letter.state}">${letter.key}</div>`)
      .join('')
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${WordleKeyboard.styles}</style>
      <div class="container">
        ${this.getKeyboardInitial()}
      </div>
    `
  }
}

customElements.define('wordle-keyboard', WordleKeyboard)
