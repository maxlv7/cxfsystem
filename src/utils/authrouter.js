import React from 'react'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {actionCreators} from '../pages/login/store'


class AuthRoute extends React.Component{
	componentDidMount() {
	    console.log("我被执行了~~");
	    if(localStorage.getItem('access_token'))
        {
            this.props.dispatch(actionCreators.forceLogin());
            this.props.history.push('/')
        }
        else{
            this.props.history.push('/login')
        }
	}
	render(){
		return null
	}

}


export default withRouter(connect(null)(AuthRoute))