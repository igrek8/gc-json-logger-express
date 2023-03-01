[gc-json-logger-express](README.md) / Exports

# gc-json-logger-express

## Table of contents

### Interfaces

- [LogEntry](interfaces/LogEntry.md)
- [LogEntryMetadata](interfaces/LogEntryMetadata.md)
- [LogOptions](interfaces/LogOptions.md)

### Type Aliases

- [LogTransformFunction](modules.md#logtransformfunction)

### Functions

- [log](modules.md#log)

## Type Aliases

### LogTransformFunction

Ƭ **LogTransformFunction**: (`req`: `Request`, `res`: `Response`, `entry`: [`LogEntry`](interfaces/LogEntry.md)) => [`LogEntry`](interfaces/LogEntry.md)

#### Type declaration

▸ (`req`, `res`, `entry`): [`LogEntry`](interfaces/LogEntry.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request` |
| `res` | `Response` |
| `entry` | [`LogEntry`](interfaces/LogEntry.md) |

##### Returns

[`LogEntry`](interfaces/LogEntry.md)

#### Defined in

[types/LogTransformFunction.ts:4](https://github.com/igrek8/gc-json-logger-express/blob/f043469/src/types/LogTransformFunction.ts#L4)

## Functions

### log

▸ **log**(`transform?`): (`req`: `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\>, `res`: `Response`<`any`, `Record`<`string`, `any`\>\>, `next`: `NextFunction`) => `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `transform` | [`LogTransformFunction`](modules.md#logtransformfunction) | `passThrough` |

#### Returns

`fn`

▸ (`req`, `res`, `next`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> |
| `res` | `Response`<`any`, `Record`<`string`, `any`\>\> |
| `next` | `NextFunction` |

##### Returns

`void`

#### Defined in

[log.ts:10](https://github.com/igrek8/gc-json-logger-express/blob/f043469/src/log.ts#L10)
