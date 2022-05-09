import * as serviceWorker from './serviceWorker'
import React, {FC} from 'react'
import ReactDOM from 'react-dom'
import './index.sass'
import {MainJSApp} from './App'


export const Test: FC = () => {
  return (
    <div>
      test
    </div>
  )
}

ReactDOM.render(
  <MainJSApp/>,
  document.getElementById('root')
)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
