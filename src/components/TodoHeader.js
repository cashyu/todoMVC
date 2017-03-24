import React from 'react'
import {Input, Button} from 'antd'
class TodoHeader extends React.Component {
  //绑定键盘回车事件，添加新任务
  handleKeyUp(e) {
    if(e.keyCode == 13) {
      let value = e.target.value;
      if(!value) return false;
      let newTodoItem = {
        text: value,
        isDone: false
      };
      e.target.value = '';
      console.log(newTodoItem)
      this.props.addTodo(newTodoItem);
    } 
  }

  loginOut() {
    this.props.logout();
  }

  componentWillMount() {
    //日期格式化
    Date.prototype.Format = function(fmt) {
      let o = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),  //季度
        'S': this.getMillsecods() //毫秒
      };
      if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
      for(let k in o) {
        if(new RegExp('(" + k +")').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
        return fmt;
      }
    }
  }
  render() {
    return (
      <div className="todo-header"> 
        <h1 className="todo-title">React-Todos</h1>
        <p className="user-info">
          <span className="name">{"欢迎你," + this.props.currentUser.username} </span>
          <Button type="primary" size="small" onClick={this.loginOut.bind(this)}>登出</Button>
        </p>
          <Input onKeyUp={this.handleKeyUp.bind(this)} type="text" placeholder="请输入你的任务的名称，按回车键确认" />
      </div>
    );
  }
}

export default TodoHeader //将TodoHeader导出


