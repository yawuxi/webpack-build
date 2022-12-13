//react
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
//rtk
import { Provider } from "react-redux";
import { store } from "./app/store";
//components
import { App } from './App'
//styles
import './index.module.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
