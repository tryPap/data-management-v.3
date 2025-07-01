import { useState } from "react";
import EditStudentModal from "./edit-stud-modal/studModal";

const Student = ({
  student,
  index,
  deleteStudent,
  updateStudent,
  renameKeyAcrossStudents,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);

    if (!student || typeof student !== "object") return null;

    
  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  const handleSaveStudent = (updatedStudent, keyChanges) => {

    if (updatedStudent === null) {
    deleteStudent(index);
    return;
  }

    if (keyChanges.length > 0) {
      renameKeyAcrossStudents(keyChanges);
    }

    // Then update this specific student
    updateStudent(index, updatedStudent);
    setShowEditModal(false);
  };


  return (
    <>
      <div className="student-item">
        <span className="studIndex">{index + 1}.</span>

        <div className="student-info">
          {Object.entries(student).map(([key, value]) => (
            <div key={key}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
              <span>{value}</span>
            </div>
          ))}
        </div>

        <div className="student-actions">
          <div className="btnEditDelete">
            <button className="edit-button" onClick={handleEdit}>
              Edit
            </button>
            <button
              className="delete-button"
              onClick={() => deleteStudent(index)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {showEditModal && (
        <EditStudentModal
          student={student}
          onSave={handleSaveStudent}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default Student;
