import React from 'react';
import style from './Footer.module.sass'


const Footer = () => {
  return (
     <footer className={style.footer}>
       <div className={style.clock}>
         <Clock/>
       </div>
     </footer>
  )
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
       () => this.tick(), 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
       <div>
         <h4>{this.state.date.toLocaleTimeString()}</h4>
       </div>
    );
  }
}

export default Footer;