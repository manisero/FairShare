import React from 'react'
import TextBox from './TextBox.jsx'
import Info from './Info.jsx'

class Root extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<TextBox  {...this.props} />
				<Info {...this.props} />
			</div>
		);
	}
}

export default Root;
