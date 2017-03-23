/*
 * Created by yuxinhua on 20/03/2017
 */
alert('success');

import React from 'react'
import ReactDOM from 'react-dom'
import TodoHeader from './TodoHeader' //引入TodoHeader组件
import TodoMain from './TodoMain'     //引入TodoMain组件
import Login form './login'
import { Radio } from 'antd'
import AV from 'leancloud-storage'

const appId = 'QIbWTBcUnTOB9HzPJnjCM0AO-gzGzoHsz';
const appKey = 'zHvIO3RtJX2CvyI7l7RxGMIl';

AV.init({appId, appKey});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      todoId: null,
      isAllChecked: false,
      currentUser: bull,
      value: 1
    };
  }

  addTodo(item) {
    this.state.todos.push(item);
    this.setState({todos: this.state.todos});
  }
  
   //任务改变状态
  changeTodoState(index, isDone, isChangeAl = false) {
    if(isChangeAll) {   //全部操作
      this.setState({
        todos: this.state.todos.map((todo) => {
          todo.isDone = isDone;
          return todo;
        }),
        isAllChecked: isDone
      });
    } else {    //操作其中一个todo
      this.state.todos[index].isDone = isDone;
      this.allChecked();
    }
  },

  //判断是否所有任务的状态都完成，同步地步的全选框
  allChecked() {
    let isAllChecked = false;
    if(this.state.todos.every(todo => todo.isDone)) {
      isAllChecked = true;
    }

    this.setState({   //改变状态，组建重绘
      todos: this.state.todos,
      isAllChecked: isAllChecked
    });
  },

  //清除已经完成的事件
  clearDone() {
    let todos = this.state.todos.filter(todo => !todo.isDone);
    this.setState({
      todos: todos
    });
  },

  //删除某个todoItem
  deleteTodo(index) {
    this.state.todos.splice(index, 1);
    this.setState({todos: this.state.todos});
  },

  //修改登录或者注册
  onChange(e) {
    this.setState({
      value: e.target.value
    });
  }
 
  //登录或注册
  loginOrSignUp(values) {
    //判断是的登录还是注册
    if(this.state.value === 1) {
      let user = new AV.User();
      user.setUsername(value.userName);
      user.setPassword(value.password);
      user.signUp().then(loginedUser => {
        this.state.currentUser = this.getCurrentUser();
        this.setState({currentUser: this.state.currentUser});
      }, function (error) {
        alert('注册失败');
      })
    } else if(this.state.value === 2) {
      console.log('执行登录');
      AV.User.logIn(values.userName, values.password).then(loginedUser => {
        this.state.currentUser = this.getCurrentUser();
        this.setState({currentUser: this.state.currentUser});
        this.fetchTodos();
      }, function(error) {
        alert('登录失败');
      })
    }
  }

  //获取当前用户
  getCurrentUser() {
    let current = AV.User.current();
    if (current) {
      let {id, createAt, attributes: {username}} = current;
      return {id, username, createAt};
    } else {
      return null;
    }
  }

  //登出用户
  logout() {
    AV.User.logOut();
    this.state.currentUser = null;
    window.location.reload();
  }

  //将todo存储到服务器上
  saveTodos() {
    let dateString = JSON.stringify(this.state.todos);
    let AVTodos = AV.Object.extend('AllTodos');
    let avTodos = new AVTodos();
    
    //新建一个ACL实例
    let acl = new AV.ACL();
    acl.setReadAccess(AV.User.current(), true);
    acl.setWriteAccess(AV.User.current(), true);

  }

  render() {
    if(!this.state.currentUser) {
      const RadioGroup = Radio.Group;
      return (
        <div className="from-wrapper">  
          <h1 className="todo-title">React-Todos</h1>
          <RadioGroup className="radio-wrapper" onChange={this.onChange.bind(this)} value={this.state.value}>
            <Radio value={1}>注册</Radio>
            <Radio value={2}>登录</Radio>
          </RadioGroup>
          <Login loginOrSignUp={this.loginOrSignUp.bind(this)} value={this.state.value} />
        </div>
      )
    } else {
      let info = {
        isAllChecked: this.state.isAllChecked,
        todoCount: this.state.todos.length || 0,
        todoDoneCount: (this.state.todos && this.state.todos.filter((todo) => todo.isDone)).length || 0
      }
      return (
        <div className="todo-wrapper">
          <TodoHeader addTodo={this.addTodo.bind(this)} currentUser={this.state.currentUser} logout={this.logout.bind(this)} />
          <TodoMain todos={this.state.todos} changeTodoState={this.changeTodoState.bind(this)} deleteTodo={this.deleteTodo.bind(this)} saveOrUpdateTodos={this.saveOrUpdateTodos.bind(this)} />
          <TodoFooter {...info} clearDone={this.clearDone.bind(this)} changeTodoState={this.changeTodoState.bind(this)} />
        </div>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

