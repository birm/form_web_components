// MultiRadio -- interact with multiple radios as if they were one
// constructed with a list of items (attributes including "item" in their names) and renders a radio in one name for each. this.value returns the value of the checked box
class MultiRadio extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      const shadowRoot = this.attachShadow({mode: 'open'});
      // render labels and radios
      for (let item of this.items){
        let item_id = this.id + "_" + item.replace(/ /g,"_");
        // need a unique input id
        console.log("should have id", this.id)
        let input = document.createElement("input")
        let label = document.createElement("label")
        label.innerText = item;
        label.htmlFor = item_id;
        label.dataset.value = item; // probably overkill
        input.id = item_id;
        input.type = "radio";
        input.dataset.value = item; // probably overkill
        input.value = item;
        input.name = this.id;
        shadowRoot.appendChild(input)
        shadowRoot.appendChild(label)
      }
      console.log(shadowRoot)
    }
    
    get id(){
        return this.attributes.getNamedItem('id').value;
    }

    get items() {
        console.log(this.attributes)
        const items = [];
  
        for (let a of this.attributes){
            console.log(a)
          if (a.name.includes('item')) {
            items.push(a.value);
          } else {
            console.log('skipped', a.name)
          }
        }
  
        return items;
    }

    get value(){
        let res = this.shadowRoot.querySelector('input[name=' + this.id + ']:checked')
        if (res){
            return res.value
        } else {
            return null
        }
    }
}
  

customElements.define("multi-radio", MultiRadio);
