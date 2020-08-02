# az-section



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description | Type                | Default      |
| --------------- | ---------------- | ----------- | ------------------- | ------------ |
| `arrowPosition` | `arrow-position` |             | `"left" \| "right"` | `'left'`     |
| `caption`       | `caption`        |             | `string`            | `''`         |
| `collapsable`   | `collapsable`    |             | `boolean`           | `true`       |
| `collapsed`     | `collapsed`      |             | `boolean`           | `false`      |
| `icon`          | `icon`           |             | `string`            | `'arrow-up'` |


## Methods

### `collapse() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `expand() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [az-icon](../icons)

### Graph
```mermaid
graph TD;
  az-section --> az-icon
  style az-section fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
