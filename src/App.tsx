import React, { useState } from 'react';
import "./app.css";

import AvatarPng from "./avatar.png";
import AvatarSvg from "./avatar.svg";

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
			<img src={AvatarPng} alt="Avatar PNG" /><br/>
			<img src={AvatarSvg} alt="Avatar SVG" />
	  		<button onClick={increment}>Click</button>
		</div>
	);
};

export default App;