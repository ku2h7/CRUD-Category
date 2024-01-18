// RegisterForm.tsx
import React from 'react';
import { useFormik } from 'formik';
import { RegisterData } from './../../../interfaces/User';
import { registerUser } from '../../../api/authApi';
import { registerValidationSchema } from '../../../validations/validationSchema';


interface RegisterFormProps {
  onRegisterSuccess: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values: RegisterData) => {
      try {
        await registerUser(values);
        onRegisterSuccess();
      } catch (error) {
        console.error('Registration failed', error);
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
      </div>

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
