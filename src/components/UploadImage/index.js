import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import AddNewImage from './AddNewImage';
const Wrap = styled('div')`
  display: flex;
  justify-content: center;
`;
const Preview = styled('div')`
  width: 9rem;
  height: 9rem;
`;
const Img = styled('img')`
  width: 100%;
  height: 100%;
`;
export default class UploadImage extends React.Component {
  render() {
    const { images = [], chooseImage = () => {} } = this.props;
    console.log('images', images);
    return (
      <Wrap>
        {images.length === 1 ? (
          <Preview>
            <Img src={images[0].src} />
          </Preview>
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
