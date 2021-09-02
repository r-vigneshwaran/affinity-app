import React, { useState, useEffect } from 'react';
import { Navbar, Preloader, Sidebar } from 'components';
import { useSelector } from 'react-redux';

const BaseLayout = ({ Component, banner, isShowSidebar }) => {
  const showLoader = useSelector((state) => state.app.loader);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    // if (showLoader) {
    //   document.body.style.overflow = 'hidden';
    // } else {
    //   document.body.style.overflowX = 'hidden';
    //   document.body.style.overflowY = 'unset';
    // }
  }, [showLoader]);

  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    return window.onscroll;
  }, []);

  const handleClickMenu = () => {
    setActive(!active);
  };

  return (
    <>
      <Preloader show={showLoader} />
      <Navbar
        banner={banner}
        scrolled={scrolled}
        handleClickMenu={handleClickMenu}
        isShowSidebar={isShowSidebar}
      />
      {isShowSidebar && (
        <Sidebar
          setSelectedCategory={setSelectedCategory}
          scrolled={scrolled}
          active={active}
          setActive={setActive}
          selectedCategory={selectedCategory}
        />
      )}
      <main className={`content ${isShowSidebar && active ? 'active' : ''}`}>
        <Component selectedCategory={selectedCategory} />
      </main>
    </>
  );
};

export default BaseLayout;
