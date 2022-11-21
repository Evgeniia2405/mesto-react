import React, { useState } from 'react';

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }   

  return (
    <li className="element">
      <img src={props.card.link} className="element__img" alt={props.card.name} onClick={handleClick}/>
      <button type="button" className="button element__trash-btn" aria-label="Trash"></button>
      <div className="element__form-like">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like">
          <button type="button" className="button element__like-btn" aria-label="Like"></button>
          <div className="element__like-count">{props.card.likes.length}</div>
        </div>
      </div>
    </li>
  )
}

export default Card