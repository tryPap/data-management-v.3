import React, { useEffect, useRef } from "react";
import "./modal.css";
import prototypes from "../prototypes/prototypesData"; // Adjust path as necessary

const PrototypesModal = ({ onClose, onSelectPrototype }) => {
  // Create a ref for the modal content to detect clicks inside or outside of it
  const modalContentRef = useRef(null);

  useEffect(() => {
    // Function to handle clicks outside the modal content
    const handleClickOutside = (event) => {
      // If the click is outside of the modal content, close the modal
      if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
        onClose(); // Close the modal
      }
    };

    // Attach the event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="modal">
      <div className="modal-content" ref={modalContentRef}> {/* Attach the ref here */}
        <h2>Select a Prototype</h2>
        <div className="prototype-grid">
          {prototypes.map((prototype) => (
            <div
              className="prototype-wraper"
              onClick={() => onSelectPrototype(prototype.keys)}
              key={prototype.id}
            >
              <div className="prototype-title">
                {prototype.description}
              </div>
              <div>
                <ul>
                  {prototype.keys.map((key, index) => (
                    <div key={index}>{key}</div>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <span className="close" onClick={onClose}>
          Close
        </span>
      </div>
    </div>
  );
};

export default PrototypesModal;
