import { Component, Emit, Vue } from 'vue-property-decorator';
import {
  Form, Button, Input, Icon,
} from 'ant-design-vue';
import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import config from '@/utils/config';

import './login.less';

@Component({
  components: {
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-button': Button,
    'a-input': Input,
    'a-icon': Icon,
  },
  props: {
    Form,
  },
})
class Login extends Vue {
  loginForm: {
    username: string;
    password: string;
  } = { username: '', password: '' };

  config = config;

  imgToken = '';

  loading = false;

  @Emit()
  login() {
    const { validateFields } = this.Form as WrappedFormUtils;
    validateFields((err: any, values: object) => {
      if (!err) {
        this.loading = true;
        // window.api.login({ ...values })
        this.$store.dispatch('loginByName', values)
          .then((res) => {
            this.$log.suc('response from loginByName', res);
            this.loading = false;
            const {
              result: { resultCode, resultMessage },
            } = res.data;
            if (resultCode !== 0) {
              this.$message.error(resultMessage || 'unkown error');
            } else {
              this.$message.success(resultMessage);
              this.$store
                .dispatch('getUserLocalInfo')
                .then(() => {
                  this.$router.push('/');
                })
                .catch((error) => {
                  this.$message.error(error);
                });
            }
          })
          .catch((errs: any) => {
            this.loading = false;
            this.$message.error(errs.message);
          });
        return true;
      }
      return false;
    });
  }

  @Emit()
  register() {
    const { validateFields } = this.Form as WrappedFormUtils;
    validateFields((err: any, values: object) => {
      if (!err) {
        this.loading = true;
        this.$store.dispatch('registerByName', values)
          .then((res) => {
            this.$log.suc('response from registerByName', res);
            this.loading = false;
            const {
              result: { resultCode, resultMessage },
            } = res.data;
            if (resultCode !== 0) {
              this.$message.error(resultMessage || 'unkown error');
            } else {
              this.$message.success(resultMessage);
            }
          })
          .catch((errs: any) => {
            this.loading = false;
            this.$message.error(errs.message);
          });
        return true;
      }
      return false;
    });
  }

  render() {
    const { getFieldDecorator } = this.Form as WrappedFormUtils;
    return (
      <div class="loginWrap">
        <h2 class="loginTxt">
          通用管理系统
          <br />
          ADMIN SYSTEM
        </h2>
        <div class="loginForm">
          <div class="logo">
            <img alt="logo" src={require('../../assets/logo.svg')} />
            <span>{config.name}</span>
          </div>
          <a-form ref="loginForm">
            <a-form-item id="username">
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名' }],
              })(
                <a-input
                  id="username"
                  prefix-icon="iconfont-user"
                  placeholder="请输入用户名"
                >
                  <a-icon slot="prefix" type="user" />
                </a-input>,
              )}
            </a-form-item>
            <a-form-item id="password">
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }],
              })(
                <a-input
                  id="password"
                  prefix-icon="iconfont-lock"
                  type="password"
                  on-pressEnter={this.login}
                  placeholder="请输入密码"
                >
                  <a-icon slot="prefix" type="lock" />
                </a-input>,
              )}
            </a-form-item>
            <a-form-item id="loginButton">
              <a-button loading={this.loading} type="primary" on-click={this.login}>
                登录 / Login
              </a-button>
              <a-button loading={this.loading} type="default" on-click={this.register}>
                注册 / Register
              </a-button>
            </a-form-item>
          </a-form>
          <div class="tips">
            <span>已有用户请登录</span>
            <span class="right">新用户请注册</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create({})(Login);
