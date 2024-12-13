import React from 'react';
import StudentList from './components/StudentList.jsx';
import Navbar from './components/navbar/Navbar.jsx';

const App = () => {
  return (
    <div>
      <Navbar />
      <StudentList />
    </div>
  );
};

export default App;
