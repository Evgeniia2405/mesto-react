import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault(e);
    onAddPlace({ name: name, link: link });
    setName("");
    setLink("");
  }

  return (
    <PopupWithForm
      onClose={onClose}
      title="Новое место"
      name="add"
      isOpen={isOpen}
      btnName="Создать"
      onSubmit={handleAddPlaceSubmit}
      children={
        <>
          <label className="popup__label">
            <input
              id="placename"
              type="text"
              name="name"
              placeholder="Название"
              className="popup__input popup__input_type_place"
              required
              minLength="2"
              maxLength="30"
              value={name}
              onChange={handleNameChange}
            />
            <span id="placename-error" className="popup__error"></span>
          </label>
          <label className="popup__label">
            <input
              id="url"
              type="url"
              name="link"
              placeholder="Ссылка на картинку"
              className="popup__input popup__input_type_link"
              required
              value={link}
              onChange={handleLinkChange}
            />
            <span id="url-error" className="popup__error"></span>
          </label>
        </>
      }
    />
  );
}

export default AddPlacePopup;
