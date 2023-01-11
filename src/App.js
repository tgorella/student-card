import React from 'react';
import StudentCard from './components/StudentCard';
import { Route, Switch } from "react-router-dom";
import EditStudentCard from './components/EditStudentCard';

function App() {
  return (
    <Switch>
			<Route path="/edit" component={EditStudentCard} />
			<Route path="/" component={StudentCard} />
    </Switch>
  );
}

export default App;
