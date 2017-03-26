
import React from 'react';
const About = (props, context) => {
  const sayHello = (str, event) => {

    console.log(`${str}from${event.target.getAttribute('data-reactid')}`);
  };
  return (
        <div>
            <button onClick={(evt) => sayHello('ss', evt)}>
                say
                </button>
            about {props.name}
        </div>
  );
};

export default About;
