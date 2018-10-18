import React,{Component,Fragment} from 'react';
import {TabBar} from "antd-mobile";
import DataShow from './components/DataShow'
import {connect} from 'react-redux'
import {actionCreators} from './store'
import './home.css'

class Home extends Component{
    constructor(props) {
        super(props);
        console.log(this);
        this.handleOnPress = this.handleOnPress.bind(this);
        this.state={
            selectedTab:'index'
        }
    }

    handleOnPress(pageName){
        this.setState(()=>({selectedTab:pageName}))
    }

    renderIcon(type){
        return (<div className={'iconfont home-fs21px'+' icon-'+type}/>)
    }
    render() {
        return (
            <Fragment>
                 <div style={ { position: 'fixed', height: '100%', width: '100%', top: 0 }}>
                <TabBar
                  unselectedTintColor="#949494"
                  tintColor="#33A3F4"
                  barTintColor="white"
                  tabBarPosition='bottom'
                >
                    <TabBar.Item
                    title='首页'
                    icon={this.renderIcon('index')}
                    selected={this.state.selectedTab==='index'}
                    selectedIcon={this.renderIcon('index')}
                    onPress={()=>this.handleOnPress('index')}
                    >
                       <DataShow/>
                    </TabBar.Item>
                <TabBar.Item
                    title='管理'
                    icon={this.renderIcon('shezhi')}
                    selectedIcon={this.renderIcon('shezhi')}
                    onPress={()=>this.handleOnPress('settings')}
                    selected={this.state.selectedTab==='settings'}
                    >
                    我是第二个页面
                </TabBar.Item>

               </TabBar>
                 </div>
            </Fragment>
        );
    }

    componentDidMount(){
        this.props.getListData()
    }
}

const mapState = (state)=>{
  return {
      listData:state.getIn(['Home','listData'])
  }
};

const mapDispatch = (dispatch)=>{
    return{
        getListData(){
            dispatch(actionCreators.getListData())
        }
    }
};

export default connect(mapState,mapDispatch)(Home)