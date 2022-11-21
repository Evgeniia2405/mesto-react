import React from 'react';
function PopupWithForm(props) {

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''} popup_theme_light`} >
      <div className="popup__container popup__container_type_form">
        <h2 className=" popup__title">{props.title}</h2>
        <form name={`popup-${props.name}`} className={`popup__form popup__form_type_${props.name}`} noValidate>
          {props.children}
          <button type="submit" className="button popup__button popup__button_save" disabled="disabled">{props.btnName}</button>
        </form>
        <button type="button" aria-label="Закрыть" className="button popup__close" onClick={props.closePopup}></button>
      </div>
    </div>
  );
}

export default PopupWithForm;