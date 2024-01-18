// CategoryListTable.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from './../../../context/AuthContext';
import { getCategories, deleteCategory } from './../../../api/categoryApi';

interface Category {
  id: string;
  name: string;
  is_active: boolean;
}

interface CategoryListTableProps {
  onEdit: (category: Category) => void;
}

const CategoryListTable: React.FC<CategoryListTableProps> = ({ onEdit }) => {
  const { isAuthenticated } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (isAuthenticated) {
          const token = localStorage.getItem('token');
          if (token) {
            const response = await getCategories(token);
            setCategories(response.data);
          }
        }
      } catch (error) {
        console.error('Fetch categories failed', error);
      }
    };

    fetchCategories();
  }, [isAuthenticated]);

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      if (isAuthenticated) {
        const token = localStorage.getItem('token');
        if (token) {
          await deleteCategory(categoryId, token);
          const updatedCategories = categories.filter(category => category.id !== categoryId);
          setCategories(updatedCategories);
        }
      }
    } catch (error) {
      console.error('Delete category failed', error);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Is Active</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {categories.map(category => (
          <tr key={category.id}>
            <td>{category.id}</td>
            <td>{category.name}</td>
            <td>{category.is_active ? 'Active' : 'Inactive'}</td>
            <td>
              <button onClick={() => onEdit(category)}>Edit</button>
              <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoryListTable;