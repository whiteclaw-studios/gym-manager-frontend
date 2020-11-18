import React, { useState } from 'react';
import styled, { css } from 'react-emotion';
import { GREEN, LIGHT_GREEN, SECONDARY_BLACK, WHITE } from '../../constants';
import { deleteCookie } from '../../utils/helpers';
import {
  CloseIcon,
  DashboardIcon,
  EnquiryIcon,
  HoverDashBoardIcon,
  HoverEnquiryIcon,
  HoverProfileIcon,
  LogoutIcon,
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
  height: 1.5rem;
  width: 5rem;
  margin: 1rem 0;
  ${(props) => props.expand && expandedCss}
  @media (max-width: 992px) {
    display: none;
  }
`;
const expandedCss = css`
  height: 4rem;
  width: 12rem;
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
    hoverIconCss: HoverDashBoardIcon,
  },
  {
    menu: 'Members Directory',
    Icon: ProfileIcon,
    url: '/members-directory',
    hoverIconCss: HoverProfileIcon,
  },
  {
    menu: 'Enquiry Details',
    Icon: EnquiryIcon,
    url: '/enquiry-directory',
    hoverIconCss: HoverEnquiryIcon,
  },
];
const footerMenus = [
  {
    menu: 'Logout',
    Icon: LogoutIcon,
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
  logo,
}) {
  const constructMenus = () => {
    return menus.map((item, index) => {
      const { menu, Icon, url, hoverIconCss } = item;
      return (
        <Item key={menu} onMouseOver={() => updateActiveNavIndex(index)}>
          <Icon
            className={index === activeIndex ? hoverIconCss : ''}
            onClick={() => {
              history.push(url);
              shrinkNavbar();
            }}
          />
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
      {logo && (
        <LogoWrap expand={navbarState}>
          <LogoImg src={logo} />
        </LogoWrap>
      )}
      <Close>
        <CloseIcon onClick={() => hideNavBar()} />
      </Close>
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
              {Icon && <Icon />}
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
