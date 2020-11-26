// import logo from './logo.svg';
// import logo from 'client/public/logo.svg'
import { useState } from "react";
import "./App.css";
import Forms from "../src/components/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Datepicker from "./components/Datepicker";
function App() {
  const [pickedDate, setPickedDate] = useState([]);

  const getDataFromForm = (data) => {
    //let currSl
    //console.log(data)
    //currSl=data
    setPickedDate(data);

    //console.log("From App Function  ",currSl);
    //setPickedDate({...data},"as");
  };
  return (
    <div className="App">
      
      <h1 className="mt-4 mb-4">
        <b>Notchup Trial Class</b>
      </h1>
   
      <Forms getDataFromForm={getDataFromForm} />
    </div>
  );
}

export default App;
