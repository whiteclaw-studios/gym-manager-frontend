import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import '../../../globalStyles';
import { connect } from 'react-redux';
import { BG_COLOR } from '../../constants';

const Wrap = styled('div')`
  background: ${BG_COLOR};
  height: 100%;
  margin-top: 6.4rem;
  @media (max-width: 992px) {
    margin-top: 4rem;
  }
`;
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let deferredPrompt = null;
    const addBtn = document.querySelector('.add-button');
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI to notify the user they can add to home screen
      addBtn.style.display = 'block';

      addBtn.addEventListener('click', (e) => {
        // hide our user interface that shows our A2HS button
        // addBtn.style.display = 'none';
        console.log('e fired', e);
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
      });
    });
  }
  render() {
    const { route = {} } = this.props;
    return (
      <Wrap>
        <button className="add-button">Add to home screen</button>
        {renderRoutes(route.routes, {
          ...this.props,
        })}
      </Wrap>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  route: PropTypes.object,
};
