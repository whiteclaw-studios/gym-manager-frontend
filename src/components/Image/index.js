import React from 'react';
import styled from 'react-emotion';
import FitbossLogo from '../../images/FitBossLogo.jpg';
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
    const { src = FitbossLogo, alt, onLoad, onError, ...rest } = this.props;
    return (
      <React.Fragment>
        <Img
          src={src || FitbossLogo}
          alt={alt}
          onError={() => {
            this.setState({
              error: true,
            });
            if (onError) onError();
          }}
          {...rest}
        />
        {isError && <Img src={FitbossLogo} />}
      </React.Fragment>
    );
  }
}
