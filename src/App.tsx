import React, { useState } from 'react';
import "./app.css";

const App = () => {

	const [state, setState] = useState<number>(1);

	function increment() {
		setState(state+1);
		onButtonClick();
	}

	const onButtonClick = () => {
		throw new Error("ewqweqw");
	}

	return (
		<div>
	  		<h1>Value ={state}</h1>
	  		<button onClick={increment}>Click</button>
		</div>
	);
};

export default App;