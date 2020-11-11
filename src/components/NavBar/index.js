import React, { useState } from 'react';
import styled, { css } from 'react-emotion';
import { GREEN, LIGHT_GREEN, SECONDARY_BLACK, WHITE } from '../../constants';
import { DASHBOARD_ROUTE } from '../../routes';
import {
  DashboardIcon,
  EnquiryIcon,
  FeeIcon,
  ProfileIcon,
} from '../SpriteIcon';
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
  padding: 0 1.2rem;
  align-items: center;
`;
const LogoWrap = styled('div')`
  height: 5rem;
  @media (max-width: 992px) {
    display: none;
  }
`;
const Close = styled('span')`
  font-size: 1.2rem;
  height: 40px;
  margin-top: 12px;
  @media (min-width: 993px) {
    display: none;
  }
`;
const MenusWrap = styled('div')`
  flex: 3;
`;
const Item = styled('li')`
  display: flex;
  height: 5.6rem;
  cursor: pointer;
  @media (max-width) {
    cursor: default;
  }
`;
const Footer = styled('div')`
  flex: 1;
`;
const Menu = styled('span')`
  font-size: 1.4rem;
  color: ${WHITE};
  margin-left: 1.2rem;
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
const menus = [
  {
    menu: 'Dashboard',
    Icon: DashboardIcon,
    url: '/dashboard',
  },
  {
    menu: 'Members Directory',
    Icon: ProfileIcon,
    url: '/members-directory',
  },
  {
    menu: 'Enquiry Details',
    Icon: EnquiryIcon,
    url: '/enquiry-directory',
  },
];
const footerMenus = [
  {
    menu: 'Support',
    Icon: EnquiryIcon,
    url: '/dashboard',
  },
  {
    menu: 'Settings',
    Icon: FeeIcon,
    url: '/dashboard',
  },
];
function NavBar({
  updateActiveNavIndex,
  activeIndex,
  history,
  navbarState,
  expandNavbar,
  shrinkNavbar,
  hideNavBar,
}) {
  const constructMenus = () => {
    return menus.map((item, index) => {
      const { menu, Icon, url } = item;
      return (
        <Item key={menu} onMouseOver={() => updateActiveNavIndex(index)}>
          <Icon />
          {navbarState && (
            <Menu
              className={
                index === activeIndex
                  ? css`
                      color: ${SECONDARY_BLACK};
                    `
                  : ''
              }
              onClick={() => {
                history.push(url);
                shrinkNavbar();
              }}
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
              padding-left: 2.4rem;
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
      <LogoWrap>BeemaFit</LogoWrap>
      <Close onClick={() => hideNavBar()}>X</Close>
      <MenusWrap>{constructMenus()}</MenusWrap>
      <Footer>
        {footerMenus.map((item, index) => {
          const { menu, Icon } = item;
          const menusLength = menus.length;
          return (
            <Item
              key={menu}
              onMouseOver={() => updateActiveNavIndex(menusLength + index)}
            >
              <Icon />
              {navbarState && (
                <Menu
                  className={
                    menusLength + index === activeIndex
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
        })}
      </Footer>
    </Wrap>
  );
}
export default NavBar;