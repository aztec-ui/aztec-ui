# az-tree



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description | Type           | Default |
| ----------- | ----------- | ----------- | -------------- | ------- |
| `caption`   | `caption`   |             | `string`       | `''`    |
| `roots`     | --          |             | `AzTreeItem[]` | `[]`    |
| `selecting` | `selecting` |             | `boolean`      | `false` |


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




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
