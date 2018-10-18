import React,{Component} from 'react'
import {List} from "antd-mobile";
import * as actionCreators from "../store/actionCreators";
import connect from "react-redux/es/connect/connect";


class DataShow extends Component{

    static renderList(list){
        if(list){
         return (
            list.map((item)=>{
                return <List.Item extra={item.get('point')} key={item.get('id')}>{item.get('name')}</List.Item>
            })
         )
        }
    }

    render() {
        return (
            <div>
                <List
                    renderHeader={()=>'操行分排名'}
                    renderFooter={()=>'~~~我是有底线的~~~'}
                >
                    {DataShow.renderList(this.props.listData)}
                </List>
            </div>
        );
    }
}

const mapState = (state)=>{
  return {
      listData:state.getIn(['Home','stuList'])
  }
};


export default connect(mapState,null)(DataShow)