import { useState } from "react"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Main from "./components/Main"

function App() {
  const [busca, setBusca] = useState("");
  return (
    <div className="bg-gray-200">
      <Header onBuscaChange={setBusca}/>
      <Main busca={busca}/>
      <Footer/>
    </div>
  )
}

export default App
