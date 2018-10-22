import React,{Component} from "react";
import {Icon,List,NavBar} from "antd-mobile";
import connect from "react-redux/es/connect/connect";


class Users extends Component{
    constructor(props) {
        super(props);
        this.handleOnLeftClick = this.handleOnLeftClick.bind(this);
        this.handleReturnClick = this.handleReturnClick.bind(this);
    }

    render() {
        return (
            <div>
                <NavBar
                icon={<Icon type='left'/>}
                rightContent={[
                    <Icon key='0' type='search' style={{marginRight:14}}/>,
                    <Icon key='1' type='ellipsis' onClick={()=>alert(1)}/>
                ]}
                onLeftClick={this.handleOnLeftClick}
                >成员管理</NavBar>
                <List
                    renderHeader={()=>'成员管理'}
                    renderFooter={()=>'我是有底线的~~~'}
                >
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
}

const mapState = (state)=>{
  return {
      listData:state.getIn(['Home','stuList'])
  }
};

export default connect(mapState,null)(Users)
