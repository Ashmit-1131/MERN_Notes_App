// CategoryFilter.js
import React from 'react';
import { Dropdown } from 'react-bootstrap';


const categories = [
  'All',
  'Work',
  'Stress Management',
  'Lifestyle',
  'Fitness',
  'Love-Life',
  'Other',
];


const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {selectedCategory || 'Select Category'}
      </Dropdown.Toggle>


      <Dropdown.Menu>
        {categories.map((category) => (
          <Dropdown.Item
            key={category}
            onClick={() => setSelectedCategory(category === 'All' ? '' : category)}
          >
            {category}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};


export default CategoryFilter;