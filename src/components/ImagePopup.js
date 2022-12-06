import React from "react";
function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_type_card popup_theme_dark ${
        card ? "popup_opened" : ""
      }`}
      onClick={onClose}
    >
      <div
        className="popup__container popup__container_type_image"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          className="popup__image"
          src={card ? card.link : ""}
          alt={card ? card.name : ""}
        />
        <h2 className="popup__title-image">{card ? card.name : ""}</h2>
        <button
          type="button"
          aria-label="Закрыть"
          className="button popup__close"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
