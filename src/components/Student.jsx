import React, { useState } from 'react';

const Student = ({ student, index, deleteStudent, updateStudent }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent,setEditedStudent] = useState(student);

  // Handle input change in edit mode
  const handleInputChange = (field, value) => {
    setEditedStudent((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle save action
  const handleSave = () => {
    updateStudent(index, editedStudent);
    setIsEditing(false);
  };

  // Handle cancel action
  const handleCancel = () => {
    setEditedStudent(student);  // Reset to original data
    setIsEditing(false);
  };

  return (
    <div className="student-item">
      <span className='studIndex'>{index + 1}.</span>
      <div className="student-info">
        {Object.keys(student).map((key) => (
          <div key={key}>
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
            {isEditing ? (
              <input
                type="text"
                value={editedStudent[key]}
                onChange={(e) => handleInputChange(key, e.target.value)}
              />
            ) : (
              <span>{student[key]}</span>
            )}
          </div>
        ))}
      </div>
      <div className="student-actions">
        {isEditing ? (
          <>
          <div className='btnEditDelete'>
          <button className="save-button" onClick={handleSave}>Save</button>
          <button className="cancel-button" onClick={handleCancel}>Cancel</button>
          </div>
            
          </>
        ) : (
          <>
          <div className="btnEditDelete">
          <button className="edit-button" onClick={() => {
              setEditedStudent(student);
              setIsEditing(true)
          }}>Edit</button>          <button className="delete-button" onClick={() => deleteStudent(index)}>Delete</button>
          </div>
            
          </>
        )}
      </div>
      </div>


  );
};


export default Student;
