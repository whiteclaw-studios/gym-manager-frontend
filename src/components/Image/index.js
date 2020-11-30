import React from 'react';
import styled from 'react-emotion';
import { PROFILE_PLACEHOLDER } from '../../constants';
const Img = styled('img')`
  width: 100%;
  height: 100%;
`;
export default class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
    };
  }
  render() {
    const { isError } = this.state;
    const {
      src = PROFILE_PLACEHOLDER,
      alt,
      onLoad,
      onError,
      ...rest
    } = this.props;
    return (
      <React.Fragment>
        <Img
          src={src || PROFILE_PLACEHOLDER}
          alt={alt}
          onError={() => {
            this.setState({
              error: true,
            });
            if (onError) onError();
          }}
          {...rest}
        />
        {isError && <Img src={PROFILE_PLACEHOLDER} />}
      </React.Fragment>
    );
  }
}
