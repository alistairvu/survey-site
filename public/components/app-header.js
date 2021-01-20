const styles = `
<style>
* {
  margin: 0;
  padding: 0;
}

.container {
  background-color: #36483f;
  color: #f6f6f7
}
</style>`

class AppHeader extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: "open" })
  }

  connectedCallback() {
    this._shadowRoot.innerHTML = `
    ${styles} 
    <div class="container">
      <h3>Header</h3>
      <a href="http://localhost:6960">Home</a>
      <a href="http://localhost:6960/ask">Ask</a>
    </div>`
  }
}

window.customElements.define("app-header", AppHeader)
