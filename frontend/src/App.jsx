import Navbar from "./components/Navbar"
import Routes from "./routes"

function App() {

  return (
    <div className="flex flex-col gap-3">
      <Navbar/>
      <Routes/>
    </div>  
  )
}

export default App