# az-dialog



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type      | Default |
| --------- | --------- | ----------- | --------- | ------- |
| `caption` | `caption` |             | `string`  | `''`    |
| `fixed`   | `fixed`   |             | `boolean` | `false` |


## Events

| Event    | Description | Type               |
| -------- | ----------- | ------------------ |
| `closed` |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- [az-icon](../icons)
- [az-button](../button)

### Graph
```mermaid
graph TD;
  az-dialog --> az-icon
  az-dialog --> az-button
  az-button --> az-icon
  style az-dialog fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
