# az-color-picker



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type     | Default  |
| --------- | --------- | ----------- | -------- | -------- |
| `caption` | `caption` |             | `string` | `''`     |
| `color`   | `color`   |             | `string` | `'#f00'` |


## Events

| Event     | Description | Type               |
| --------- | ----------- | ------------------ |
| `changed` |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- [az-slider](../slider)
- [az-input](../input)

### Graph
```mermaid
graph TD;
  az-color-picker --> az-slider
  az-color-picker --> az-input
  style az-color-picker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
