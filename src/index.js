// @flow

import React, { Component, type ElementType, type Node } from 'react'

type Ref = (el: HTMLElement) => void

type Props = {
  children: Node | ({ [string]: Ref }) => any,
  enabled: boolean,
  events: string[],
  ignoredElements: HTMLElement[],
  refProp: string,
  wrapWith: ?ElementType,
  onClickOut: (ev: Event) => any
}

export default class ClickOutHandler extends Component<Props> {
  static defaultProps = {
    enabled: true,
    events: ['mousedown', 'touchstart'],
    ignoredElements: [],
    refProp: 'ref',
    wrapWith: null
  }

  wrapper: ?HTMLElement

  componentDidMount() {
    this.props.events.forEach((event: string) => {
      document.addEventListener(event, this.handleClickOut)
    })
  }

  componentWillUnmount() {
    this.props.events.forEach((event: string) => {
      document.removeEventListener(event, this.handleClickOut)
    })
  }

  handleClickOut = (ev: Event) => {
    if (this.shouldFire(ev)) this.props.onClickOut(ev)
  }

  setRef = (el: HTMLElement) => { this.wrapper = el }

  shouldFire(ev: Event) {
    return (
      this.props.enabled &&
      this.wrapper &&
      !this.wrapper.contains((ev.currentTarget: any)) &&
      !this.props.ignoredElements.some(element => (
        element && element.contains((ev.currentTarget: any))
      ))
    )
  }

  render() {
    const { children, refProp, wrapWith } = this.props
    const props = { [refProp]: this.setRef }

    if (typeof children === 'function') {
      return children(props)
    }

    if (Array.isArray(children) || wrapWith) {
      const Wrapped = wrapWith || 'div'

      return <Wrapped {...props}>{children}</Wrapped>
    }

    return React.cloneElement(React.Children.only(children), props)
  }
}
