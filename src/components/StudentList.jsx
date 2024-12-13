import React, { useState, useRef } from "react";
import Student from "./Student";
import ReactToPrint from "react-to-print";
import PrintComponent from "./PrintComponent";
import "../index.css";
import ExcelJS from "exceljs";
import PrototypesModal from "./prototypes/prototypesModal";
import prototypes from "./prototypes/prototypesData"; // Adjust path as necessary

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [fields, setFields] = useState([]);
  const [newFieldName, setNewFieldName] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [showInstructions, setShowInstructions] = useState(true);
  const printComponentRef = useRef();
  const [showModal, setShowModal] = useState(false);

  // Function to update a student's data
  const updateStudent = (index, updatedStudent) => {
    const updatedStudents = [...students];
    updatedStudents[index] = updatedStudent;
    setStudents(updatedStudents);
  };

  // Update field value
  const handleFieldChange = (index, value) => {
    const newFields = [...fields];
    newFields[index].value = value;
    setFields(newFields);
  };

  // Handle new field name input change
  const handleNewFieldNameChange = (e) => {
    setNewFieldName(e.target.value);
  };

  // Handle sort criteria input change
  const handleSortCriteriaChange = (e) => {
    setSortCriteria(e.target.value);
    // Check if Enter key is pressed
  };

  const handleSortCriteriaKeyPress = (e) => {
    if (e.key === "Enter") {
      sortStudents(sortCriteria); // Call the sort function when Enter is pressed
    }
  };

  // Handle 'Enter' key press on new field input
  const handleNewFieldKeyPress = (e) => {
    if (e.key === "Enter") {
      addField();
    }
  };

  // Handle 'Enter' key press on field inputs
  const handleFieldKeyPress = (index, e) => {
    if (e.key === "Enter") {
      if (index < fields.length - 1) {
        document.getElementById(`field-${index + 1}`).focus();
      } else {
        addStudent();
      }
    }
  };

  // Add new field
  const addField = () => {
    if (newFieldName && !fields.some((field) => field.name === newFieldName)) {
      setFields([...fields, { name: newFieldName, value: "" }]);
      setNewFieldName("");
      setTimeout(
        () => document.getElementById(`field-${fields.length}`).focus(),
        0
      );
    }
  };

  // Delete field
  const deleteField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  // Add new student
  const addStudent = () => {
    if (fields.length > 0 && fields.every((field) => field.value.trim())) {
      const newStudent = fields.reduce((acc, field) => {
        acc[field.name] = field.value.trim();
        return acc;
      }, {});
      setStudents([...students, newStudent]);
      setFields(fields.map((field) => ({ ...field, value: "" })));
      setTimeout(() => document.getElementById(`field-0`).focus(), 0);
    }
  };

  // Delete all students
  const deleteAllStudents = () => {
    if (students.length === 0) {
      window.alert("No data yet!");
      return;
    }

    const confDelStuds = window.confirm(
      "Are you sure you want to delete all the data?"
    );
    if (confDelStuds) {
      setStudents([]);
    }
  };

  // Delete all fields
  const deleteAllFields = () => {
    if (fields.length === 0) {
      window.alert("No fields yet!");
      return;
    }

    const confDelFields = window.confirm(
      "Are you sure you want to delete all the fields?"
    );
    if (confDelFields) {
      setFields([]);
    }
  };

  // Delete a single student
  const deleteStudent = (index) => {
    const newStudents = students.filter((_, i) => i !== index);
    setStudents(newStudents);
  };

  // Sort students by criteria
  const sortStudents = (criteria) => {
    if (!criteria) return; // Do nothing if the criteria is empty
    if (!students.length) return;

    // Check if the specified criteria exists in the student objects
    if (!Object.keys(students[0]).includes(criteria)) {
      window.alert(`Key "${criteria}" does not exist`);
      return;
    }

    const sortedStudents = [...students].sort((a, b) => {
      const aValue = String(a[criteria]);
      const bValue = String(b[criteria]);

      const isANumber = /^[0-9]+$/.test(aValue);
      const isBNumber = /^[0-9]+$/.test(bValue);

      if (isANumber && isBNumber) {
        return Number(aValue) - Number(bValue);
      } else {
        return aValue.localeCompare(bValue);
      }
    });

    setStudents(sortedStudents);
  };

  // Reverse sort students
  const reverseSort = () => {
    setStudents((prevStudents) => [...prevStudents].reverse());
  };

  // Toggle instructions visibility
  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  // Handle drag start
  const handleDragStart = (e, index) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index);
    e.target.classList.add("dragging");
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (e, index) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
    const newFields = [...fields];
    const [draggedField] = newFields.splice(draggedIndex, 1);
    newFields.splice(index, 0, draggedField);
    setFields(newFields);
  };

  // Handle drag end
  const handleDragEnd = (e) => {
    e.target.classList.remove("dragging");
  };

  // Function to capitalize the first letter of each word
  const capitalize = (text) => {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Function to export data to Excel with full custom styling
  const exportToExcel = async (students) => {
    // Create a new workbook and add a worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Students");

    // Extract headers and capitalize them
    const headers = Object.keys(students[0]).map((key) => capitalize(key));

    // Add header row with yellow background and bold text
    worksheet.addRow(headers).eachCell((cell) => {
      cell.font = { bold: true };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFF00" },
      }; // Yellow background color
    });

    // Add student data rows with capitalized values
    students.forEach((student) => {
      const row = Object.values(student).map((value) =>
        capitalize(String(value))
      );
      worksheet.addRow(row);
    });

    // Save the workbook to a file and trigger download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "MyData.xlsx";
    link.click();
  };

  const closeModal = () => {
    setShowInstructions(!showInstructions);
  };

  const handlePrototypes = () => {
    setShowModal(!showModal); // Toggle the modal
  };

  const addFieldsFromPrototype = (prototypeKeys) => {
    const newFields = prototypeKeys
      .filter((key) => !fields.some((field) => field.name === key))
      .map((key) => ({ name: key, value: "" }));
    setFields([...fields, ...newFields]);
  };

  const handleSelectPrototype = (prototypeKeys) => {
    addFieldsFromPrototype(prototypeKeys);
    setShowModal(false); // Close the modal after selection
  };

  return (
    <div className="container">
      <div className="sidebar">
        <hr />
        <h2>Make The Fields You Need</h2>

        <div id="newfield">
          <input
            type="text"
            placeholder="New Field:"
            value={newFieldName}
            onChange={handleNewFieldNameChange}
            onKeyPress={handleNewFieldKeyPress}
          />
          <button id="addfield" onClick={addField}>
            Add Field
          </button>
        </div>
        <hr />
        <div className="input-group">
          <ul>
            {fields.map((field, index) => (
              <li
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
              >
                <div className="field-container">
                  <input
                    id={`field-${index}`}
                    type="text"
                    placeholder={field.name}
                    value={field.value}
                    onChange={(e) => handleFieldChange(index, e.target.value)}
                    onKeyPress={(e) => handleFieldKeyPress(index, e)}
                  />
                  <button
                    className="delete-field-button"
                    onClick={() => deleteField(index)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="button-group">
          <button id="addentry" onClick={addStudent}>
            Add Data
          </button>
          <button id="deteledata" onClick={deleteAllStudents}>
            Delete All Data
          </button>
          <button id="deletefields" onClick={deleteAllFields}>
            Delete All Fields
          </button>
        </div>
        <div className="input-p-sort">
          <p>Sort Your Data</p>
          <input
            type="text"
            placeholder="Sort Option"
            value={sortCriteria}
            onChange={handleSortCriteriaChange}
            onKeyPress={handleSortCriteriaKeyPress}
          />
          <button className="sort" onClick={() => sortStudents(sortCriteria)}>
            Sort
          </button>
        </div>
        <button className="prototypes-btn" onClick={handlePrototypes}>
          Prototypes
        </button>
      </div>
      <div>
        <div>
          {showModal && (
            <PrototypesModal
              prototypes={prototypes}
              onSelectPrototype={handleSelectPrototype}
              onClose={handlePrototypes}
            />
          )}
        </div>
      </div>
      <div className="main-content">
        <h1>View Your Data!</h1>
        <div className="student-list">
          {students.map((student, index) => (
            <Student
              key={student.id}
              student={student}
              index={index}
              deleteStudent={deleteStudent}
              updateStudent={updateStudent}
            />
          ))}
        </div>
        <button
          onClick={() => exportToExcel(students)}
          className="export-button"
        >
          Excel
        </button>
        <button className="reverseSortButton" onClick={reverseSort}>
          Reverse Sort
        </button>
        <button id="instructions-button" onClick={toggleInstructions}>
          Instructions
        </button>
        <div className="instructions">
          {showInstructions && (
            <div className="instructions-content">
              <p>
                <h3>User Instructions</h3>
                Enter a name for your field. Click "Add Field" to create the new
                field. Rearrangeable fields by drag and drop. Give values you
                want. Click "Add Data" to save the data. Sort the data, by
                typing the name of the field you'd like to sort by and click
                "Sort". Clicking "Reverse Sort" to reverse the sort order. Click
                "Print" to print the current list. Click "Excel" to save the
                data localy in xlsx file.
              </p>
              <span id="closeModal" onClick={closeModal}>
                Close
              </span>
            </div>
          )}
        </div>
        <ReactToPrint
          trigger={() => <button className="printExtraButton">Print</button>}
          content={() => printComponentRef.current}
        />
      </div>

      <div style={{ display: "none" }}>
        <PrintComponent ref={printComponentRef} students={students} />
      </div>
    </div>
  );
};

export default StudentList;
