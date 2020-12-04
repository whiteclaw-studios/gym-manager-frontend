import styled from 'react-emotion';
import { SECONDARY_BLACK } from '../../constants';
import { MontserratRegular } from '../../utils/fonts';

export const Row = styled('div')`
  display: flex;
  width: 100%;
`;
export const Item = styled('li')`
  flex: 1;
  font-size: 1.4rem;
  color: ${SECONDARY_BLACK};
  max-width: 17rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  z-index: 5;
  position: relative;
  font-family: ${MontserratRegular};
  @media (max-width: 992px) {
    font-size: 1.2rem;
  }
`;
export const Info = styled('div')`
  display: flex;
  width: 100%;
  flex: 2;
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;
