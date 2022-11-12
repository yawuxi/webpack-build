//react
import React from 'react'
import ReactDOM from 'react-dom/client'
//rtk
import { Provider } from "react-redux";
import { store } from "./app/store";
//components
import { App } from './App'
//styles
import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
