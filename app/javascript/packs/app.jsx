// Run this example by adding <%= javascript_pack_tag 'app' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import axios from 'axios'

const Curling = props => (
  <div>Hello {props.name}!</div>
)

axios.get()

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Curling name="A collection of Curling Coaches!! this is more text to test" >
     </Curling> ,
    document.body.appendChild(document.createElement('div')),
  )
})