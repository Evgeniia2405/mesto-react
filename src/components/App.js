import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Footer from './Footer';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false)
  function handleConfirmDeleteClick() {
    setIsConfirmDeletePopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsConfirmDeletePopupOpen(false)
    setSelectedCard(null)
  }

  const [selectedCard, setSelectedCard] = useState(null);
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <div className="page">
      <Header />
      <Main 
        onEditAvatar={handleEditAvatarClick} 
        onEditProfile={handleEditProfileClick} 
        onAddPlace={handleAddPlaceClick} 
        onCardClick={handleCardClick}/>
      <PopupWithForm 
        title="Редактировать профиль" 
        name="edit"
        isOpen={isEditProfilePopupOpen} 
        btnName="Сохранить"
        closePopup={closeAllPopups}
        children={
        <>
          <label className="popup__label">
            <input id="username" type="text" name="name" placeholder="Имя" className="popup__input popup__input_type_name" required minLength="2" maxLength="40" />
            <span id="username-error" className="popup__error">Вы пропустили это поле.</span>
          </label>
          <label className="popup__label">
            <input id="userjob" type="text" name="about" placeholder="О себе" className="popup__input popup__input_type_job" required minLength="2" maxLength="200" />
            <span id="userjob-error" className="popup__error">Вы пропустили это поле.</span>
          </label>
        </>
        }/>
      <PopupWithForm 
        closePopup={closeAllPopups}
        title="Новое место" 
        name="add" 
        isOpen={isAddPlacePopupOpen} 
        btnName="Создать" 
        children={
        <>
          <label className="popup__label">
            <input id = "placename" type="text" name="name" placeholder="Название" className="popup__input popup__input_type_place"  required minLength="2" maxLength="30"/>
            <span id="placename-error" className="popup__error"></span>
          </label>
          <label className="popup__label">
            <input id="url" type="url" name="link" placeholder="Ссылка на картинку" className="popup__input popup__input_type_link" required />
          <span id="url-error" className="popup__error"></span>
        </label>
        </>
        }/>
      <PopupWithForm 
        closePopup={closeAllPopups}
        title="Обновить аватар" 
        name="avatar" 
        isOpen={isEditAvatarPopupOpen} 
        btnName="Сохранить"
        children={
        <>
          <label className="popup__label">
            <input id = "avatar" type="text" name="avatar" placeholder="Ссылка на картинку" className="popup__input popup__input_type_avatar" required />
            <span id="avatar-error" className="popup__error"></span>
          </label>
        </>}
      />
      <PopupWithForm 
        closePopup={closeAllPopups}
        title="Вы уверены?"
        name="confirmation" 
        isOpen={isConfirmDeletePopupOpen}
        btnName="Да" />
      <ImagePopup 
        card={selectedCard} 
        onClose={closeAllPopups}/>
      <Footer />
    </div>
  );
}

export default App;
