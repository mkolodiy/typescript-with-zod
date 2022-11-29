import { z } from 'zod';
import { cloneDeep } from 'lodash';
import { isDate, isValid, parseISO } from 'date-fns';

export type ArrayElementType<T extends unknown[]> = T extends (infer U)[]
  ? U
  : never;

export const addressSchema = z.object({
  postalCode: z.number(),
  city: z.string(),
  street: z.string(),
});

export const additionalFieldsSchema = z.object({
  fieldNumber: z.number().nullable(),
  fieldNumberWritable: z.boolean(),
  fieldString: z.string().nullable(),
  fieldStringWritable: z.boolean(),
  fieldDate: z.preprocess(
    (value) => (typeof value === 'string' ? parseISO(value) : value),
    z.date().nullable()
  ),
  fieldDateWritable: z.boolean(),
});

export const userSchema = z.object({
  id: z.number(),
  email: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  birthday: z.preprocess(
    (value) => (typeof value === 'string' ? parseISO(value) : value),
    z.date()
  ),
  address: addressSchema,
  additionalFields: additionalFieldsSchema,
});

export const getUsersResponseSchema = z.array(
  userSchema.omit({ address: true, additionalFields: true })
);

export type GetUsersResponse = z.infer<typeof getUsersResponseSchema>;

export type GetUsersResponseEntry = ArrayElementType<GetUsersResponse>;

// export const getUsersResponseSchema = z.promise(
//   z.array(userSchema.omit({ address: true }))
// );

export const getUserResponseSchema = userSchema;

export type GetUserResponse = z.infer<typeof getUserResponseSchema>;

export type User = z.infer<typeof userSchema>;

export type Address = z.infer<typeof addressSchema>;

export type AdditionalFields = z.infer<typeof additionalFieldsSchema>;

// const user: User = {} // Create a user

// const user: Required<User> = {}; // Create a user with all fields required

// const user: Omit<User, 'address'> = {}; // Create a user without address field

export function castObj(obj: any) {
  const objCopy = cloneDeep(obj);
  for (const [key, value] of Object.entries(objCopy)) {
    if (value === null) {
      continue;
    }

    if (typeof value === 'string') {
      const isDate = isValid(parseISO(value));
      if (isDate) {
        const dateCast = parseISO(value);
        objCopy[key] = dateCast;
      }
    }

    if (typeof value === 'object') {
      objCopy[key] = castObj(value);
    }
  }

  return objCopy;
}

export function castArr(arr: any[]) {
  return arr.map((entry) => castObj(entry));
}
