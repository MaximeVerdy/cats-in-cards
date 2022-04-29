import { useState, useEffect } from 'react'
import Modal from 'react-modal';

import './styles/app.scss';
import './styles/modal.scss';

import Card from './components/Card'
import catImage from './assets/shadow-cat.jpg'

function App() {

  const [catsArray, setCatsArray] = useState([]);
  const [randomFact, setRandomFact] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);


  useEffect(() => {
    const findCats = async () => {
      const data = await fetch('https://catfact.ninja/breeds')
      const body = await data.json()
      setCatsArray(body.data)
    }
    findCats()
  }, [])

  const handleClick = async () => {
    const data = await fetch('https://catfact.ninja/fact')
    const body = await data.json()
    setRandomFact(body.fact)
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false);
  }

  let catsInUI = catsArray.map((cat, i) => (
    <div
      key={i}
      onClick={() => handleClick()}

    >
      <Card
        img={catImage}
        title={cat.breed}
        country={'from ' + cat.country}
        coat={cat.coat + ' coat'}
        pattern={cat.pattern + ' pattern'}
        onClick={() => handleClick()}
      />
    </div>
  ))

  let modal =
    <Modal
      className="Modal"
      overlayClassName="Overlay"
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Modal"
      ariaHideApp={false}
    >
      <div>{randomFact}</div>
    </Modal>


  return (
    <div>
      <h1>
        CATS IN CARDS
      </h1>
      <div className="wrapper">
        {catsInUI}
        {modal}
      </div>
    </div>
  );
}

export default App;
