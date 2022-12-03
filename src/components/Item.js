import { Component, xml, useState } from '@odoo/owl'

export class Item extends Component {
    static template = xml`
        <div>
            <p>
                <span t-if="state.update">
                    <input type="text"
                        t-att-id="props.item.id"
                        t-attf-value="{{ props.item.text }}"
                        t-on-change="updateItem" />
                </span>
                <span t-else="">
                    <span t-attf-class="{{props.item.done ? 'done': ''}}">
                        <t t-out='props.item.text' /> 
                    </span>
                </span>
                
                <input type='checkbox'
                    t-att-id='props.item.id'
                    t-att-checked='props.item.done'
                    t-on-click='_ => props.changeDone(props.item)' />
                
                <button t-on-click="_ => props.deleteItem(props.item)">Delete</button>

                <span t-if="state.update">
                    <button t-on-click="toggleUpdate">Save</button>
                </span>
                <span t-else="">
                    <button t-on-click="toggleUpdate">Update</button>
                </span>
            </p>
        </div>
    `

    static props = ['item', 'changeDone', 'deleteItem', 'updateItem']

    toggleUpdate() {
        this.state.update = !this.state.update
    }

    updateItem(e) {
        this.props.updateItem(this.props.item, e.target.value)
    }

    setup() {
        this.state = useState({ text: this.props.text, update: false })
    }
}