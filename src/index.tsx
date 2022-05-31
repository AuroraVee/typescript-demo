import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
// import './demo/generrics'
// import './demo/class-1-es6'
// import './demo/class-2-es6'
// import './demo/class'
// import './demo/enum'
// import './demo/interference-compatibility'
// import './demo/advanced-type-2'
import './demo/declaration-file'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
