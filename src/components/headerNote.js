class headerNote extends HTMLElement {
    constructor(){
        super();

        this._style = document.createElement('style');
    }

    updateStyle(){
        this._style.textContent=`
            nav-header {
                padding: 20px 50px;
                background-color: #aad2d8;
                width: auto;
                display: flex;
                justify-content: center;
                font-weight: bold;
            }
        `;
    }

    connectedCallback(){
        this.render();
    }

    render(){
        this.updateStyle();
        this.innerHTML = `
            ${this._style.outerHTML}
            <nav>
               <span>Note Apps</span>
            </nav>
        `;
    }
}

customElements.define('nav-header', headerNote);