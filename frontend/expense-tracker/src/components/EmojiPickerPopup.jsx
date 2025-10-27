import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage, Lux } from "react-icons/lu";
const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      <div className="" onClick={() => setIsOpen(true)}>
        <div className="">
          {icon ? <img src={icon} alt="Icon" className="" /> : <LuImage />}
        </div>

        <p className="">{icon ? "Change Icon" : "Pick up"}</p>
      </div>

      {isOpen && (
        <div className="">
          <button className="" onClick={() => setIsOpen(false)}>
            <Lux />
          </button>
          <EmojiPicker
            open={isOpen}
            onEmojiClick={(emoji) => onselect(emoji?.imageUrl || "")}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
