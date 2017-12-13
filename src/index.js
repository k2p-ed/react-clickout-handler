import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ClickOutHandler extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.func,
      PropTypes.node
    ]).isRequired,
    enabled: PropTypes.bool,
    events: PropTypes.arrayOf(PropTypes.string),
    ignoredElements: PropTypes.arrayOf(PropTypes.object),
    refProp: PropTypes.string,
    wrapWith: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      PropTypes.string
    ]),
    onClickOut: PropTypes.func.isRequired
  }

  static defaultProps = {
    enabled: true,
    events: ['mousedown', 'touchstart'],
    ignoredElements: [],
    refProp: 'ref',
    wrapWith: null
  }

  componentDidMount() {
    this.props.events.forEach((event) => {
      document.addEventListener(event, this.handleClickOut)
    })
  }

  componentWillUnmount() {
    this.props.events.forEach((event) => {
      document.removeEventListener(event, this.handleClickOut)
    })
  }

  setRef = (el) => { this.wrapper = el }

  getWrapper() {
    return React.createElement(
      this.props.wrapWith || 'div', {
        [this.props.refProp]: this.setRef
      },
      this.props.children
    )
  }

  shouldFire(ev) {
    return (
      this.props.enabled &&
      this.wrapper &&
      !this.wrapper.contains(ev.target) &&
      !this.props.ignoredElements.some(element => element && element.contains(ev.target))
    )
  }

  handleClickOut = (ev) => {
    if (this.shouldFire(ev)) this.props.onClickOut(ev)
  }

  render() {
    const { children, refProp, wrapWith } = this.props

    if (Array.isArray(children) || wrapWith) return this.getWrapper()
    if (typeof children === 'function') return children({ ref: this.setRef })
    return React.cloneElement(React.Children.only(children), { [refProp]: this.setRef })
  }
}
