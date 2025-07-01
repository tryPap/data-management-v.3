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




// import React, { forwardRef } from "react";

// const PrintComponent = forwardRef(({ students }, ref) => {
//   return (
//     <div ref={ref}>
//       <h2>Printable Student List</h2>
//       {students.length === 0 ? (
//         <p>No students to print.</p>
//       ) : (
//         <ul>
//           {students.map((student, index) => (
//             <li key={index}>
//               {Object.entries(student).map(([key, value]) => (
//                 <div key={key}>
//                   <strong>{key}: </strong>
//                   {value}
//                 </div>
//               ))}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// });

// export default PrintComponent;
