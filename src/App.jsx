import React, { useState } from 'react';
import "./app.css";

const App = () => {

	const [state, setState] = useState(0);

	function increment() {
		onButtonClick();
		setState(state+1);
	}

	const onButtonClick = () => {
		throw new Error("ewqweqw");
	}

	return (
		<div>
	  		<h1>value ={state}</h1>
	  		<button onClick={increment}>Click</button>
		</div>
	);
};

export default App;