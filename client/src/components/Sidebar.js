import {
  getCategories,
  getProductsBasedOnCategories,
  getProductsList
} from 'actions';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const iconMap = {
  electronics: <i className="bx bx-laptop"></i>,
  jewelery: <i className="bx bxs-diamond"></i>,
  "men's clothing": <i className="bx bx-male-sign"></i>,
  "women's clothing": <i className="bx bx-female-sign"></i>
};

const Sidebar = ({
  scrolled,
  active,
  setSelectedCategory,
  setActive,
  selectedCategory
}) => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const categoriesList = useSelector((state) => state.products.categories);

  useEffect(() => {
    if (!categoriesList) {
      dispatch(getCategories());
    } else {
      setCategories(categoriesList);
    }
  }, [categoriesList, dispatch]);

  const handleClickCategory = (item) => {
    if (item) {
      if (selectedCategory === item) return;
      dispatch(getProductsBasedOnCategories(item));
      setSelectedCategory(item);
    } else {
      dispatch(getProductsList());
      setSelectedCategory('All Products');
    }
  };

  return (
    <div className={scrolled ? `sidebar ${active ? 'open' : ''}` : 'd-none'}>
      <div className="logo_content"></div>
      <ul className="nav_list">
        <li>
          <i className="bx bx-search"></i>
          <input type="text" placeholder="Search for Product" />
        </li>
        {categories.length > 0 &&
          categories.map((item, index) => (
            <li key={index} onClick={() => handleClickCategory(item)}>
              <span alt="icon" className="icon">
                {iconMap[item]}
                <span>{item}</span>
              </span>
              {!active && <span className="tool-tip">{item}</span>}
            </li>
          ))}
        <li onClick={() => handleClickCategory('')}>
          <span alt="icon" className="icon">
            <i className="bx bx-grid-alt"></i>
            <span>All Category</span>
          </span>
          {!active && <span className="tool-tip">All Category</span>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
