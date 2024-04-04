//Custom Element untuk NoteItem
class NoteItem extends HTMLElement {
    _shadowRoot = null;
    _style = null;
    _note = {
        id: null,
        title: null,
        body: null
    }
    constructor(){
        super();

        this._shadowRoot = this.attachShadow({ mode: "open" });
        this._style = document.createElement('style');
    }

    set note(value){
        this._note = value

        this.render();
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = "";
    }

    get getNote() {
        return this._note;
    }

    _updateStyle(){
        this._style.textContent = `
            .list {
                display: grid;
                grid-template-columns : 1fr 1fr;
                padding-top: 30px;

                gap: 10px;
            }
            .card{
                padding : 20px;
                border: 2px solid black;
                border-radius: 4px;

                gap: 10px;
            }
            note-item {
                padding: 20px 40px;
                display: block;

                border: 2px solid black;
                border-radius: 4px;
            }

            .note__judul {
                margin-block-start: 0;
                margin-block-end: 1rem;

                font-size: 24px;
                font-weight: bold;
            }

            .isi_note{
                margin-block-start: 0;
                margin-block-end: 1rem;
                font-size: 18px;
                font-weight: normal;
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

    render(){
        this._emptyContent();
        this._updateStyle();

        // const note = this._note;
        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `
        
            <div class="list">
            ${this._note
                .map(
                    (note) => `
                    <div class="card">
                        <div id = "noteItem" data-id="${note.id}">
                            <h2 class="note__judul">${note.title}</h2>
                            <p class="isi_note">${note.body}</p>
                            <div>
                                <button class=action id=""${note.id}>Hapus Note</button>
                            </div>
                        </div>
                    </div>
                    `,
                )
                .join("")}
            </div>
        
        `;
    }
}

customElements.define('note-item', NoteItem);