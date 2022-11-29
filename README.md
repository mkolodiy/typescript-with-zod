# zod-typescript-types

This repository contains multiple examples that show how to use [`zod`](https://github.com/colinhacks/zod) library to better handle TypeScript types.

Following is currently included:

- Working with JSON API responses
- Working with form input/output data

## Working with JSON API responses

### Problem

- JSON API responses can't contain data types like `Date`, `Map`, etc.
- Using same TS type for all JSON API responses can be insufficient. A response can contain just a subset of data.
- Data has to be preprocessed before using a TS type.

Response A:

```json
{
  "name": "John Doe",
  "age": 30,
  "birthday": "2022-11-17T19:36:37.597Z"
}
```

Response B:

```json
{
  "name": "John Doe",
  "age": 30
}
```

TypeScript code:

```typescript
type User = {
  name: string;
  age: number;
  birthday: Date;
};

const respA = convertObj(/* Response A */) as User;
const respB = convertObj(/* Response B */) as User;

respA.birthday; // returns a value
respB.birthday; // undefined
```
