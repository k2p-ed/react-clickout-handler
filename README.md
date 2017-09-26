# react-clickout-handler

A React component to handle clicking outside of an element.

### Features

* Wrap a single element or multiple elements to watch for clickout behavior
* Ignore one or more elements (clickout behavior won't be triggered) by adding them to the `ignoredElements` prop
* Enable or disable the clickout behavior on the fly with the `enabled` prop

### Installation

```sh
  yarn add react-clickout-handler
```

or

```sh
  npm install --save react-clickout-handler
```

### Getting Started

```js
  import React from 'react'
  import ClickOutHandler from 'react-clickout-handler'

  const MyComponent = () => {
    const handleClickOut = () => {
      console.log('clicked out!')
    }

    return (
      <ClickOutHandler onClickOut={handleClickOut}>
        <div className='modal'>
          This is a modal! Click outside to close it.
        </div>
      </ClickOutHandler>
    )
  }
```

### Props

| Prop | Type | Required | Default | Description |
|-------------------|----------------------------------------------|----------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `children` | `oneOfType([   array,   node ])` | true |  | The element(s) you want to trigger the `onClickOut` callback when clicked outside of |
| `enabled` | `func` | false | `true` | Enables or disables the clickout behavior. This can be useful to ensure the `onClickOut` callback is only executed when you want it to be. |
| `ignoredElements` | `arrayOf(object)` | false | `[]` | An array of refs for elements to exclude from triggering the clickout behavior |
| `refProp` | `string` | false | `ref` | Specify a prop name to use for getting a ref to the wrapped component. Useful if you need to get the ref for a "composed" component, or if you're using something like [styled-components](https://www.styled-components.com/), which requires use of `innerRef` to get the ref of a styled component. |
| `wrapWith` | `oneOfType([   element,   func,   string ])` | false | `null` | Specify what type of element to wrap the children with. Can be a React component or string such as `div`.  If this prop is not provided, the `ClickOutHandler` component will either clone the child element (if single child) or wrap the children in a `div` (if multiple children). |
| `onClickOut` | `func` | true |  | Function to be called when the clickout behavior is triggered. Receives the click event as an argument. |

### Examples

#### Excluding element(s)

If there are any elements outside of your ClickOutHandler component that you do not want to trigger the clickout behavior when clicked, you can pass a ref to the `ignoredElements` prop.

```js
import React, { Component } from 'react'
import ClickOutHandler from 'react-clickout-handler'

export default class = MyComponent extends Component {
  state = {
    data: ''
  }

  handleChange = (data) => {
    this.setState({ data })
  }

  save = () => {
    apiCall(this.state.data)
  }

  setRef = (el) => { this.saveButton = el }

  render() {
    return (
      <div id='my-app'>
        <ClickOutHandler
          ignoredElements={[this.button]}
          onClickOut={handleClickOut}
        >
          <SomeComponent onChange={this.handleChange} />
        </ClickOutHandler>
        <button ref={this.setRef} onClick={this.save}>
          Save
        </button>
      </div>
    )
  }
}
```

### License

MIT
