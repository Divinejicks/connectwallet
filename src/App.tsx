import './App.css'
import { Login } from './component/login'
import { WagmiWrapper } from './web3Provider'

function App() {
  
  return (
    <>
      <WagmiWrapper>
        <Login />
      </WagmiWrapper>
    </>
  )
}

export default App
