[gc-json-logger-express](../README.md) / [Exports](../modules.md) / LogOptions

# Interface: LogOptions

## Table of contents

### Methods

- [log](LogOptions.md#log)

## Methods

### log

▸ **log**(`req`, `res`, `entry`): [`LogEntry`](LogEntry.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> |
| `res` | `Response`<`any`, `Record`<`string`, `any`\>\> |
| `entry` | [`LogEntry`](LogEntry.md) |

#### Returns

[`LogEntry`](LogEntry.md)

#### Defined in

[types/LogOptions.ts:5](https://github.com/igrek8/gc-json-logger-express/blob/c8b558d/src/types/LogOptions.ts#L5)
