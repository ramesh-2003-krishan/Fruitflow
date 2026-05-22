import './App.css'
import Header from './components/header'
import ProductCard from './components/productCard'

function App() {
 

  return (
    <>
      <Header />
      <ProductCard name="apple" description="A crisp red apple" price={1.99} />
    </>
  )
}

export default App
