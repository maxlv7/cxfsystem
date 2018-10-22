import React,{Component} from 'react'
import {Button,WhiteSpace,List,WingBlank,Modal} from "antd-mobile";
import {connect} from 'react-redux'
import {actionCreators} from "../login/store";


class Settings extends Component{
    constructor(props) {
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnOk = this.handleOnOk.bind(this);
        this.manageMember = this.manageMember.bind(this);
    }

    render() {
        return (
            <div>
                <List renderHeader={()=>"基本设置"}>
                    <List.Item
                    arrow='horizontal'
                    thumb={<i className='iconfont icon-chengyuan fs-22px'/>}
                    onClick={this.manageMember}
                    >成员管理</List.Item>
                </List>
                <WhiteSpace/>
                <WhiteSpace/>
                <WhiteSpace/>
                <WhiteSpace/>
                <WhiteSpace/>
                <WhiteSpace/>
                <WhiteSpace/>
                <WingBlank size='lg'>
                    <Button
                        type='primary'
                        onClick={this.handleOnClick}
                    >安全退出</Button>
                    <WhiteSpace/>
                    <Button type='primary'>关于</Button>
                </WingBlank>
            </div>
        );
    }

    handleOnClick(){
            Modal.alert('退出','真的要退出吗?',
                [{ text: '我再想想', style: 'default' },
                 { text: '是的', onPress: () => this.handleOnOk() }])
    }
    handleOnOk(){
        //先改变store的状态，然后才转到Login
        this.props.dispatch(actionCreators.changeLogin(false));
        localStorage.clear();
        this.props.history.push('/login');
    }
    manageMember(){
       this.props.history.push('/manageUsers');
    }
}

export default connect(null)(Settings)