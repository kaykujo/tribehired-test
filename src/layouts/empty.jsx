import React from "react";

class EmptyLayout extends React.Component {
	render() {
		return (
			<>
				<div className="layout-empty vh-100 overflow-auto">
					<this.props.component />
				</div>
			</>
		);
	}
}

export default EmptyLayout;