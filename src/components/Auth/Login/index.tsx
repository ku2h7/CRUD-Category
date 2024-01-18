// LoginForm.tsx
import React from 'react';
import { useFormik } from 'formik';
import { LoginData } from './../../../interfaces/User';
import { loginUser } from '../../../api/authApi';
import { loginValidationSchema } from '../../../validations/validationSchema';

interface LoginFormProps {
  onLoginSuccess: (token: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values: LoginData) => {
      try {
        const response = await loginUser(values);
        const token = response.data.token;
        if (token !== undefined) {
          localStorage.setItem('token', token);
        };
        onLoginSuccess(token);
      } catch (error) {
        console.error('Login failed', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
