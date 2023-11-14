class MultiCheck extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      const shadowRoot = this.attachShadow({mode: 'open'});
      // render labels and radios
      for (let item of this.items){
        let item_id = this.id + "_" + item.replace(/ /g,"_");
        // need a unique input id
        let input = document.createElement("input")
        let label = document.createElement("label")
        label.innerText = item;
        label.htmlFor = item_id;
        label.dataset.value = item; // probably overkill
        input.id = item_id;
        input.type = "checkbox";
        input.dataset.value = item; // probably overkill
        input.value = item;
        input.name = this.id;
        input.onchange = this.changeHandler.bind(this)
        shadowRoot.appendChild(input)
        shadowRoot.appendChild(label)
      }
    }
    
    get id(){
      return this.attributes.getNamedItem('id').value;
    }

    set id(value){
      let a = document.createAttribute("id") 
      a.value = value;
      this.attributes.setNamedItem(a)
      return value
    }

    get items() {
        const items = [];
  
        for (let a of this.attributes){
          if (a.name.includes('item')) {
            items.push(a.value);
          }
        }
  
        return items;
    }

    get value(){
        let res = []
        this.shadowRoot.querySelectorAll('input[name=' + this.id + ']:checked').forEach(x=>{res.push(x.value)});
        return res
    }

    changeHandler(e){
      this.dispatchEvent(
        new Event("change")
      )
    }
}
  

customElements.define("multi-check", MultiCheck);
