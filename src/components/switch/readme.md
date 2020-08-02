# az-switch



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type                                                                           | Default     |
| --------- | --------- | ----------- | ------------------------------------------------------------------------------ | ----------- |
| `caption` | `caption` |             | `string`                                                                       | `''`        |
| `size`    | `size`    |             | `"extra-large" \| "extra-small" \| "large" \| "medium" \| "normal" \| "small"` | `'normal'`  |
| `type`    | `type`    |             | `"danger" \| "info" \| "plain" \| "primary" \| "success" \| "warning"`         | `'primary'` |
| `value`   | `value`   |             | `boolean`                                                                      | `false`     |


## Events

| Event     | Description | Type               |
| --------- | ----------- | ------------------ |
| `changed` |             | `CustomEvent<any>` |


## Methods

### `toJson(detailed?: boolean) => Promise<{ tag: string; caption: string; value: boolean; } & { type: ComponentStyle; size: ComponentSize; }>`



#### Returns

Type: `Promise<{ tag: string; caption: string; value: boolean; } & { type: ComponentStyle; size: ComponentSize; }>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
