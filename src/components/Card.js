import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `button element__trash-btn ${
    isOwn ? "element__trash-btn_visible" : "element__trash-btn_hidden"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `button element__like-btn ${
    isLiked ? "element__like-btn_active" : ""
  }`;

  return (
    <li className="element">
      <img
        src={props.card.link}
        className="element__img"
        alt={props.card.name}
        onClick={handleClick}
      />
      <button
        type="button"
        className={cardDeleteButtonClassName}
        aria-label="Trash"
        onClick={handleDeleteClick}
      ></button>
      <div className="element__form-like">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Like"
            onClick={handleLikeClick}
          ></button>
          <div className="element__like-count">{props.card.likes.length}</div>
        </div>
      </div>
    </li>
  );
}

export default Card;
