###Usage
import ReactCssTransition from 'components/ReactCssTransition';

###Props
mountingStyle - keyframes for mounting animation
unmoutingStyle - keyframes for unmounting animation
duration - transition duration
shouldShow - send the State value to mount or unmount
unMountCallback - for unmounting on clicking in child component

###Example
<button onClick={this.testTransition}>Click</button>
<ReactCssTransition
unMountCallback={this.testTransition}
mountingStyle={
keyframes`from { } to{ }`
}
unmountingStyle={keyframes`from { } to{ }`}
duration={400}
shouldShow={this.state.toShow} >
<TestComponent />
</ReactCssTransition>

###TestComponent
import React from 'react';
import styled from 'react-emotion';
const Test = styled('div')`border: 1px solid red; position: relative;`;
/_eslint-disable _/
export default class TestComponent extends React.Component {
render() {
return (
<Test className={this.props.className}>
Hello
<button onClick={this.props.unMountCallback}>Close me</button>
</Test>
);
}
}
