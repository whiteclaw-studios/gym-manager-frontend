import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import AddNewImage from './AddNewImage';
import { GREEN, GREY, SECONDARY_BLACK } from '../../constants';
const Wrap = styled('div')`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${SECONDARY_BLACK};
  position: relative;
  top: 1.75rem;
`;
const Container = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;
const Section1 = styled('div')`
  display: flex;
  align-items: center;
`;
const Preview = styled('div')`
  width: 3.5rem;
  height: 3rem;
  border: 1px solid #e2e2e2;
`;
const Img = styled('img')`
  width: 100%;
  height: 100%;
`;
const Filename = styled('span')`
  margin-left: 1.2rem;
  width: 14rem;
`;
const Section2 = styled('span')`
  color: ${GREEN};
  width: 100%;
  text-align: right;
  margin-right: 0.5rem;
`;
export default class UploadImage extends React.Component {
  render() {
    const { images = [], chooseImage = () => {} } = this.props;
    console.log('images', images);
    return (
      <Wrap>
        {images.length === 1 ? (
          <Container>
            <Section1>
              <Preview>
                <Img src={images[0].src} />
              </Preview>
              <Filename>{images[0].imageFile.name}</Filename>
            </Section1>
            <Section2>Change</Section2>
          </Container>
        ) : (
          <AddNewImage chooseImage={chooseImage} />
        )}
      </Wrap>
    );
  }
}
UploadImage.propTypes = {
  images: PropTypes.array,
  chooseImage: PropTypes.func,
};
