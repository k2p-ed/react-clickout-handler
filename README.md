# react-clickout-handler

A React component to handle clicking outside of an element.

[![travis build](https://img.shields.io/travis/k2p-ed/react-clickout-handler.svg?style=flat-square)](https://travis-ci.org/k2p-ed/react-clickout-handler)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

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
| `children` | `Node | ({ [string]: Ref }) => any` | true |  | The element(s) you want to trigger the `onClickOut` callback when clicked outside of |
| `enabled` | `boolean` | false | `true` | Enables or disables the clickout behavior. This can be useful to ensure the `onClickOut` callback is only executed when you want it to be. |
| `events` | `string[]` | false | `['mousedown', 'touchstart']` | Allows for specifying custom events to trigger the `onClickOut` callback |
| `ignoredElements` | `Object[]` | false | `[]` | An array of refs for elements to exclude from triggering the clickout behavior |
| `refProp` | `string` | false | `ref` | Specify a prop name to use for getting a ref to the wrapped component. Useful if you need to get the ref for a "composed" component, or if you're using something like [styled-components](https://www.styled-components.com/), which requires use of `innerRef` to get the ref of a styled component. |
| `wrapWith` | `ElementType` | false | `null` | Specify what type of element to wrap the children with. Can be a React component or string such as `div`.  If this prop is not provided, the `ClickOutHandler` component will either clone the child element (if single child) or wrap the children in a `div` (if multiple children). |
| `onClickOut` | `(ev: Event) => any` | true |  | Function to be called when the clickout behavior is triggered. Receives the click event as an argument. |

### Examples

#### Excluding element(s)

If there are any elements outside of your ClickOutHandler component that you do not want to trigger the clickout behavior when clicked, you can pass a ref to the `ignoredElements` prop.

```js
import React, { Component } from 'react'
import ClickOutHandler from 'react-clickout-handler'

export default class MyComponent extends Component {
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
          ignoredElements={[this.saveButton]}
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

#### Refs

`ClickOutHandler` relies on having a ref to its immediate child. If the child is unable to directly accept a `ref` prop, there are two options:

Use the `refProp` prop

```js
  import React from 'react'
  import ClickOutHandler from 'react-clickout-handler'
  import styled from 'styled-components'

  const MyDiv = styled.div`
    background-color: red;
  `

  const handleClickOut = () => {
    console.log('You clicked me!')
  }

  const MyComponent = () => (
    <ClickOutHandler onClickOut={handleClickOut} refProp='innerRef'>
      <MyDiv />
    </ClickOutHandler>
  )
```

Pass a function as the child

```js
  import React from 'react'
  import ClickOutHandler from 'react-clickout-handler'
  import styled from 'styled-components'

  const MyDiv = styled.div`
    background-color: red;
  `

  const handleClickOut = () => {
    console.log('You clicked me!')
  }

  const MyComponent = () => (
    <ClickOutHandler onClickOut={handleClickOut}>
      {({ ref }) => <MyDiv innerRef={ref} />}
    </ClickOutHandler>
  )
```

<a href="https://zenhub.com"><img src="https://raw.githubusercontent.com/ZenHubIO/support/master/zenhub-badge.png"></a>

### License

MIT
