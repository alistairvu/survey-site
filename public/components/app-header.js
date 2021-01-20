const styles = `
<style>
* {
  margin: 0;
  padding: 0;
}

.container {
  height: 7vh;
  display: flex;
  background-color: #4285f4;
  color: #f2f2f2;
  align-items: center;
}

.header {
  flex: 1;
  text-align: center;
  padding: 10px;
}

.links {
  flex: 9;
}

.link {
  color: white;
  text-decoration: none;
  padding: 10px;
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
      <h3 class="header">
        <a href="http://localhost:6960" class="link">
          askme
        </a>
      </h3>
      <div class="links">
        <a href="http://localhost:6960" class="link">Home</a>
        <a href="http://localhost:6960/ask" class="link">Ask</a>
      </div>
    </div>`
  }
}

window.customElements.define("app-header", AppHeader)
