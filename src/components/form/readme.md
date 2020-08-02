# az-form



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description | Type                         | Default  |
| --------------- | ---------------- | ----------- | ---------------------------- | -------- |
| `caption`       | `caption`        |             | `string`                     | `''`     |
| `items`         | --               |             | `IFormItem[]`                | `[]`     |
| `labelPosition` | `label-position` |             | `"left" \| "right" \| "top"` | `'left'` |


## Methods

### `deserialize(items: IFormItem[]) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `fromJson(data: Record<string, any>) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `serialize(detailed?: boolean) => Promise<any[]>`



#### Returns

Type: `Promise<any[]>`



### `toJson(initialValue?: {}, root?: string) => Promise<any>`



#### Returns

Type: `Promise<any>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
