import React from 'react';
import style from './Footer.module.sass'


const Footer = () => {
    return (
       <footer className={style.footer}>
           <div className={style.clock}>
               <Clock/>
               {/*<Counter/>*/}
               {/*<Toggle/>*/}
               {/*<Page/>*/}
               {/*<FlavorForm/>*/}
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

// function Counter() {
//     const [count, setCount] = useState(0);
//
//     return (
//         <div>
//             <p>You clicked {count} times</p>
//             <button onClick={() => setCount(count + 1)}>
//                 Click me
//             </button>
//         </div>
//     );
// }

// function Counter() {
//     const [count, setCount] = useState(0);
//
//     function handleAlertClick() {
//         setTimeout(() => {
//             alert('You clicked on: ' + count);
//         }, 3000);
//     }
//
//     return (
//         <div>
//             <p>You clicked {count} times</p>
//             <button onClick={() => setCount(count + 1)}>
//                 Click me
//             </button>
//             <button onClick={handleAlertClick}>
//                 Show alert
//             </button>
//         </div>
//     );
// }

// function Counter() {
//     const [count, setCount] = useState(0);
//
//     useEffect(() => {
//         document.title = `You clicked ${count} times`;
//     });
//
//     return (
//         <div>
//             <p>You clicked {count} times</p>
//             <button onClick={() => setCount(count + 1)}>
//                 Click me
//             </button>
//         </div>
//     );
// }

// function Counter() {
//     const [count, setCount] = useState(0);
//
//     useEffect(() => {
//         setTimeout(() => {
//             console.log(`You clicked ${count} times`);
//         }, 2000);
//     });
//
//     return (
//         <div>
//             <p>You clicked {count} times</p>
//             <button onClick={() => setCount(count + 1)}>
//                 Click me
//             </button>
//         </div>
//     );
// }

// function WarningBanner(props) {
//     if (!props.warn) {
//         return null;
//     }
//
//     return (
//         <div className="warning">
//             Предупреждение!
//         </div>
//     );
// }
//
// class Page extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {showWarning: false};
//         this.handleToggleClick = this.handleToggleClick.bind(this);
//     }
//
//     handleToggleClick() {
//         this.setState(state => ({
//             showWarning: !state.showWarning
//         }));
//     }
//
//     render() {
//         return (
//             <div>
//                 <WarningBanner warn={this.state.showWarning} />
//                 <button onClick={this.handleToggleClick}>
//                     {this.state.showWarning ? 'Спрятать' : 'Показать'}
//                 </button>
//             </div>
//         );
//     }
// }


//
// class FlavorForm extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {value: 'coconut'};
//
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//
//     handleChange(event) {
//         this.setState({value: event.target.value});
//     }
//
//     handleSubmit(event) {
//         alert('Ваш любимый вкус: ' + this.state.value);
//         event.preventDefault();
//     }
//
//     render() {
//         return (
//             <form onSubmit={this.handleSubmit}>
//                 <label>
//                     Выберите ваш любимый вкус:
//                     <select value={this.state.value} onChange={this.handleChange}>
//                         <option value="grapefruit">Грейпфрут</option>
//                         <option value="lime">Лайм</option>
//                         <option value="coconut">Кокос</option>
//                         <option value="mango">Манго</option>
//                     </select>
//                 </label>
//                 <input type="submit" value="Отправить" />
//             </form>
//         );
//     }
// }

// function sayHi(person) {
//     const name = person.name;
//     setTimeout(() => {
//         alert('Hello, ' + name);
//     }, 3000);
// }
//
// let someone = {name: 'Dan'};
// sayHi(someone);
//
// someone = {name: 'Yuzhi'};
// sayHi(someone);
//
// someone = {name: 'Dominic'};
// sayHi(someone);

// class Toggle extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {isToggleOn: true};
//
//     // Эта привязка обязательна для работы `this` в колбэке.
//     this.handleClick = this.handleClick.bind(this);
//   }
//
//   handleClick() {
//     this.setState(state => ({
//       isToggleOn: !state.isToggleOn
//     }));
//   }
//
//   render() {
//     return (
//         <button onClick={this.handleClick}>
//           {this.state.isToggleOn ? 'Включено' : 'Выключено'}
//         </button>
//     );
//   }
// }

export default Footer;