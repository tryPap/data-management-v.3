import React from 'react';

const PrintComponent = React.forwardRef(({ students }, ref) => (
  <div ref={ref} className="print-container">
    <h2>Data Managment</h2>
    {students.map((student, index) => (
      <div key={index} className="print-student">
        {Object.entries(student).map(([key, value]) => (
          <div key={key}>
            <span className="label">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
            <span className="value">{value.charAt(0).toUpperCase() + value.slice(1)}</span>
          </div>
        ))}
      </div>
    ))}
    <div id="printDate">
      <p>Printed on: {new Date().toLocaleDateString()}</p>
    </div>
  </div>
));

export default PrintComponent;
