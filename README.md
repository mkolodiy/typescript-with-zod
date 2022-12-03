# typescript-with-zod

This repository contains an example application that shows how to use [`zod`](https://github.com/colinhacks/zod) library together with TypeScript. To illustrate the differences, also a solution in TypeScript without `zod` is implemented.

Following is included:

- [Working with JSON data](#working-with-json-data)
- [Working with form input/output data](#working-with-form-inputoutput-data)

## How to use

To get started execute `pnpm install` to install dependencies. Then run `pnpm dev` to start the application.

The application is separated in TypeScript and `zod` sections. All related files are either located in `typescript/*` or `zod/*` folders.

## Working with JSON data

### Problem

- JSON data
  - can't contain data types like `Date`, `Map`, etc.
  - has to be processed to desired format (e.g. convert a date from `string` to `Date`)
  - can contain just a subset of data (e.g. when calling REST APIs)

## Working with form input/output data

### Problem

- Input data has to transformed to be usable in input fields of a form
- Usually a validation of the input is needed
- Form data that was entered has to be transformed into a usable output data
