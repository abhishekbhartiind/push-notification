import "./App.css"
import { regSw, subscribe } from "./helper"

function App() {
  async function registerAndSubscribe() {
    try {
      const serviceWorkerReg = await regSw()
      await subscribe(serviceWorkerReg)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={registerAndSubscribe}>
          subscribe for push notifications
        </button>
      </header>
    </div>
  )
}

export default App
