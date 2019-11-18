# az-tree



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute   | Description | Type              | Default                 |
| -------------- | ----------- | ----------- | ----------------- | ----------------------- |
| `activeItem`   | --          |             | `AzTreeItem`      | `null`                  |
| `caption`      | `caption`   |             | `string`          | `''`                    |
| `checkedItems` | --          |             | `Set<AzTreeItem>` | `new Set<AzTreeItem>()` |
| `roots`        | --          |             | `AzTreeItem[]`    | `[]`                    |
| `selecting`    | `selecting` |             | `boolean`         | `false`                 |


## Events

| Event       | Description | Type               |
| ----------- | ----------- | ------------------ |
| `collapsed` |             | `CustomEvent<any>` |
| `expanded`  |             | `CustomEvent<any>` |
| `inserted`  |             | `CustomEvent<any>` |
| `selected`  |             | `CustomEvent<any>` |


## Methods

### `addItem(itemOrCaption: string | AzTreeItem, parent?: number | AzTreeItem, attrs?: any) => Promise<AzTreeItem>`



#### Returns

Type: `Promise<AzTreeItem>`



### `fromJson(items: IAzTreeItem[]) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `removeItem(index: number) => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
