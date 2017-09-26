/* eslint import/no-extraneous-dependencies: 0 */

require('babel-register')()

const jsdom = require('jsdom')

const { JSDOM } = jsdom

const exposedProperties = ['window', 'navigator', 'document']

const { document } = (new JSDOM('')).window
global.document = document
global.window = document.defaultView
global.navigator = window.navigator
global.MouseEvent = global.window.MouseEvent

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property)
    global[property] = document.defaultView[property]
  }
})

global.navigator = {
  userAgent: 'node.js'
}
