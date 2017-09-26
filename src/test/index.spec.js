/* eslint no-unused-expressions: 0 */

import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import ClickOutHandler from '../'

describe('ClickOutHandler', () => {
  context('when an element other than a child is clicked', () => {
    context('when optional props are using default values', () => {
      it('should execute the onClickOut callback', () => {
        const onClickOut = sinon.spy()
        mount(
          <div>
            <ClickOutHandler onClickOut={onClickOut}>
              <div />
            </ClickOutHandler>
            <div id='test' />
          </div>
        )
        const event = new MouseEvent('mousedown')
        document.dispatchEvent(event)
        expect(onClickOut.calledOnce).to.be.true
      })
    })

    context('when the "enabled" prop is false', () => {
      it('should not execute the onClickOut callback', () => {
        const onClickOut = sinon.spy()
        mount(
          <div>
            <ClickOutHandler enabled={false} onClickOut={onClickOut}>
              <div />
            </ClickOutHandler>
            <div id='test' />
          </div>
        )
        const event = new MouseEvent('mousedown')
        document.dispatchEvent(event)
        expect(onClickOut.calledOnce).to.be.false
      })
    })
  })

  context('when the child element is clicked', () => {
    it('should not execute the onClickOut callback', () => {
      const onClickOut = sinon.spy()
      const wrapper = mount(
        <ClickOutHandler onClickOut={onClickOut}>
          <div id='child' />
        </ClickOutHandler>, {
          attachTo: document.body
        }
      )
      const event = new MouseEvent('mousedown')
      document.getElementById('child').dispatchEvent(event)
      wrapper.detach()
      expect(onClickOut.called).to.be.false
    })
  })

  context('when an element in the "ignoredElements" prop is clicked', () => {
    it('should not execute the onClickOut callback', () => {
      const onClickOut = sinon.spy()
      const wrapper = mount(
        <div>
          <ClickOutHandler
            ignoredElements={[document.getElementById('ignore')]}
            onClickOut={onClickOut}
          >
            <div id='child' />
          </ClickOutHandler>
          <div id='ignore' />
        </div>, {
          attachTo: document.body
        }
      )
      const event = new MouseEvent('mousedown')
      document.getElementById('ignore').dispatchEvent(event)
      wrapper.detach()
      expect(onClickOut.called).to.be.false
    })
  })

  context('when the "wrapWith" prop has a string value', () => {
    it('should create that as the top-most element', () => {
      const onClickOut = () => {}
      const wrapper = shallow(<ClickOutHandler wrapWith='table' onClickOut={onClickOut}><div /></ClickOutHandler>)
      expect(wrapper.type()).to.equal('table')
    })
  })

  context('when the "wrapWith" prop is passed a React element', () => {
    it('should create that as the top-most element', () => {
      const onClickOut = () => {}
      const TestElement = () => <div className='test' />
      const wrapper = shallow(
        <ClickOutHandler wrapWith={TestElement} onClickOut={onClickOut}>
          <div />
        </ClickOutHandler>
      )
      expect(wrapper.type()).to.equal(TestElement)
    })
  })

  context('when the "refProp" prop has a value', () => {
    it('should add that prop to the top-most element', () => {
      const onClickOut = () => {}
      const wrapper = shallow(
        <ClickOutHandler refProp='innerRef' onClickOut={onClickOut}>
          <div className='test' />
        </ClickOutHandler>
      )
      expect(wrapper.find('.test').props().innerRef).to.be.ok
    })
  })
})
