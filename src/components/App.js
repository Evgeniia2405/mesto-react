import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';


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

  const [currentUser, setCurrentUser] = useState('')
  useEffect( () => {
    api.getUserInfo()
    .then( data => {
      setCurrentUser(data)
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
  })
  }, [])

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

  function handleUpdateUser(data) {
    api.editUserInfo(data.name, data.about)
    .then((formData) => {
      setCurrentUser(formData)
      closeAllPopups()
    }).catch((err) => {
      console.log('Ошибка при редактировании профиля', err);
    })
  }

  function handleUpdateAvatar(data) {
    api.editUserAvatar(data.avatar)
    .then((formData) => {
      setCurrentUser(formData)
      closeAllPopups()
    }).catch((err) => {
      console.log('Ошибка при редактировании аватара', err);
    })
  }
  
  const [cards, setCards] = useState([])

  useEffect( () => {
    api.getInitialCards()
      .then((data) => {
        setCards(data)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
    })
  }, [])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api.addLikeCard(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
    }
    else {
      api.removeLikeCard(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
    }
  } 

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }

  function handleUpdatePlaces(data) {
    api.createCard(data.name, data.link)
      .then(formData => {
        const newCard = (formData)
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => {
        console.log('Ошибка при добавлении новой карточки', err);
      })
    }

  return (
    <CurrentUserContext.Provider value={{currentUser}}>
      <div className="page">
        <Header />
        <Main 
          onEditAvatar={handleEditAvatarClick} 
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} 
          onCardClick={handleCardClick}
          cards={cards}
          handleCardLike={handleCardLike}
          handleCardDelete={handleCardDelete}
          />
        <Footer />
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}/> 
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar}/>
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleUpdatePlaces}/>
        <PopupWithForm 
          onClose={closeAllPopups}
          title="Вы уверены?"
          name="confirmation" 
          isOpen={isConfirmDeletePopupOpen}
          btnName="Да" />
        <ImagePopup 
          card={selectedCard} 
          onClose={closeAllPopups}/>
      </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
