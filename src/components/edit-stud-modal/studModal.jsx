import { useState } from "react";

const EditStudentModal = ({ student, onSave, onClose }) => {
  // regex for only text
  const textRegex = /^[a-zA-Z\s]*$/;

  // Initialize state with student data
  const [editedFields, setEditedFields] = useState(() => {
    return Object.keys(student).map((key) => ({
      key,
      value: student[key],
      originalKey: key,
    }));
  });

  // Handle input change for keys or values
  const handleFieldChange = (fieldIndex, type, newValue) => {
    setEditedFields((prev) =>
      prev.map((field, idx) =>
        idx === fieldIndex ? { ...field, [type]: newValue } : field
      )
    );
  };

  // Add a new field
  const addField = () => {
    setEditedFields((prev) => [
      ...prev,
      { key: "", value: "", originalKey: "" },
    ]);
  };

  // Remove a field
  const removeField = (fieldIndex) => {
    setEditedFields((prev) => prev.filter((_, idx) => idx !== fieldIndex));
  };

  // Move field up
  const moveFieldUp = (fieldIndex) => {
    if (fieldIndex === 0) return;
    setEditedFields((prev) => {
      const newFields = [...prev];
      [newFields[fieldIndex - 1], newFields[fieldIndex]] = [
        newFields[fieldIndex],
        newFields[fieldIndex - 1],
      ];
      return newFields;
    });
  };

  // Move field down
  const moveFieldDown = (fieldIndex) => {
    if (fieldIndex === editedFields.length - 1) return;
    setEditedFields((prev) => {
      const newFields = [...prev];

      [newFields[fieldIndex], newFields[fieldIndex + 1]] = [
        newFields[fieldIndex + 1],
        newFields[fieldIndex],
      ];
      return newFields;
    });
  };

  const handleSaveEdit = () => {
    const hasEmptyKey = editedFields.some(({ key }) => key.trim() === "");

    if (hasEmptyKey) {
      alert("Field keys cannot be empty.");
      return;
    }

    // Check if all fields are empty (both key and value)
    const allFieldsEmpty = editedFields.every(
      ({ key, value }) => key.trim() === "" && value.trim() === ""
    );

    if (allFieldsEmpty) {
      if (
        window.confirm(
          "All fields are empty. Do you want to delete this student?"
        )
      ) {
        onSave(null, []); 
        onClose();
      }
      return; 
    }

    const keyChanges = [];

    editedFields.forEach(({ key, originalKey }) => {
      const trimmedKey = key.trim();

      if (trimmedKey.match(textRegex) !== null) {
      }

      if (
        originalKey &&
        originalKey !== trimmedKey &&
        trimmedKey &&
        originalKey !== ""
      ) {
        keyChanges.push({
          oldKey: originalKey,
          newKey: trimmedKey,
        });
      }
    });

    const newStudent = {};

    editedFields.forEach(({ key, value }) => {
      const trimmedKey = key.trim();

      if (trimmedKey) {
        newStudent[trimmedKey] = value;
      }
    });

    if (keyChanges.length > 0) {
      const message = keyChanges
        .map((c) => `• "${c.oldKey}" → "${c.newKey}"`)
        .join("\n");
      if (window.confirm(`Do you want to change all the keys? ${message}`)) {
        onSave(newStudent, keyChanges);
      } else {
        onSave(newStudent, []);
      }
    } else {
      onSave(newStudent, []);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Editing...</h3>
          <button className="close-button" onClick={handleCancel}>
            ×
          </button>
        </div>

        <div className="modal-body">
          {editedFields.map((field, fieldIndex) => (
            <div key={fieldIndex} className="field-edit-row">
              <div className="field-controls">
                <button
                  type="button"
                  onClick={() => moveFieldUp(fieldIndex)}
                  disabled={fieldIndex === 0}
                  className="move-button"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveFieldDown(fieldIndex)}
                  disabled={fieldIndex === editedFields.length - 1}
                  className="move-button"
                >
                  ↓
                </button>
              </div>

              <div className="field-inputs">
                <input
                  type="text"
                  placeholder="Field Key"
                  value={field.key}
                  onChange={(e) => {
                    const inputKey = e.target.value;

                    if (textRegex.test(inputKey)) {
                      handleFieldChange(fieldIndex, "key", e.target.value);
                    }
                  }}
                  className="key-input"
                />
                <span className="separator">:</span>
                <input
                  type="text"
                  placeholder="Field Value"
                  value={field.value}
                  onChange={(e) =>
                    handleFieldChange(fieldIndex, "value", e.target.value)
                  }
                  className="value-input"
                />
              </div>

              <button
                className="remove-field-button"
                onClick={() => removeField(fieldIndex)}
                type="button"
              >
                ×
              </button>
            </div>
          ))}

          <button className="add-field-button" onClick={addField} type="button">
            + Add New Field
          </button>
        </div>

        <div className="modal-footer">
          <button className="save-button" onClick={handleSaveEdit}>
            Save
          </button>
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStudentModal;
