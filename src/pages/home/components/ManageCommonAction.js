import React,{Component} from 'react'
import {List, Checkbox, NavBar, Icon, Button, Toast, DatePicker, TextareaItem, Stepper, Modal} from "antd-mobile";
import {connect} from 'react-redux'
import {isInArray} from "../../../utils/tools";
import {baseURl,setHeaders} from "../../../utils/config";
import axios from 'axios'
import {actionCreators} from '../store'

class ManageCommonAction extends Component{
    constructor(props) {
        super(props);
        this.handleOnLeftClick = this.handleOnLeftClick.bind(this);
        this.handleAddCommonAction = this.handleAddCommonAction.bind(this);
        this.showModel = this.showModel.bind(this);
        this.state = {
            ids:[],
            visible: false,
            value: '',
            point:0,
            date: ''
        }
    }

    render() {
        return (
            <div>
                <NavBar
                    icon={<Icon type='left'/>}
                    onLeftClick={this.handleOnLeftClick}
                    >集体活动管理</NavBar>
                <List
                   renderHeader={()=>'集体活动管理'}
                   renderFooter={()=>'我是有底线的~~~'}
                >
                    <List.Item>
                         <Button
                        type={'primary'}
                        className='jt-btn'
                        onClick={this.showModel}
                        >选中项添加事件</Button>
                    </List.Item>
                    {
                        this.props.stuList.map((item)=>{
                            return <Checkbox.CheckboxItem
                                key={item.get('id')}
                                onChange={()=>this.handleOnChange(item.get('id'))}
                            >{item.get('name')}---{item.get('id')}
                            </Checkbox.CheckboxItem>
                        })
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
                        { text: '好的', onPress: () => this.handleAddCommonAction() }]
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
    handleOnLeftClick(){
        this.props.history.push('/settings')
    }

    //是否选中
    handleOnChange(id){
        //深拷贝
        let t = JSON.parse(JSON.stringify(this.state.ids));
        //判断id是否在ids中,如果在就删除,不在就增加
        if(isInArray(t,id)){
                let arr = t.indexOf(id);
                t.splice(arr,1);
        }else{
            t.push(id)
        }
        this.setState({ids:t})
    }

    //添加集体事件
    handleAddCommonAction(){
        //保证所有都有
        if(this.state.value===''||this.state.date===null){
            Toast.info("请输入必要的信息!")
        }
        else{
            //逻辑处理
            let config = JSON.parse(JSON.stringify(this.state));
            delete config.visible;
            config.date = Date.parse(config.date);
            axios.post(baseURl+'/admin/addCommonAction',config,setHeaders())
                .then((res)=>{
                    if(res.data.status===200){
                        Toast.success(res.data.msg);
                        this.setState({visible: false, value: '', point:0, date: ''});
                        //不刷新重新获取数据
                        this.props.dispatch(actionCreators.getListData());
                    }
                })
                .catch(()=>{
                    Toast.offline("哦哦!网络出错咯!")
                })
        }

    }
    //显示模态框
    showModel(){
        if(this.state.ids.length===0){
            Toast.info("请选择至少一项!")
        }
        else{
            this.setState({visible:true})
        }
    }
}

const mapState = (state)=>{
    return{
        stuList: state.getIn(["Home","stuList"])
    }
};

export default connect(mapState)(ManageCommonAction)