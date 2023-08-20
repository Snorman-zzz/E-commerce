import React from 'react';
import './Feedback.scss';

const Feedback = () => {
    return (
        <span id="feedback-ontainer">
      <button
          id="feedback_btn"
          className="feedback-btn-img"
          // tabIndex="0"
      >
        <img
            alt="Feedback"
            src="https://resources.digital-cloud.medallia.com/wdcus/55284/resources/image/1606143979979_Feedback-Updated.jpg"
        />
      </button>
    </span>
    );
};

export default Feedback;
