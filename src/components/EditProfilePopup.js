import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);
  useEffect(() => {
    setName(currentUser ? currentUser.name : "");
    setAbout(currentUser ? currentUser.about : "");
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAboutChange(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault(e);
    onUpdateUser({ name: name, about: about });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      isOpen={isOpen}
      btnName="Сохранить"
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            id="username"
            type="text"
            name="name"
            placeholder="Имя"
            className="popup__input popup__input_type_name"
            required
            minLength="2"
            maxLength="40"
            value={name}
            onChange={handleNameChange}
          />
          <span id="username-error" className="popup__error">
            Вы пропустили это поле.
          </span>
          <input
            id="userjob"
            type="text"
            name="about"
            placeholder="О себе"
            className="popup__input popup__input_type_job"
            required
            minLength="2"
            maxLength="200"
            value={about}
            onChange={handleAboutChange}
          />
          <span id="userjob-error" className="popup__error">
            Вы пропустили это поле.
          </span>
        </>
      }
    />
  );
}

export default EditProfilePopup;
