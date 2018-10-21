import React, { Component,Fragment } from 'react';
import {List,InputItem,Button,WingBlank,WhiteSpace,Toast} from "antd-mobile";
import icon from '../../static/icon.png'
import './index.css'
import {Redirect} from "react-router-dom";

import {connect} from 'react-redux'
import {actionCreators} from './store'

class Login extends Component {
    constructor(props) {
        super(props);
        console.log(this);
        this.state = {
            username:'',
            password:'',
        };

    }
   render() {
        return (
         <Fragment>
             {this.props.login?<Redirect to='/index'/>:null}
          <div className='login-icon'>
            <img src={icon} alt=""/>
          </div>
          <List>
              <InputItem
                  placeholder='用户名'
                  clear={true}
                  onChange={(e)=>this.handleOnChange(e,'username')}
                  editable={!this.props.loading}
              >用户名:
              </InputItem>
              <InputItem
                  placeholder='密码'
                  clear={true}
                  onChange={(e)=>this.handleOnChange(e,'password')}
                  type='password'
                  editable={!this.props.loading}
              >密码:
              </InputItem>
          </List>
          <WhiteSpace size='lg'/>
          <WingBlank size='lg'>
                <Button
                    type={'primary'}
                    onClick={()=>this.props.handleOnclick(this.state.username,this.state.password)}
                    loading={this.props.loading}
                  >
                    {this.props.loading?'登录中':'登录'}
                </Button>
          </WingBlank>
      </Fragment>
    );

  }
   handleOnChange(e,type){
    if(type==='username'){
        this.setState({username:e})
    }
    if(type==='password'){
        this.setState({password:e})
    }
  }


}

const mapState= (state)=>{
  return {
      login:state.getIn(['Login','login']),
      loading:state.getIn(['Login','loading']),
      redirectTo:state.getIn(['Login','redirectTo'])
  }
};

const mapDispatch = (dispatch)=>{
    return {
        handleOnclick(user,password){
            if(user!==''&& password!==''){
                dispatch(actionCreators.loading());
                dispatch(actionCreators.login(user,password));
            }
            else{
                Toast.info('请输入用户名和密码!',1)
            }

        }
    }
};

export default connect(mapState,mapDispatch)(Login);
