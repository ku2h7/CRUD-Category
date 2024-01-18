// UpdateCategoryForm.tsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from './../../../context/AuthContext';
import { updateCategory } from './../../../api/categoryApi';

interface UpdateCategoryFormProps {
  onUpdateSuccess: () => void;
  onCancel: () => void;
  category: {
    id: string;
    name: string;
    is_active: boolean;
  };
}

const UpdateCategoryForm: React.FC<UpdateCategoryFormProps> = ({ onUpdateSuccess, onCancel, category }) => {
  const { isAuthenticated } = useAuth();

  const formik = useFormik({
    initialValues: {
      id: category.id,
      name: category.name,
      is_active: category.is_active,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      is_active: Yup.boolean().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        if (isAuthenticated) {
          const token = localStorage.getItem('token');
          if (token) {
            await updateCategory(values.id, values.name, values.is_active, token);
            onUpdateSuccess();
          }
        }
      } catch (error) {
        console.error('Update category failed', error);
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

      <div>
        <label htmlFor="is_active">Is Active</label>
        <input
          type="checkbox"
          id="is_active"
          name="is_active"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          checked={formik.values.is_active}
        />
        {formik.touched.is_active && formik.errors.is_active ? (
          <div>{formik.errors.is_active}</div>
        ) : null}
      </div>

      <button type="button" onClick={onCancel}>Cancel</button>
      <button type="submit">Update Category</button>
    </form>
  );
};

export default UpdateCategoryForm;