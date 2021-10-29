import React from 'react';
import ReactDOM from 'react-dom';
import {MainJSApp} from './App'
// import { render } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


test('render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainJSApp/>, div);
  ReactDOM.unmountComponentAtNode(div);
})