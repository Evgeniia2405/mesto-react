import React from "react";
function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      } popup_theme_light`}
      onClick={props.onClose}
    >
      <div
        className="popup__container popup__container_type_form"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className=" popup__title">{props.title}</h2>
        <form
          name={`popup-${props.name}`}
          className={`popup__form popup__form_type_${props.name}`}
          noValidate
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            type="submit"
            className="button popup__button popup__button_save"
          >
            {props.btnName}
          </button>
        </form>
        <button
          type="button"
          aria-label="Закрыть"
          className="button popup__close"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
