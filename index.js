
class WebCalculator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open"});
        this._value = "0";
        window.test = this;

        this.initialRender();
        this.addEvents();
        this.styleVariables = this.shadowRoot.querySelector(".calculator").style;
    }
    static get observedAttributes() {  return ["theme"]; }

    attributeChangedCallback (name, oldVal, newVal) {
        console.log(`${name} changed to ${newVal} from ${oldVal}`)
        switch (name) {
            case "theme": 
                switch (newVal) {
                    case "dark":
                        this.styleVariables.setProperty("--display-background-color", "#333");
                        this.styleVariables.setProperty("--display-text-color", "white");

                        this.styleVariables.setProperty("--button-background-color", " #353C51");
                        this.styleVariables.setProperty("--button-text-color", "#fff");

                        this.styleVariables.setProperty("--operator-background-color", "#aa5c00");
                        this.styleVariables.setProperty("--operator-text-color", "white");

                        break;
                    default:
                        this.styleVariables.setProperty("--display-background-color", "#333");
                        this.styleVariables.setProperty("--display-text-color", "white");

                        this.styleVariables.setProperty("--button-background-color", "#F2F2F2");
                        this.styleVariables.setProperty("--button-text-color", "black");

                        this.styleVariables.setProperty("--operator-background-color", "orange");
                        this.styleVariables.setProperty("--operator-text-color", "white");
                }
                break;
            
        }
    }
    connectedCallback() { console.log("Added"); }
    disconnectedCallback() { console.log("Removed"); }

    addEvents() {
        this.addButtonEvents();
        this.addDotEvent();
        this.addEqualEvent();
        this.addOperatorsEvents();
    }
    addEqualEvent() {
        this.shadowRoot.querySelector("#equal")
            .addEventListener("click", () => console.log("Equals clicked"));
    }
    addOperatorsEvents() {

        this.shadowRoot.querySelector("#minus")
            .addEventListener("click", () => console.log("minus clicked"));
        this.shadowRoot.querySelector("#add")
            .addEventListener("click", () => console.log("add clicked"));
        this.shadowRoot.querySelector("#divide")
            .addEventListener("click", () => console.log("divide clicked"));
        this.shadowRoot.querySelector("#multiply")
            .addEventListener("click", () => console.log("multiply clicked"));
        this.shadowRoot.querySelector("#percent")
            .addEventListener("click", () => console.log("percent clicked"));
        this.shadowRoot.querySelector("#sign")
            .addEventListener("click", () => console.log("sign clicked"));
        this.shadowRoot.querySelector("#clear")
            .addEventListener("click", () => {
                this._value = '0';
                this.updateDisplay();
            });
    }
    addDotEvent() {

        const dot = () => {
            if (this._value.indexOf('.') === -1) {
                this.append('.');
            }
        }
        this.shadowRoot.querySelector(`#dot`)
                .addEventListener('click', dot);
    }
    append(number) {
        if (this._value.indexOf(".") === -1 && this._value === '0') {
            this._value = '';
        }
        if (this.operatorClicked) {
            this._value = '';
            this.operatorClicked = false;
        }
        this._value = `${this._value}${number}`;
        this.updateDisplay();
    }
    addButtonEvents() {
        const buttonEvent = (number) => () => this.append(number);
        [...Array(10).keys()]
            .forEach(i =>this.shadowRoot.querySelector(`#button-${i}`)
                            .addEventListener('click', buttonEvent(i)));
    }
    updateDisplay() {
        this.shadowRoot.querySelector(".display").textContent = this._value;
    }
    initialRender() {
        this.shadowRoot.innerHTML = `
            <div class="calculator">
                <div class="display">0</div>
                <div id="clear" class="btn">C</div>
                <div id="sign" class="btn">+/-</div>
                <div id="percent" class="btn">%</div>
                <div id="divide" class="btn operator">÷</div>
                <div id="button-7" class="btn">7</div>
                <div id="button-8" class="btn">8</div>
                <div id="button-9" class="btn">9</div>
                <div id="multiply" class="btn operator">x</div>
                <div id="button-4" class="btn">4</div>
                <div id="button-5" class="btn">5</div>
                <div id="button-6" class="btn">6</div>
                <div id="minus" class="btn operator">-</div>
                <div id="button-1" class="btn">1</div>
                <div id="button-2" class="btn">2</div>
                <div id="button-3" class="btn">3</div>
                <div id="add" class="btn operator">+</div>
                <div id="button-0" class="btn zero">0</div>
                <div id="dot" class="btn">.</div>
                <div id="equal" class="btn operator">=</div>
            </div>
            <style scoped>

                .calculator div::selection {
                    color: none;
                    background: none;
                }
                .calculator {
                    --display-background-color: #333;
                    --display-text-color: white;
                    
                    --button-background-color: #F2F2F2;
                    --button-text-color: black;
                    
                    --operator-background-color: orange;
                    --operator-text-color: white;
                }
                .calculator {
                    margin: 0 auto;
                    width: 400px;
                    font-size: 40px;
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    grid-auto-rows: minmax(50px, auto);
                    background-color: black;
                }
                .display {
                    grid-column: 1 / 5;
                    background-color: var(--display-background-color);
                    color: var(--display-text-color);
                }
                .zero {
                    grid-column: 1 / 3;
                }
                .btn {
                    background-color:var(--button-background-color);
                    color: var(--button-text-color);
                    cursor: pointer;
                    text-align: center;
                    border: 1px solid #999;
                }
                .operator {
                    background-color: var(--operator-background-color);
                    color: var(--operator-text-color);
                }
            </style>`
    }
}

window.customElements.define("web-calculator", WebCalculator);

