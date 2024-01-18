// CreateCategoryForm.tsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../../context/AuthContext';
import { createCategory } from '../../../api/categoryApi';

interface CreateCategoryFormProps {
  onCreateSuccess: () => void;
  onCancel: () => void;
}

const CreateCategoryForm: React.FC<CreateCategoryFormProps> = ({ onCreateSuccess, onCancel }) => {
  const { isAuthenticated } = useAuth();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        if (isAuthenticated) {
          const token = localStorage.getItem('token');
          if (token) {
            await createCategory(values.name, token);
            onCreateSuccess();
          }
        }
      } catch (error) {
        console.error('Create category failed', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="name">Category Name</label>
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

      <button type="button" onClick={onCancel}>Cancel</button>
      <button type="submit">Create Category</button>
    </form>
  );
};

export default CreateCategoryForm;