import * as React from "react"
import { Text, View } from "react-native"
import Splash from "./src/screens/Splash"
import Home from "./src/screens/Home";
import Book from "./src/screens/Book";

export default function App() {
//const [isLoading, setIsLoading] = React.useState(true);
//return isLoading ? <Splash setIsLoading={setIsLoading}/> : <Home/> 
  return (
    <Book></Book>
  )
}