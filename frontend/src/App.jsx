import Routes from './routing';

import Navbar from './components/Navbar'

function App() {

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className='pt-20'> 
        <Routes/>
      </div>
    </div>
  )
}

export default App