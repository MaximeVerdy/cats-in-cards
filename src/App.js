import { useState, useEffect } from 'react'
import './App.scss';

import Card from './components/Card'
import catImage from './assets/shadow-cat.jpg'

function App() {

  const [catsArray, setCatsArray] = useState([])

  useEffect(() => {
    const findCats = async () => {
      const data = await fetch('https://catfact.ninja/breeds')
      const body = await data.json()
      setCatsArray(body.data)
    }
    findCats()

  }, [])


  let catsInUI = catsArray.map((cat, i) => (
    <Card
      key={i}
      img={catImage}
      title={cat.breed}
      country={'from ' + cat.country}
      coat= {cat.coat + ' coat'}
      pattern= {cat.pattern + ' pattern'}
    />
  ))

  return (
    <div className="wrapper">
      {catsInUI}
    </div>
  );
}

export default App;
