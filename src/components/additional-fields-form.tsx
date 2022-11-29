import { parseISO, isValid } from 'date-fns';
import { Formik, FormikProps } from 'formik';
import { ChangeEventHandler } from 'react';
import { z, ZodError } from 'zod';
import { type User, additionalFieldsSchema } from '../user';
import { DateInput } from './date-input';
import { NumberInput } from './number-input';

const inputSchema = additionalFieldsSchema.augment({
  fieldNumber: z.preprocess(
    (value) => (value === null ? '' : value),
    z.number().or(z.string().length(0))
  ),
  fieldString: z.preprocess(
    (value) => (value === null ? '' : value),
    z.string().or(z.string().length(0))
  ),
  fieldDate: z.preprocess(
    (value) => (value === null ? '' : value),
    z.date().or(z.string().length(0))
  ),
});

const outputSchema = additionalFieldsSchema.augment({
  fieldNumber: z.preprocess(
    (value) => (value === '' ? null : Number(value)),
    z.number().nullable()
  ),
  fieldString: z.preprocess(
    (value) => (value === '' ? null : value),
    z.string().nullable()
  ),
  fieldDate: z.preprocess(
    (value) => (value === '' ? null : value),
    z.date().nullable()
  ),
});

type FormValues = z.infer<typeof inputSchema>;

function validate(values: FormValues) {
  try {
    inputSchema.parse(values);
  } catch (error) {
    if (error instanceof ZodError) {
      return error.flatten().fieldErrors;
    }
  }

  return {};
}

type Props = {
  user: User;
};

function getInitialValues(user: User) {
  return inputSchema.parse(user.additionalFields);
}

export function AdditionalFieldsForm({ user }: Props) {
  const handleFormikOnSubmit = (values: FormValues) => {
    console.log(outputSchema.parse(values));
  };

  const renderForm = ({
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    touched,
    errors,
    setFieldValue,
  }: FormikProps<FormValues>) => {
    const handleOnChangeDate: ChangeEventHandler<HTMLInputElement> = (e) => {
      const value = e.target.value;
      const date = parseISO(value);

      setFieldValue('fieldDate', isValid(date) ? date : value);
    };

    return (
      <form noValidate onSubmit={handleSubmit}>
        <div>
          <label>
            <span>fieldNumber:</span>
            <NumberInput
              id="fieldNumber"
              name="fieldNumber"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fieldNumber}
            />
          </label>
          {touched.fieldNumber && errors.fieldNumber ? (
            <div>{errors.fieldNumber}</div>
          ) : null}
        </div>
        <div>
          <label>
            <span>fieldString:</span>
            <input
              id="fieldString"
              name="fieldString"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fieldString}
            />
          </label>
          {touched.fieldString && errors.fieldString ? (
            <div>{errors.fieldString}</div>
          ) : null}
        </div>
        <div>
          <label>
            <span>fieldDate:</span>
            <DateInput
              id="fieldDate"
              name="fieldDate"
              onChange={handleOnChangeDate}
              onBlur={handleBlur}
              value={values.fieldDate}
            />
          </label>
          {touched.fieldDate && errors.fieldDate ? (
            <div>{errors.fieldDate}</div>
          ) : null}
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  };

  return (
    <Formik
      validate={validate}
      onSubmit={handleFormikOnSubmit}
      initialValues={getInitialValues(user)}
    >
      {renderForm}
    </Formik>
  );
}
