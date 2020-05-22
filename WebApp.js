import React,{Component} from 'react';
import './App.css';
import Header from './components/Header';
import WebContent from './components/WebContent';


class WebApp extends React.Component {

   render() {
      return (
      <div>
      	<Header/>
      	<WebContent/>
      </div>
      );
   }
}
export default WebApp;





