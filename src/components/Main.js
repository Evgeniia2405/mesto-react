import React, { useEffect, useState } from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main(props) {
  const [userName, setuserName] = useState('')
  const [userDescription, setuserDescription] = useState('')
  const [userAvatar, setuserAvatar] = useState('')
  const [cards, setCards] = useState([])

  useEffect( () => {
    const promises = [api.getUserInfo(), api.getInitialCards()]

    Promise.all(promises)
      .then(([userData, CardsData]) => {
        setuserName(userData.name)
        setuserDescription(userData.about)
        setuserAvatar(userData.avatar)
        setCards(CardsData)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
    })

  }, [])

  return (
    <main className="content">
    <section className="profile content__profile">
      <img className="profile__avatar" src={userAvatar} alt="аватар пользователя" onClick={props.onEditAvatar} />
      <div className="profile__info">
        <h1 className="profile__name">{userName}</h1>
        <button type="button" className="button profile__edit-button" aria-label="Редактировать" onClick={props.onEditProfile} ></button>
        <p className="profile__job">{userDescription}</p>
      </div>
      <button type="button" className="button profile__add-button" aria-label="Добавить" onClick={props.onAddPlace} ></button>
    </section>
    <section className="elements content__elements">
      <ul className="elements__grid">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick} />
        ))}
      </ul>
    </section>
    </main>
  );
}

export default Main;