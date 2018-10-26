import React,{Component} from 'react'
import {Button,WhiteSpace,List,WingBlank,Modal,Toast,InputItem} from "antd-mobile";
import {connect} from 'react-redux'
import {actionCreators} from "./store";
import axios from 'axios'
import {baseURl,setHeaders} from "../../utils/config";
import qs from 'qs'

class Settings extends Component{
    constructor(props) {
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnOk = this.handleOnOk.bind(this);
        this.manageMember = this.manageMember.bind(this);
        this.handleInputValue = this.handleInputValue.bind(this);
        this.showSetDefaultModal = this.showSetDefaultModal.bind(this);
        this.state = {
            visible:false,
            value:null
        }
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
                    <List.Item
                    arrow='horizontal'
                    thumb={<i className='iconfont icon-fenshu fs-22px'/>}
                    onClick={this.showSetDefaultModal}
                    >设置默认分数</List.Item>
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
                    <Button
                        type='primary'
                        onClick={this.showAbout}
                    >关于</Button>
                </WingBlank>

                <Modal
                    visible={this.state.visible}
                    transparent={true}
                    maskClosable={false}
                    title={'设置默认分数'}
                    animationType={'slide'}
                    footer={
                        [{ text: '取消', onPress: () => { this.setState({visible:false}) } },
                        { text: '好的', onPress: () => this.handleInputValue() }]
                        }
                >
                    <List>
                    <List.Item
                        extra={this.props.defaultValue}
                    >当前默认分数为:</List.Item>
                    <InputItem
                    placeholder={'请输入'}
                    type={"money"}
                    moneyKeyboardAlign ={'left'}
                    value={this.state.value}
                    onChange={(v)=>{this.setState({value:v})}}
                    />
                    </List>
                </Modal>
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

    showAbout(){
      Modal.alert('关于',"本系统由Li开发,使用中有任何问题或者有任何建议请联系qq:75497438!");
    }

    componentDidMount(){
       //得到原来的分数
        this.props.dispatch(actionCreators.getDefaultPoint())
    }
    //显示对话框
    showSetDefaultModal(){
        this.setState({visible:true})
    }

    //处理数据
    handleInputValue(){
        let v = this.state.value;
        if(!parseInt(v)){
            Toast.info("请输入纯数字!")
        }
        else {
            //ajax请求,改变设置
            const config = {
                key:'defaultPoint',
                value:v
            };
            axios.get(baseURl+'/admin/setConfig?'+qs.stringify(config),setHeaders())
                .then((res)=>{
                    if(res.data.status===200)
                    {
                        Toast.success(res.data.msg)
                        this.props.dispatch(actionCreators.getDefaultPoint())
                        this.setState({visible:false})
                    }
                    else{
                        Toast.fail(res.data.msg)
                    }
                })
                .catch(()=>{
                    Toast.info("哦啤!网络出错了!")
                })
        }
    }

}

const mapState = (state)=>{
    return {
        defaultValue:state.getIn(['Home','default_value'])
    }
};
export default connect(mapState)(Settings)