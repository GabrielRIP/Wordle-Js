const MAX_LETTERS = 5

class WordleKeyboard extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.word = ' '.repeat(MAX_LETTERS)
  }

  static get styles() {
    return `
      :host {
        --size-letter: 50px;
      }

      .container {
        display: flex;
      }

      .letter {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: var(--size-letter);
        height: var(--size-letter);
        border: 2px solid #404040;
        background: White;
        font-size: 2rem;
        margin: 2px;
        text-transform: uppercase;
      }
    `
  }

  isEmpty() {}

  connectedCallback() {
    this.render()
  }

  getTemplateLetters() {
    return this.word
      .split('')
      .map(letter => `<div class="letter">${letter}</div>`)
      .join('')
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${WordleKeyboard.styles}</style>
      <div class="container">
        ${this.getTemplateLetters()}
      </div>
    `
  }
}

customElements.define('wordle-word', WordleKeyboard)
