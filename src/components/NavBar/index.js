import React, { useState } from 'react';
import styled, { css } from 'react-emotion';
import { GREEN, LIGHT_GREEN, SECONDARY_BLACK, WHITE } from '../../constants';
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
`;
const menus = [
  {
    menu: 'Dashboard',
    Icon: DashboardIcon,
  },
  {
    menu: 'Members Directory',
    Icon: ProfileIcon,
  },
  {
    menu: 'Fees Details',
    Icon: FeeIcon,
  },
  {
    menu: 'Enquiry Details',
    Icon: EnquiryIcon,
  },
];
const footerMenus = [
  {
    menu: 'Support',
    Icon: EnquiryIcon,
  },
  {
    menu: 'Settings',
    Icon: FeeIcon,
  },
];
function NavBar({ updateActiveNavIndex, activeIndex }) {
  const [expand, toExpand] = useState(false);
  const constructMenus = () => {
    return menus.map((item, index) => {
      const { menu, Icon } = item;
      return (
        <Item key={menu} onMouseOver={() => updateActiveNavIndex(index)}>
          <Icon />
          {expand && (
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
        expand
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
        toExpand(true);
      }}
      onMouseLeave={() => toExpand(false)}
    >
      <LogoWrap>BeemaFit</LogoWrap>
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
              {expand && (
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
