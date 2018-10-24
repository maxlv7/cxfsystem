import React, {Component} from 'react'
import {Icon, List, NavBar,InputItem,Button,WingBlank,WhiteSpace,Toast} from "antd-mobile";
import axios from 'axios'
import {setHeaders,baseURl} from "../../../utils/config";
import {connect} from 'react-redux'
import qs from "qs"
import {actionCreators} from "../store";


class AddUser extends Component{
    constructor(props) {
        super(props);
        this.handleOnLeftClick = this.handleOnLeftClick.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            name:null,
            stuNum:null,
            point:null,
            editable:true,
            loading:false
        }
    }
    handleOnLeftClick(){
        this.props.history.push('/manageUsers')
    }

    render() {
        return (
            <div>
                <NavBar
                    icon={<Icon type='left'/>}
                    rightContent={[
                        <Icon key='0' type='search' style={{marginRight:14}}/>,
                        <Icon key='1' type='ellipsis' onClick={null}/>
                    ]}
                    onLeftClick={this.handleOnLeftClick}
                    >添加成员</NavBar>
                <List>
                    <InputItem
                    type={"text"}
                    placeholder={'请输入姓名*'}
                    value={this.state.name}
                    onChange={(v)=>this.onChange(v,'name')}
                    editable={this.state.editable}
                    >姓名</InputItem>
                    <InputItem
                        type={"money"}
                        placeholder={'请输入学号(可选)'}
                        value={this.state.stuNum}
                        onChange={(v)=>this.onChange(v,'stuNum')}
                        moneyKeyboardAlign ={'left'}
                        editable={this.state.editable}
                    >学号</InputItem>
                    <InputItem
                        type={"money"}
                        placeholder={'若为空,则为默认分数'}
                        value={this.state.point}
                        onChange={(v)=>this.onChange(v,'point')}
                        moneyKeyboardAlign ={'left'}
                        editable={this.state.editable}
                    >初始分数</InputItem>
                </List>
                <WhiteSpace/>
                <WhiteSpace/>
                <WhiteSpace/>
                <WingBlank size={"lg"}>
                    <Button
                    type={"primary"}
                    onClick={this.handleOnClick}
                    loading={this.state.loading}
                    >{this.state.loading?'提交中':'提交'}</Button>
                </WingBlank>


            </div>
        );
    }
    onChange(v,key){
        if(key==='name'){
            this.setState({name:v})
        }
        if(key==='stuNum'){
            this.setState({stuNum:v})
        }
        if(key==='point'){
            this.setState({point:v})
        }
    }
    handleOnClick(){
        if(this.state.name!==null && this.state.name!==''){

            //表单不再可编辑,按钮为旋转状态
            this.setState({editable:false,loading:true});
            //在这里派发ajax成功后再次更新state
            const config = this.state;
            axios.get(baseURl+'/admin/addUser?'+qs.stringify(config),setHeaders())
                .then((res)=>{
                    if(res.data.status===200){
                        Toast.success(res.data.msg);
                        //恢复成初始状态
                        this.setState({name:null, stuNum:null, point:null,editable:true,loading:false});
                        //改变store的值,当返回时能直接看到结果
                        this.props.dispatch(actionCreators.getListData())
                    }
                    else {
                        this.setstate({loading:false});
                        Toast.fail(res.data.msg)
                    }
                })
                .catch(()=>{
                    Toast.fail("哦哦!网络出错了!")
                })
        }
        else{
            Toast.info("请输入姓名!",1)
        }
    }
}


export default connect()(AddUser)