# az-contextual-menu



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute      | Description | Type     | Default         |
| -------------- | -------------- | ----------- | -------- | --------------- |
| `caption`      | `caption`      |             | `string` | `''`            |
| `closedelay`   | `closedelay`   |             | `number` | `500`           |
| `closeevent`   | `closeevent`   |             | `string` | `''`            |
| `parent`       | `parent`       |             | `string` | `'body'`        |
| `popupalign`   | `popupalign`   |             | `string` | `''`            |
| `triggerevent` | `triggerevent` |             | `string` | `'contextmenu'` |


## Events

| Event    | Description | Type               |
| -------- | ----------- | ------------------ |
| `showed` |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- [az-menu-item](../menu-item)

### Graph
```mermaid
graph TD;
  az-contextual-menu --> az-menu-item
  az-menu-item --> az-icon
  style az-contextual-menu fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
