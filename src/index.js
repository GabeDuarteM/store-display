import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'

import AppWrapperContainer from './containers/AppWrapperContainer'
import App from './components/App'

render(
  <AppWrapperContainer>
    <App />
  </AppWrapperContainer>,
  document.getElementById('app'),
)
