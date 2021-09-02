import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = ({ scrolled, handleClickMenu, banner, isShowSidebar }) => {
  const count = useSelector((state) => state.products.count);
  const cartList = useSelector((state) => state.products.cart);
  const condition = cartList || cartList?.length;
  return (
    <React.Fragment>
      <header className={`${scrolled ? 'stick' : ''}`}>
        <div className="left">
          {isShowSidebar && scrolled && (
            <i
              className="bx bx-menu text-black btn bx-md"
              onClick={handleClickMenu}
            ></i>
          )}
          <Link to="/" className="logo">
            <i className="bx bx-shopping-bag"></i> LOGO
          </Link>
        </div>
        <ul>
          <li className={`cart ${scrolled ? 'primary' : ''}`}>
            <span className="count">{count}</span>
            <Link to="/cart" className={`cart ${scrolled ? 'primary' : ''}`}>
              <i className="bx bx-cart"></i>
            </Link>
            {condition && (
              <div className="popup">
                <h4 className="text-center">Cart</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>category</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartList.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="pop-img">
                            <img src={item.image} alt="" />
                          </div>
                        </td>
                        <td>
                          <div className="title">
                            <p>{item.title}</p>
                          </div>
                        </td>
                        <td>
                          <div className="quantity">{item.category}</div>
                        </td>
                        <td>
                          <div className="price">
                            <p>${item.price}</p>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </li>
          <li>
            <a href="#" className="user">
              <i className="bx bx-user"></i>
            </a>
          </li>
        </ul>
      </header>
      {banner && <section className="banner"></section>}
    </React.Fragment>
  );
};

export default Header;
