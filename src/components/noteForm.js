// Custom Elemen untuk NoteForm
class NoteForm extends HTMLElement {
    _shadowRoot = null;
    _style = null;
    constructor(){
        super();

        this._shadowRoot = this.attachShadow({ mode: "open" });
        this._style = document.createElement('style');

    }

    _updateStyle(){
        this._style.textContent = `
            note-form{
                display: block;
                justify-content: center;
            }
            input[type = text]{
                width: 100%;
                border: 2px solid #608da2 ;
                border-radius: 4px;
                padding: 10px;
                box-sizing: border-box;
                font: 24px;
                margin-bottom: 20px;
            }
            textarea {
                font-family: poppins;
                width: 100%;
                border: 2px solid #608da2 ;
                border-radius: 4px;
                padding: 10px;
                box-sizing: border-box;
                font: 24px;
                margin-bottom: 20px;
            }
            .action{
                cursor: pointer;
                width: fit-content;
                padding: 10px;
                border: 2px solid #608da2;
                color: black;
                font-size: 14px;
                border-radius: 4px;
            }
            .action:hover {
                background: #608da2;
                color: white;
            }
        `;
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = "";
    }

    connectedCallback() {
        this.render();
        this._shadowRoot
          .querySelector("#formNote")
          .addEventListener("submit", this._handleSubmit.bind(this));
      }

    _handleSubmit(event) {
        event.preventDefault();

        const judulNote = this._shadowRoot.querySelector('#judulNote').value;
        const isiNote = this._shadowRoot.querySelector('#isiNote').value;

        const generatedID = generateID();

        const noteBaru = {
            id: generatedID,
            title: judulNote,
            body: isiNote
        }

          this.dispatchEvent(new CustomEvent("addNewNote", {detail : noteBaru }));

          this._shadowRoot.querySelector('#judulNote').value = "";
          this._shadowRoot.querySelector('#isiNote').value = "";
    }

    render(){
        this._emptyContent();
        this._updateStyle();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `
            <form class=form id="formNote">
                <div>
                    <input type="text" id="judulNote" name="judul" placeholder="Judul"></input>
                    <textarea id="isiNote" name="isi" placeholder="Isi Note"></textarea>
                </div>
                <button class="action" type="submit"> Tambahkan </button>
            </form>
        `;
    }
}

customElements.define('note-form', NoteForm);

function generateID(){
  return +new Date();
}



