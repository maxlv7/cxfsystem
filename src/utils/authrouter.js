import React from 'react'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {actionCreators} from '../pages/login/store'


class AuthRoute extends React.Component{
	componentDidMount() {

	    //登录权限验证
	    if(localStorage.getItem('access_token'))
        {
            this.props.dispatch(actionCreators.forceLogin());
            this.props.history.push('/index')
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