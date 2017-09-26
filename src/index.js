import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ClickOutHandler extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.node
    ]).isRequired,
    enabled: PropTypes.bool,
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
    ignoredElements: [],
    refProp: 'ref',
    wrapWith: null
  }

  componentDidMount() {
    this.events.forEach((event) => {
      document.addEventListener(event, this.handleClickOut)
    })
  }

  componentWillUnmount() {
    this.events.forEach((event) => {
      document.removeEventListener(event, this.handleClickOut)
    })
  }

  setRef = (el) => { this.wrapper = el }

  getWrapper = () => React.createElement(
    this.props.wrapWith || 'div',
    { [this.props.refProp]: this.setRef },
    this.props.children
  )

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

  events = ['mousedown', 'touchstart']

  render() {
    const { children, refProp, wrapWith } = this.props

    return Array.isArray(this.props.children) || wrapWith
      ? this.getWrapper()
      : React.cloneElement(React.Children.only(children), { [refProp]: this.setRef })
  }
}
