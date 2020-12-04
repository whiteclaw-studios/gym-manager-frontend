import React, { useState } from 'react';
import styled, { css } from 'react-emotion';
import { GREEN, LIGHT_GREEN, SECONDARY_BLACK, WHITE } from '../../constants';
import { MontserratLight, MontserratRegular } from '../../utils/fonts';
import { deleteCookie } from '../../utils/helpers';
import { CloseIcon } from '../SpriteIcon';
const Wrap = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  background: ${GREEN};
  width: 6.4rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  z-index: 11;
`;
const LogoWrap = styled('div')`
  height: 1.5rem;
  width: 5rem;
  margin: 1rem 0;
  padding: 0 1.2rem;
  ${(props) => props.expand && expandedCss}
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media (max-width: 992px) {
    display: none;
  }
`;
const expandedCss = css`
  height: 4rem;
  width: 12rem;
  padding: 0 1rem;
`;
const LogoImg = styled('img')`
  width: 100%;
  height: 100%;
`;

const MenusWrap = styled('div')`
  flex: 3;
  margin-top: 4rem;
`;
const Item = styled('li')`
  display: flex;
  height: 5.6rem;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  padding: 0 1.2rem;
  background: ${(props) => (props.activeItem ? '#fff' : 'none')};
  ${(props) =>
    props.expandState ? 'padding-left:2.4rem;justify-content:flex-start;' : ''};
  @media (max-width) {
    cursor: default;
  }
`;
const Footer = styled('div')`
  flex: 1;
`;
const Close = styled('div')`
  position: relative;
  top: 1.4rem;
  padding: 0 1.2rem;
  padding-left: 2.4rem;
  @media (min-width: 993px) {
    display: none;
  }
`;
const Menu = styled('span')`
  font-size: 1.2rem;
  color: ${WHITE};
  padding-left: 1.2rem;
  font-family:${MontserratRegular}
  animation: fadeIn 0.2s ease-in-out;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
const UserName = styled('p')`
  font-size: 1.4rem;
  padding: 0 1.2rem;
  padding-left: 2.4rem;
  position: relative;
  top: 3.2rem;
  color: ${WHITE};
`;
function NavBar({
  updateActiveNavIndex,
  activeIndex,
  history,
  navbarState,
  expandNavbar,
  shrinkNavbar,
  hideNavBar,
  logo,
  menus,
  footerMenus,
  userName,
}) {
  const constructMenus = () => {
    return menus.map((item, index) => {
      const { menu, Icon, url, hoverIconCss } = item;
      return (
        <Item
          key={menu}
          // onMouseOver={() => updateActiveNavIndex(index)}
          activeItem={index === activeIndex}
          expandState={navbarState}
          onClick={() => {
            history.push(url);
            shrinkNavbar();
            updateActiveNavIndex(index);
          }}
        >
          <Icon className={index === activeIndex ? hoverIconCss : ''} />
          {navbarState && (
            <Menu
              className={
                index === activeIndex
                  ? css`
                      color: ${SECONDARY_BLACK};
                    `
                  : ''
              }
            >
              {menu}
            </Menu>
          )}
        </Item>
      );
    });
  };
  return (
    <Wrap
      className={
        navbarState
          ? css`
              width: 20rem;
              align-items: unset;
              // padding-left: 2.4rem;
              box-shadow: 0px 1px 5px ${SECONDARY_BLACK};
              transition: all 0.1s ease-in-out;
            `
          : ''
      }
      onMouseOver={() => {
        expandNavbar(true);
      }}
      onMouseLeave={() => shrinkNavbar()}
    >
      {logo && (
        <LogoWrap expand={navbarState}>
          <LogoImg src={logo} />
        </LogoWrap>
      )}
      {navbarState && (
        <Close>
          <CloseIcon onClick={() => hideNavBar()} />
        </Close>
      )}
      {navbarState && userName && <UserName>Logged in as {userName}</UserName>}

      <MenusWrap>{constructMenus()}</MenusWrap>
      <Footer>
        {footerMenus.map((item, index) => {
          const { menu, Icon } = item;
          const menusLength = menus.length;
          return (
            <Item
              key={menu}
              // onMouseOver={() => updateActiveNavIndex(menusLength + index)}
              activeItem={menusLength + index === activeIndex}
              expandState={navbarState}
            >
              {Icon && (
                <Icon
                  onClick={() => {
                    deleteCookie('VJS');
                    window.location.reload();
                  }}
                />
              )}
              {navbarState && (
                <Menu
                  className={
                    menusLength + index === activeIndex
                      ? css`
                          color: ${SECONDARY_BLACK};
                        `
                      : ''
                  }
                  onClick={() => {
                    deleteCookie('VJS');
                    window.location.reload();
                  }}
                >
                  {menu}
                </Menu>
              )}
            </Item>
          );
        })}
      </Footer>
    </Wrap>
  );
}
export default NavBar;
