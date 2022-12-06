import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile content__profile">
        <img
          className="profile__avatar"
          src={currentUser.avatar}
          alt="аватар пользователя"
          onClick={props.onEditAvatar}
        />
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            type="button"
            className="button profile__edit-button"
            aria-label="Редактировать"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="button profile__add-button"
          aria-label="Добавить"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements content__elements">
        <ul className="elements__grid">
          {props.cards.map((data) => (
            <Card
              key={data._id}
              card={data}
              onCardClick={props.onCardClick}
              onCardLike={props.handleCardLike}
              onCardDelete={props.handleCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
