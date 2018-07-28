import React, { Component } from "react";
/*
https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html

We are doing a few things here:

The asyncComponent function takes an argument; a function (importComponent) that when called will dynamically import a given component. This will make more sense below when we use asyncComponent.
On componentDidMount, we simply call the importComponent function that is passed in. And save the dynamically loaded component in the state.
Finally, we conditionally render the component if it has completed loading. If not we simply render null. But instead of rendering null, you could render a loading spinner. This would give the user some feedback while a part of your app is still loading.
*/
export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component
      });
    }

    render() {
      const C = this.state.component;
		console.log('c is ', C);
      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}