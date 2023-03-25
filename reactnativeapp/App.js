import * as React from "react"
import { Text, View } from "react-native"
import Splash from "./src/screens/Splash"
import Home from "./src/screens/Booking";
import Book from "./src/screens/Nav";
import Login from "./src/screens/Login";

export default function App() {
//const [isLoading, setIsLoading] = React.useState(true);
//return isLoading ? <Splash setIsLoading={setIsLoading}/> : <Home/> 
  return (
    <Book></Book>
    //<Login></Login>
  )
}