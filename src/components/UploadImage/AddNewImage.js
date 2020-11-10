import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { ALLOW_IMAGES_TYPES } from '../../constants';
import { UploadIcon } from '../SpriteIcon';
const Wrap = styled('div')`
  border-radius: 4px;
  display: flex;
  width: 100%;
  padding: 4px;
  cursor: default;

  height: 3.4rem;
  align-items: center;
  position: relative;
  @media (min-width: 993px) {
    cursor: pointer;
  }
`;
const FileUpload = styled('input')`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: default;
  @media (min-width: 993px) {
    cursor: pointer;
  }
`;
const FileUploadText = styled('span')`
  width: 76px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
function AddNewImage({ chooseImage = () => {} } = {}) {
  const chooseImageHandle = (event) => {
    let files = [];
    let srcs = [];
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
  return (
    <Wrap>
      <UploadIcon></UploadIcon>
      <FileUploadText>Upload photo</FileUploadText>
      <FileUpload
        type="file"
        id="myFile"
        onChange={chooseImageHandle}
        accept={ALLOW_IMAGES_TYPES}
      />
    </Wrap>
  );
}
AddNewImage.propTypes = {
  // chooseImage: PropTypes.func,
};
export default AddNewImage;
