export const users = [
  {
    id: 1,
    email: 'john.doe@test.com',
    firstName: 'John',
    lastName: 'Doe',
    birthday: '2022-11-17T19:36:37.597Z',
    address: {
      postalCode: 1234,
      city: 'Some city',
      street: 'Some street 140',
    },
    additionalFields: {
      fieldNumber: null,
      fieldNumberWritable: true,
      fieldString: null,
      fieldStringWritable: true,
      fieldDate: null,
      fieldDateWritable: true,
    },
  },
  {
    id: 2,
    email: 'jane.doe@test.com',
    firstName: 'Jane',
    lastName: 'Doe',
    birthday: '2022-11-17T19:36:37.597Z',
    address: {
      postalCode: 1234,
      city: 'Some city',
      street: 'Some street 140',
    },
    additionalFields: {
      fieldNumber: 123,
      fieldNumberWritable: true,
      fieldString: 'test',
      fieldStringWritable: true,
      fieldDate: '2022-11-17T19:36:37.597Z',
      fieldDateWritable: true,
    },
  },
];
