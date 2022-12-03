export type Address = {
  postalCode: number;
  city: string;
  street: string;
};

export type AdditionalFields = {
  fieldNumber: number | null;
  fieldNumberWritable: true;
  fieldString: string | null;
  fieldStringWritable: true;
  fieldDate: Date | null;
  fieldDateWritable: true;
};

export type User = {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  birthday: Date;
  address: Address;
  additionalFields: AdditionalFields;
};

export type GetUsersResponse = Omit<User, 'address' | 'additionalFields'>[];

export type GetUsersResponseEntry = Omit<User, 'address' | 'additionalFields'>;

export type GetUserResponse = User;
