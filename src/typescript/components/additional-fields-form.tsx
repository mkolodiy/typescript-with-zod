import { parseISO, isValid } from 'date-fns';
import { Formik, FormikProps } from 'formik';
import { ChangeEventHandler } from 'react';
import { z, ZodError } from 'zod';
import type { AdditionalFields } from '../user';
import { DateInput } from '../../common/components/date-input';
import { NumberInput } from '../../common/components/number-input';
import { cloneDeep } from 'lodash';

const inputSchema = z.object({
  fieldNumber: z.number().or(z.string().length(0)),
  fieldNumberWritable: z.boolean(),
  fieldString: z.string().or(z.string().length(0)),
  fieldStringWritable: z.boolean(),
  fieldDate: z.date().or(z.string().length(0)),
  fieldDateWritable: z.boolean(),
});

const outputSchema = inputSchema.augment({
  fieldNumber: z.number().nullable(),
  fieldString: z.string().nullable(),
  fieldDate: z.date().nullable(),
});

type InputValues = z.infer<typeof inputSchema>;

type OutputValue = z.infer<typeof outputSchema>;

function validate(values: InputValues) {
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
  additionalFields: AdditionalFields;
};

function getInitialValues(additionalFields: AdditionalFields): InputValues {
  return {
    ...additionalFields,
    fieldNumber:
      additionalFields.fieldNumber === null ? '' : additionalFields.fieldNumber,
    fieldString:
      additionalFields.fieldString === null ? '' : additionalFields.fieldString,
    fieldDate:
      additionalFields.fieldDate === null ? '' : additionalFields.fieldDate,
  };
}

export function AdditionalFieldsForm({ additionalFields }: Props) {
  const handleFormikOnSubmit = (values: InputValues) => {
    const outputData: OutputValue = {
      ...values,
      fieldNumber:
        values.fieldNumber === '' || typeof values.fieldNumber === 'string'
          ? null
          : values.fieldNumber,
      fieldString: values.fieldString === '' ? null : values.fieldString,
      fieldDate:
        values.fieldDate === '' || typeof values.fieldDate === 'string'
          ? null
          : values.fieldDate,
    };

    console.log(outputData);
  };

  const renderForm = ({
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    touched,
    errors,
    setFieldValue,
  }: FormikProps<InputValues>) => {
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
      initialValues={getInitialValues(additionalFields)}
    >
      {renderForm}
    </Formik>
  );
}
