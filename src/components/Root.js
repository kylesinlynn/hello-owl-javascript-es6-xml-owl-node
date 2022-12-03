import { Component, xml, useState } from "@odoo/owl"
import { Item } from './Item.js'
import { createItemStore } from '../store/ItemList.js'

export class Root extends Component {
  static template = xml`
    <div>
      <h1>Items</h1>

      <div>
      <input placeholder="Enter a new task" t-on-keyup="addItem"/>
      </div>

      <div t-foreach="activeItems" t-as="item" t-key="item.id">
        <Item item="item" changeDone="state.changeDone" deleteItem="state.deleteItem" updateItem="state.updateItem" /> 
      </div>
    </div>
  `

  static components = { Item }

  setup() {
    this.state = useState(createItemStore())
  }

  addItem(e) {
    if (e.keyCode === 13) {
      this.state.createItem(e.target.value)
      e.target.value = ''
    }
  }

  get activeItems() {
    return this.state.items.filter(i => i.active)
  }

}