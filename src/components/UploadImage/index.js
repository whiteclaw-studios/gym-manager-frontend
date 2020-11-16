import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import AddNewImage from './AddNewImage';
import { ALLOW_IMAGES_TYPES, GREEN, SECONDARY_BLACK } from '../../constants';
import { MontserratLight } from '../../utils/fonts';
import { get } from '../../utils/helpers';
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
  flex: 1;
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
  text-align: right;
  margin-right: 0.5rem;
  font-family: ${MontserratLight};
`;
const Input = styled('input')`
  position: absolute;
  width: 3.7rem;
  top: 0;
  height: 100%;
  right: 0;
  opacity: 0;
  cursor: pointer;
  @media (max-width: 992px) {
    cursor: default;
  }
`;
export default class UploadImage extends React.Component {
  chooseImageHandle = (event) => {
    let files = [];
    let srcs = [];
    const { chooseImage } = this.props;
    let isImageFile = true;
    for (let i = 0; i < event.target.files.length; i += 1) {
      const file = event.target.files[i];
      const src = URL.createObjectURL(file);
      const { type } = file;

      if (!ALLOW_IMAGES_TYPES.includes(type)) isImageFile = false;

      if (i < 1 && ALLOW_IMAGES_TYPES.includes(type)) {
        files = [...files, file];
        srcs = [...srcs, src];
      }
    }

    if (chooseImage) chooseImage({ srcs, files });
  };
  render() {
    const { images = [], chooseImage = () => {} } = this.props;
    const src = get(images, '[0].src', '');
    const fileName = get(images, '[0].imageFile.name', '');
    return (
      <Wrap>
        {images.length === 1 ? (
          <Container>
            <Section1>
              <Preview>
                <Img src={src} />
              </Preview>
              <Filename>{fileName}</Filename>
            </Section1>
            <Section2>
              <Input
                type="file"
                accept={ALLOW_IMAGES_TYPES}
                onChange={(e) => {
                  e.stopPropagation();
                  this.chooseImageHandle(e);
                }}
              />
              <span>Change </span>
            </Section2>
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
