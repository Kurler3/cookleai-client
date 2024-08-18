
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AppProviders from './AppProviders.component.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <AppProviders>
      <App />
    </AppProviders>
  </>,
)
