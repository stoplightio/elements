export class TryItElement extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('div');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);
    mountPoint.innerText = "Hi, I'm a web component!";
  }
}
