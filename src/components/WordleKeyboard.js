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
        --width-letter: 28px;
        --height-letter: 35px;
      }
      .container {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 8px 3px;
        width: 360px;
        margin: 1rem 0;
      }

      .letter {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-family: Arial;
        background: #777;
        color: #fff;
        font-weight: bold;
        text-transform: uppercase;
        width: var(--width-letter);
        height: var(--height-letter);
        border: 2px solid #ccc;
        border-radius: 5px;
        cursor: pointer;
        user-select: none;
      }

      .letter.special {
        width: 46.5px;
        color: Navy;
        font-size: .8em;
      }

      .letter.used {
        background: var(--used-color);
        color: #fff;
      }

      .letter.exist {
        background: var(--exist-color);
        color: #fff;
      }

      .letter.exact {
        background: var(--exact-color);
        color: #fff;
      }
    `
  }

  setLetter(key, state) {
    const letter = this.letters.find(letter => letter.key === key)
    if (letter.state !== 'exact') {
      letter.state = state
    }
    this.render()
  }

  sendListeners() {
    const keys = Array.from(this.shadowRoot.querySelectorAll('.letter'))
    keys.forEach(key => {
      key.addEventListener('click', () => {
        const detail = key.textContent.replace('NEXT', 'enter').replace('BACK', 'backspace')
        const optionsEvent = {
          detail,
          bubbles: true,
          composed: true
        }
        const evento = new CustomEvent('keyboard', optionsEvent)
        this.dispatchEvent(evento)
      })
    })
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
    this.sendListeners()
  }
}

customElements.define('wordle-keyboard', WordleKeyboard)
