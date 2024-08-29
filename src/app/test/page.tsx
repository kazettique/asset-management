'use client';

import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { z } from 'zod';

import { NString } from '@/types';

type FormValues = {
  firstName: NString;
  lastName: NString;
  // fullName: string;
};

const defaultForm: FormValues = {
  firstName: null,
  lastName: null,
  // fullName: '',
};

const validator: z.ZodSchema<FormValues> = z.object({
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  // fullName: z.string(),
});

export default function Page() {
  // const { handleSubmit, control } = useForm<FormForm>({
  //   defaultForm: DEFAULT_VALUES,
  //   resolver: zodResolver(validator),
  // });

  // const form = useForm<Form>({
  //   defaultForm,
  //   onSubmit: async ({ value }) => {
  //     // Do something with form data
  //     console.log(value);
  //   },
  // });

  return (
    <>
      <h1>Hello, Test Page!</h1>
      {/* react hook form */}
      {/* <form onSubmit={handleSubmit((data) => console.log(data))}>
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <input
              onChange={onChange} // send value to hook form
              onBlur={onBlur} // notify when input is touched/blur
              value={value}
            />
          )}
        />

        <input type="submit" />
      </form> */}
      {/* <DevTool control={control} /> */}

      {/* tanstack form */}
      {/* <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div>
          <form.Field
            name="fullName"
            children={(field) => (
              <input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          />
        </div>
        <button type="submit">Submit</button>
      </form> */}

      {/* formik */}
      {/* <Formik
        initialValues={defaultForm}
        onSubmit={(values: FormValues, helpers: FormikHelpers<FormValues>) => {
          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2));
          //   setSubmitting(false);
          // }, 500);
          console.log('values', values);
        }}
      >
        {(formikValues) => {
          console.log('formikValues', formikValues);
          return (
            <Form>
              <label htmlFor="firstName">First Name</label>
              <Field id="firstName" name="firstName" placeholder="John" />

              <label htmlFor="lastName">Last Name</label>
              <Field id="lastName" name="lastName" placeholder="Doe" />

              <button type="submit">Submit</button>
            </Form>
          );
        }}
      </Formik> */}
    </>
  );
}
