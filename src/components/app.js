/*
 * Created by yuxinhua on 20/03/2017
 */
alert('success');

import React from 'react'
import ReactDOM from 'react-dom'
import TodoHeader from './TodoHeader' //引入TodoHeader组件
import TodoMain from './TodoMain'     //引入TodoMain组件

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: []
    };
  }

  addTodo(item) {
    this.state.todos.push(item);
    this.setState({todos: this.state.todos});
  }

  render() {
    return (
      <div className="todo-wrapper">
        <TodoHeader addTodo={this.addTodo.bind(this)} />
        <TodoMain todos={this.state.todos} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));


/*
class App extends React.Component {
  constructor() {
    super() //在装载组建(mounting)之前调用React组建的构造函数，
            //当实现React.Component子类的构造函数时，应该在任何其他语句之前调用super()
    this.state = {
      todos: []
    }   
  }
  handleKeyUp(e) {
    if(e.keyCode == 13) {
      let value = e.target.value;
      if(!value) return false;
      let newTodoItem = {
        text: value,
        isDone: false
      };
      e.target.value = '';
      this.state.todos.push(newTodoItem);
      this.setState({todos: this.state.todos}); //修改状态值，每次修改后，自动掉哟给你this,render
    }
  }
  render() {
    return (
      <div class="todo-input">
        <input type="text" placeholder="请输入代办事项"　onKeyUp={this.handleKeyUp.bind(this)} />
        <ul>
          {this.state.todos.map((todo, index) => {
            return (
              <li key={index}>{todo.text}</li>
            );                                        
          })}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
*/
