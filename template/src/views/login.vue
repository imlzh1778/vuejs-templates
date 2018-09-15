<template>
    <div class="login-form">
        <div class="center-box">
            <h1 class="logo-text">网易游戏</h1>
            <div class="rule-form">
                <div v-loading="loading">
                    <h6 class="title">
                        <span class="sub-title" :class="[emailMode ? '' : 'active']" @click="toggleView">工号登录</span>
                        <span class="divider"></span>
                        <span class="sub-title" :class="[emailMode ? 'active' : '']" @click="toggleView">邮箱登录</span>
                    </h6>
                    <el-form ref="ruleForm" :rules="rules" :model="ruleForm" autocomplete="off">
                        <el-form-item v-if="!emailMode" prop="username" :key="1">
                            <el-input v-model="ruleForm.username" placeholder="请输入工号">
                            </el-input>
                        </el-form-item>
                        <el-form-item v-else prop="email" :key="2">
                            <el-input v-model="ruleForm.email" placeholder="请输入邮箱前缀">
                                <template slot="append">@corp.netease.com</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password" :key="emailMode ? 3 : 4">
                            <el-input type="password" v-model="ruleForm.password"
                                      @keyup.native.enter="submitForm('ruleForm')"
                                      placeholder="请输入密码" auto-complete="new-password"></el-input>
                        </el-form-item>
                        <div class="text-left mb-20">
                            <el-checkbox label="记住密码" v-model="remember"></el-checkbox>
                        </div>
                        <el-form-item>
                            <el-button type="primary" size="large" style="width:100%" @click="submitForm('ruleForm')">登录
                            </el-button>
                        </el-form-item>
                        <el-form-item>
                            <a href="#">
                                <el-button type="text">OpenId登录</el-button>
                            </a>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import hexMd5 from 'src/libs/md5';
    import security from 'src/libs/security';
    import sjcl from 'src/libs/sjcl';

    const exponent = '10001';
    const modulus = '';

    export default {
        data () {
            return {
                urls: {
                    login: '/logindo.api'
                },
                ruleForm: {
                    username: '',
                    email: '',
                    password: ''
                },
                remember: false,
                rules: {
                    username: [{required: true, message: '请输入工号'}],
                    email: [{required: true, message: '请输入邮箱前缀'}],
                    password: [{required: true, message: '请输入密码'}]
                },
                emailMode: false,
                loading: false
            };
        },
        methods: {
            toggleView () {
                this.emailMode = !this.emailMode;
                let ruleName = this.emailMode ? 'email' : 'username';
                if (this.rememberCurrent(ruleName)) {
                    return;
                }
                this.ruleForm[ruleName] = '';
                this.ruleForm.password = '';
                this.remember = false;
            },
            rememberCurrent (rName) {
                let storeInfo = localStorage.getItem(this.getUnitKey());
                if (storeInfo) {
                    let last = rName ? (this.emailMode ? 'email' : 'user') : storeInfo.last,
                        ruleName = rName || (last === 'email' ? 'email' : 'username'),
                        targetInfo = storeInfo[last];
                    if (!rName) {
                        this.emailMode = (storeInfo.last === 'email');
                    }
                    if (targetInfo) {
                        let name = sjcl.decrypt(modulus, targetInfo._n),
                            pwd = sjcl.decrypt(name, targetInfo._p);
                        this.ruleForm[ruleName] = name;
                        this.ruleForm.password = pwd;
                        this.remember = true;
                        return true;
                    }
                }
                return false;
            },
            toggleRemember (isRemember) {
                let storeInfo = localStorage.getItem(this.getUnitKey());
                // 当前记住密码
                if (isRemember === true) {
                    let userInfo = {
                        _p: '',
                        _n: this.emailMode ? this.ruleForm.email : this.ruleForm.username
                    };
                    userInfo['_p'] = sjcl.encrypt(userInfo['_n'], this.ruleForm.password);
                    userInfo['_n'] = sjcl.encrypt(modulus, userInfo['_n']);
                    let store = storeInfo || {};
                    store['last'] = this.emailMode ? 'email' : 'user';
                    store[store.last] = userInfo;
                    localStorage.setItem(this.getUnitKey(), store);
                } else {
                    // 当前不记住密码，则删除已有的记录
                    if (storeInfo) {
                        delete storeInfo[this.emailMode ? 'email' : 'user'];
                        storeInfo['last'] = this.emailMode ? 'email' : 'user';
                        localStorage.setItem(this.getUnitKey(), storeInfo);
                    }
                }
            },
            getUnitKey () {
                let key = `_waibao`,
                    projectKey = location.pathname.split('/')[1];
                return projectKey ? `_${projectKey}` : key;
            },
            encryPasswd (pwd) {
                let key = window.RSAUtils.getKeyPair(exponent, '', modulus);
                return window.RSAUtils.encryptedString(key, pwd);
            },
            dataProcess () {
                return {
                    username: this.emailMode ? this.ruleForm.email : this.ruleForm.username,
                    passwd: this.emailMode ? hexMd5(this.ruleForm.password) : this.encryPasswd(this.ruleForm.password),
                    type: this.emailMode ? 'email' : 'loginId'
                };
            },
            submitForm (form) {
                this.$refs[form].validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.$axios.post(this.urls.login, this.dataProcess()).then(res => {
                            this.loading = false;
                            this.toggleRemember(this.remember);
                            console.log(res);
                        }).catch(() => {
                            this.loading = false;
                        });
                    }
                });
            }
        },
        created () {
            this.rememberCurrent();
        }
    };
</script>

<style type="text/scss">
    .scoped-login {
        display: table;
        table-layout: fixed;
        height: 100%;
        width: 100%;
        background: #edf1f2 url('~images/login/bg.png') repeat-x 0 bottom;

        .login-form {
            display: table-cell;
            vertical-align: middle;
            text-align: center;
            width: 100%;
            height: 100%;
        }

        .center-box {
            position: relative;
            width: 1000px;
            height: 550px;
            margin: 0 auto;
            box-sizing: border-box;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
            background: #fff url('~images/login/left-side.png') no-repeat 12% 50%;
            border-radius: 5px;
        }

        .logo-text {
            position: absolute;
            bottom: 100%;
            left: 0;
            text-indent: -99em;
            width: 177px;
            height: 58px;
            margin-bottom: 10px;
            background: url('~images/login/logo.png') no-repeat;
        }

        .rule-form {
            position: absolute;
            top: 90px;
            right: 75px;
            padding-left: 50px;
            border-left: 1px solid #f2f5f9;
            width: 330px;
            .title {
                font-size: 18px;
                color: #999;
                margin-top: 20px;
                margin-bottom: 40px;
            }
            .divider {
                margin: 0 30px;
                height: 17px;
                display: inline-block;
                border-left: 1px solid #e0e0e0;
                vertical-align: middle;
            }
            .sub-title {
                cursor: pointer;
                &.active {
                    font-weight: bold;
                    color: $color-primary;
                }
            }
        }
    }
</style>