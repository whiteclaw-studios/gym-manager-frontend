import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { ALLOW_IMAGES_TYPES } from '../../constants';
const Wrap = styled('div')`
  width: 9rem;
  height: 9rem;
  background: #f6eff6;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  cursor: default;
  @media (min-width: 993px) {
    cursor: pointer;
  }
  text-align: center;

  position: relative;
`;
const FileUpload = styled('input')`
  width: 76px;
  height: 76px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: default;
  @media (min-width: 993px) {
    cursor: pointer;
  }
`;
const FileUploadIcon = styled('span')`
  width: 76px;
  height: 76px;
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
      <FileUploadIcon>Upload photo</FileUploadIcon>
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
