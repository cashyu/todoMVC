
import TodoHeader extends react.Component {
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
      this.props.addTodo(newTodoItem);
    } 
  }

  render() {
    return (
      <div className="todo-header"> 
        <input onKeyUp={this.handleKeyUp.bind(this)} type="text" placeholder="请输入你
        的任务的名称，按回车键确认" />
      </div>
    );
  }
}

export default TodoHeader //将TodoHeader导出


