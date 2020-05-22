import React from "react";

import two from './illustrations/two.svg';
import three from './illustrations/three.svg';
import four from './illustrations/four.svg';
import five from './illustrations/five.svg';
import six from './illustrations/six.svg';

let dice_numbers = {
	2: two,
	3: three,
	4: four,
	5: five,
	6: six
};

class Die extends React.Component{

	render() {
		return (
			<img
				src={dice_numbers[this.props.number]}
			/>
		)
	}
}

export default Die;