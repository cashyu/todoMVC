import React from 'react';
import {Form, Icon, Input, Button} from 'antd';

const FormItem = Form.Item;

const Login = Form.create()(
  React.createClass({
    handleSubmit(e) {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if(!err) {
          this.props.loginOrSignUp(values);
        }
      })
    },

    render() {
      const {getFieldDecorator} = this.props.form;
      let text = this.props.value == 1 ? '注册' : '登录';

      return (
        <Form onSubmit={this.handleSubmit} className="login-form"> 
          <FormItem>
            {
              getFieldDecorator('password', {
                rules: [{
                  required: true, message: 'Please input your Password!'
                }]
              })(
                <Input addonBeffore={<Icon type="lock" />} type="password" placeholder="Password" />  
              ) 
            }
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              {text}
            </Button>
          </FormItem>
        </Form>
      );
    }
  })    
);

export default Login

