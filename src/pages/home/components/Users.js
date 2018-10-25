import React,{Component} from "react";
import {Icon,List,NavBar,Button,Modal,Toast} from "antd-mobile";
import connect from "react-redux/es/connect/connect";
import {findKey} from "../../../utils/tools";
import axios from 'axios'
import {baseURl,setHeaders} from "../../../utils/config";
import {actionCreators} from "../store";


class Users extends Component{
    constructor(props) {
        super(props);
        this.handleOnLeftClick = this.handleOnLeftClick.bind(this);
        this.handleReturnClick = this.handleReturnClick.bind(this);
        this.showDelUser = this.showDelUser.bind(this);
        this.handleAddUser = this.handleAddUser.bind(this);
        this.handleUpdateUser = this.handleUpdateUser.bind(this);
        this.handleOnInput = this.handleOnInput.bind(this);
    }

    render() {
        return (
            <div>
                <NavBar
                icon={<Icon key='1' type='left'/>}
                onLeftClick={this.handleOnLeftClick}
                >成员管理</NavBar>
                <List
                    renderHeader={()=>'成员管理'}
                    renderFooter={()=>'我是有底线的~~~'}
                >
                    <List.Item>
                        <div className='center'>
                            <Button className='btn' inline={true} type={"primary"} onClick={this.handleAddUser} >添加成员</Button>
                            <Button className='btn btn-margin' inline={true} type={"primary"} onClick={this.showDelUser}>删除成员</Button>
                            <Button className='btn' inline={true} type={"primary"} onClick={this.handleUpdateUser}>修改成员</Button>
                        </div>
                    </List.Item>

                    {this.renderList(this.props.listData)}
                </List>

            </div>
        );
    }

     renderList(list){
        if(list){
         return (
            list.map((item)=>{
                return <List.Item
                    extra={<Icon type='right'/>}
                    key={item.get('id')}
                    onClick={()=>this.handleReturnClick(item.get('id'))}
                    >
                    {item.get('name')}</List.Item>
            })
         )
        }
    }

    handleOnLeftClick(){
        this.props.history.push('/settings')
    }
    handleReturnClick(id){
        //跳转到用户信息管理界面
        this.props.history.push('/manage/user/'+id)
    }

    //显示删除用户弹框
    showDelUser(){
        Modal.prompt('删除成员', '请输入要删除成员姓名',
      (username) => this.handleDelUser(username),
      'default',
      null,
      ['请输入姓名'],
    )
    }

    //删除成员
    handleDelUser(username){
        if(username){
        Modal.alert('删除', '删除后该成员对应的事件也会被删除且不可逆,确定要删除吗?', [
    { text: '我再想想', onPress: () => {}, style: 'default' },
    { text: '是的', onPress: ()=>this.handleDelUserOnOk(username) },
  ])}
        else{
            Toast.info('请输入姓名!');
        }
    }

    handleDelUserOnOk(name){
        //在这里派发ajax成功后再次更新state
        let obj = this.props.listData.toJS();
        let res = obj.filter((item)=>{
           return findKey(item, name)
        });
        if(Array.isArray(res) && res[0]!==undefined){
            //跳转到对应的界面
            let uid = res[0].id;
            axios.get(baseURl+'/admin/delUser?uid='+uid,setHeaders())
                .then((res)=>{
                   const r = res.data;
                    if(r.status===200){
                        Toast.success(r.msg);
                        //重新获取数据
                        this.props.dispatch(actionCreators.getListData())
                    }
                    else{
                        Toast.fail(r.msg);
                    }
                })
                .catch(()=>{
                    Toast.offline('哦哦!网络出错了!');
                })
        }else{
            Toast.info("请输入正确的名字!");
        }

    }

    //增加成员
    handleAddUser(){
        this.props.history.push('/manage/addUser')
    }

    //更新成员
    handleUpdateUser(){
        //弹出输入框,询问要修改的成员的姓名
        Modal.prompt('输入', '请输入姓名',
            (name)=>this.handleOnInput(name), 'default');
    }

    //得到修改提示框的内容
    handleOnInput(name){
        if(name==='')
        {
            Toast.info("请输入姓名!")
        }
        else{
            let obj = this.props.listData.toJS();
            let res = obj.filter((item)=>{
               return findKey(item, name)
            });
            //好像上面这种方法能节省性能
            // obj.map((item)=> {
            //      if(findKey(item, name)){
            //         res = item;
            //      }
            // });
            if(Array.isArray(res) && res[0]!==undefined){
                //跳转到对应的界面
                this.props.history.push('/manage/updateUser/'+res[0].id)
            }else{
                Toast.info("请输入正确的名字!")
            }
        }
    }

}

const mapState = (state)=>{
  return {
      listData:state.getIn(['Home','stuList'])
  }
};

export default connect(mapState,null)(Users)
