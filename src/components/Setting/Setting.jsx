import React from "react";
import style from './Setting.module.sass';
import Clip from "../../common/video/Clip";

import styled, {css} from 'styled-components'
import {lighten} from 'polished'

export const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #06A4FF;
  color: #06A4FF;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  cursor: pointer;
  transition: all .2s;

  &:active {
    transform: scale(.99);
    background: ${lighten(0.7, '#333')};
  }

  ${props => props.primary && css`
    background: #06A4FF;
    color: white;
  `}
`;


const Setting = () => {
  return (
     <div className={style.wrapperContent}>
       <Clip/>
       <h3>Sorry! Page in development.</h3>
       <Button>Styled Components</Button>
       <button>✖</button>
     </div>
  )
}

export default Setting;