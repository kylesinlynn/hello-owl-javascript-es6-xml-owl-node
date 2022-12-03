import { reactive } from '@odoo/owl'

export class ItemList {

    // class constructor
    constructor(items) {
        this.items = items || []
        const itemIds = this.items.map(i => i.id)
        this.nextId = itemIds.length ? Math.max(...itemIds) + 1: 1
    }

    // create item method
    createItem(text) {
        const item = {
            id: this.nextId++,
            text: text,
            done: false,
            active: true
        }
        this.items.push(item)
    }

    // change completion method
    changeDone(item) {
        this.item.done = !item.done
    }

    // update item method
    updateItem(item, updateText) {
        this.item.text = updateText
    }

    // delete item method
    deleteItem(item) {
        // const index = this.items.findIndex(t => t.id === item.id)
        // this.items.splice(index, 1)
        this.item.active = false
    }

}

export function createItemStore() {
    const saveItems = () => localStorage.setItem('todoitems', JSON.stringify(itemStore.items))
    const initialItems = JSON.parse(localStorage.getItem('todoitems') || '[]')

    const itemStore = reactive(new ItemList(initialItems), saveItems)
    saveItems()

    return itemStore
}