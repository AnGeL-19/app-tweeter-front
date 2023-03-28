import React from "react";

export const MenuPrivacity = ({setValue,showPrivacity}) => {

  const options = {
    public: 'public',
    people: 'people',
  }

  const handleOption = (value) => {

    setValue(restp => ({
      ...restp,
      privacity: value
    }))
    showPrivacity(false);
  }

  return (
    <div className="div__menu">
      <div className="div__title_description">
        <span className="title">Who can reply?</span>
        <p className="description gray3Color">
          Choose who can reply to this Tweet.
        </p>
      </div>

      <div className="select_privacity">
        <div className="privacity" onClick={() => handleOption(options.public)}>
          <span className="material-icons mrg_r_9 black">public</span>
          <span className="reply">Everyone</span>
        </div>
        <div className="privacity" onClick={() => handleOption(options.people)}>
          <span className="material-icons mrg_r_9 black">people</span>
          <span className="reply">People you follow</span>
        </div>
      </div>
    </div>
  );
};
