import { useState, useEffect } from 'react'

import './styles/app.scss';
import './styles/modal.scss';

import CatCard from './components/CatCard'
import catPic from './assets/shadow-cat.jpg'

function App() {

  const [cats, setCats] = useState([]);
  const [fact, setFact] = useState('');


  useEffect(() => {
    const findCats = async () => {
      const data = await fetch('https://catfact.ninja/breeds');
      const body = await data.json();
      setCats(body.data);
    }
    findCats()
      .catch(e =>
        console.error(e)
      );
  }, [])

  const seeFactInModal = async () => {
    try {
      const data = await fetch("https://catfact.ninja/fact");
      const body = await data.json();
      setFact(body.fact);
    } catch (e) {
      console.error(e);
    }
    document.querySelector("#modal").showModal();
  }

  const closeModal = () => {
    document.querySelector("#modal").close();
  }


  return (
    <div>

      <dialog className="modal" id="modal">
        <p>{fact}</p>
        <button className="button close-button" onClick={() => closeModal()}>close</button>
      </dialog>

      <h1>
        CATS IN CARDS
      </h1>

      <div className="wrapper">
        {cats.map((cat, i) => (
          <div
            key={i}
            onClick={() => seeFactInModal()}
          >
            <CatCard
              img={catPic}
              title={cat.breed}
              coat={cat.coat + ' coat'}
              pattern={cat.pattern + ' pattern'}
            />
          </div>
        ))}

      </div>

    </div>
  );
}

export default App;
