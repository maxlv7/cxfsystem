import React, {Component} from 'react'
import {Button, Card, Icon, List, NavBar,Toast,Modal,DatePicker,TextareaItem,Stepper} from "antd-mobile";
import {connect} from 'react-redux'
import {actionCreators} from "../store";
import {getTime} from "../../../utils/tools";
import {baseURl,setHeaders} from "../../../utils/config";
import axios from 'axios'
import qs from 'qs'

class UserInfo extends Component{
    constructor(props) {
        super(props);
        this.getUid = this.getUid.bind(this);
        this.handleOnLeftClick = this.handleOnLeftClick.bind(this);
        this.renderActionList = this.renderActionList.bind(this);
        this.showAddAction = this.showAddAction.bind(this);
        this.handleAddAction = this.handleAddAction.bind(this);
        this.state = {
            visible: false,
            value:'',
            date:'',
            point:0
        }
    }

    getUid(){
        return this.props.match.params.id
    }

    handleOnLeftClick(){
        this.props.history.push('/manageUsers')
    }

    componentDidMount(){
    //加载用户信息，写入store
        this.props.dispatch(actionCreators.getUserInfo(this.getUid()));
    //加载action信息，写入store
        this.props.dispatch(actionCreators.getUserAction(this.getUid()));
    }

    renderActionList(list){
      return list.map((item)=>{
                return <List.Item
                    key={item.get('mid')}
                    wrap={true}
                >
                    {getTime(item.get('time'))}:({item.get('action_score')}分){item.get('action')}
                    </List.Item>
            })
    }

    showAddAction(){
        this.setState({
            visible:true,
        })
    }

    //添加活动逻辑处理
    handleAddAction(){
        const {value,date} = this.state;
        if(value!=='' && date!==''){
            let config = this.state;
            config.date = Date.parse(config.date);
            config.uid = this.getUid();
            delete config.visible;
            //ajax操作
            axios.get(baseURl+'/admin/addAction?'+qs.stringify(config),setHeaders())
                .then((res)=>{
                    const r =res.data;
                    if(r.status===200){
                        Toast.success(r.msg);
                        //关闭model
                        this.setState({
                            visible: false,
                            value:'',
                            date:'',
                            point:0
                        });
                        //更新信息
                        //加载用户信息，写入store
                            this.props.dispatch(actionCreators.getUserInfo(this.getUid()));
                        //加载action信息，写入store
                            this.props.dispatch(actionCreators.getUserAction(this.getUid()));
                        //更新所有用户信息
                            this.props.dispatch(actionCreators.getListData())
                    }
                })
                .catch(()=>{
                    Toast.offline("哦哦!网络出错了!")
                })

        }else{
            Toast.info("请输入正确的值!")
        }
    }
    render() {
        const {action_list} = this.props;
        return (
            <div>
                <NavBar
                    icon={<Icon type='left'/>}
                    onLeftClick={this.handleOnLeftClick}
                    >成员管理</NavBar>
                <Card>
                    <Card.Header
                        title={this.props.username}
                        thumb={<i className='icon-chengyuan iconfont fs-22px'> </i>}
                        extra={<span>当前分数：{this.props.now_score}</span>}
                      />
                    <Card.Body>
                    <div>这位同学的参加的活动如下:</div>
                    </Card.Body>
                </Card>
                <List>
                    <List.Item>
                        <div className='center'>
                            <Button className='btn mr-10px ml-10px' type={"primary"} onClick={this.showAddAction} >增加活动信息</Button>
                            {/*<Button className='btn ml-10px' inline={true} type={"primary"} onClick={this.showTips}>删除活动信息</Button>*/}
                            </div>
                    </List.Item>
                    {
                        action_list.size===0?
                            <List.Item key={'uni'}>~~~什么也没有~~~</List.Item>
                            :this.renderActionList(action_list)
                     }
                </List>
                <Modal
                    visible={this.state.visible}
                    transparent={true}
                    maskClosable={false}
                    title={'添加活动'}
                    animationType={'slide'}
                    footer={
                        [{ text: '取消', onPress: () => { this.setState({visible:false}) } },
                        { text: '好的', onPress: () => this.handleAddAction() }]
                        }
                >
                    <List>
                        <DatePicker
                        mode={"date"}
                        value={this.state.date}
                        onChange={(date)=>this.setState({date:date})}
                        >
                           <List.Item arrow="horizontal">选择时间</List.Item>
                        </DatePicker>
                       <TextareaItem
                        placeholder={'请输入事件'}
                        clear={true}
                        autoHeight={true}
                        value={this.state.value}
                        onChange={(v)=>this.setState({value:v})}
                        />
                        <List.Item extra={
                          <Stepper
                            style={{ width: '100%', minWidth: '100px' }}
                            showNumber
                            max={100}
                            min={-100}
                            defaultValue={this.state.point}
                            onChange={(point)=>{this.setState({point:point})}}
                          />}
                        >
                        选择分数
                    </List.Item>
                    </List>
                </Modal>
            </div>
        );
    }
}

const mapState = (state)=>{
    return{
        username:state.getIn(['Home','now_user']),
        now_score:state.getIn(['Home','now_score']),
        action_list:state.getIn(['Home','action_list'])
    }
};

export default connect(mapState)(UserInfo)