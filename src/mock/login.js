const qs = require('qs');
const Mock = require('mockjs');
const baseData = require('./baseData');

const userPermission = {
  DEFAULT: ['1', '2', '3', '4', '5'],
  ADMIN: ['1', '2', '3', '4', '5', '6', '7', '8'],
  DEVELOPER: ['1', '2', '3'],
};

const adminUsers = [
  {
    id: 0,
    username: 'admin',
    password: 'admin',
    permissions: userPermission.ADMIN,
  },
  {
    id: 1,
    username: 'guest',
    password: 'guest',
    permissions: userPermission.DEFAULT,
  },
  {
    id: 2,
    username: '吴彦祖',
    password: '123456',
    permissions: userPermission.DEVELOPER,
  },
];

// role
const roleObj = {
  id: 'admin',
  name: '管理员',
  describe: '拥有所有权限',
  status: 1,
  creatorId: 'system',
  createTime: 1497160610259,
  deleted: 0,
  permissions: [{
    roleId: 'admin',
    permissionId: 'dashboard',
    permissionName: '仪表盘',
    actions: '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
    actionEntitySet: [{
      action: 'add',
      describe: '新增',
      defaultCheck: false,
    }, {
      action: 'query',
      describe: '查询',
      defaultCheck: false,
    }, {
      action: 'get',
      describe: '详情',
      defaultCheck: false,
    }, {
      action: 'update',
      describe: '修改',
      defaultCheck: false,
    }, {
      action: 'delete',
      describe: '删除',
      defaultCheck: false,
    }],
    actionList: null,
    dataAccess: null,
  }, {
    roleId: 'admin',
    permissionId: 'exception',
    permissionName: '异常页面权限',
    actions: '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
    actionEntitySet: [{
      action: 'add',
      describe: '新增',
      defaultCheck: false,
    }, {
      action: 'query',
      describe: '查询',
      defaultCheck: false,
    }, {
      action: 'get',
      describe: '详情',
      defaultCheck: false,
    }, {
      action: 'update',
      describe: '修改',
      defaultCheck: false,
    }, {
      action: 'delete',
      describe: '删除',
      defaultCheck: false,
    }],
    actionList: null,
    dataAccess: null,
  }, {
    roleId: 'admin',
    permissionId: 'result',
    permissionName: '结果权限',
    actions: '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
    actionEntitySet: [{
      action: 'add',
      describe: '新增',
      defaultCheck: false,
    }, {
      action: 'query',
      describe: '查询',
      defaultCheck: false,
    }, {
      action: 'get',
      describe: '详情',
      defaultCheck: false,
    }, {
      action: 'update',
      describe: '修改',
      defaultCheck: false,
    }, {
      action: 'delete',
      describe: '删除',
      defaultCheck: false,
    }],
    actionList: null,
    dataAccess: null,
  }, {
    roleId: 'admin',
    permissionId: 'profile',
    permissionName: '详细页权限',
    actions: '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
    actionEntitySet: [{
      action: 'add',
      describe: '新增',
      defaultCheck: false,
    }, {
      action: 'query',
      describe: '查询',
      defaultCheck: false,
    }, {
      action: 'get',
      describe: '详情',
      defaultCheck: false,
    }, {
      action: 'update',
      describe: '修改',
      defaultCheck: false,
    }, {
      action: 'delete',
      describe: '删除',
      defaultCheck: false,
    }],
    actionList: null,
    dataAccess: null,
  }, {
    roleId: 'admin',
    permissionId: 'table',
    permissionName: '表格权限',
    actions: '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"}]',
    actionEntitySet: [{
      action: 'add',
      describe: '新增',
      defaultCheck: false,
    }, {
      action: 'import',
      describe: '导入',
      defaultCheck: false,
    }, {
      action: 'get',
      describe: '详情',
      defaultCheck: false,
    }, {
      action: 'update',
      describe: '修改',
      defaultCheck: false,
    }],
    actionList: null,
    dataAccess: null,
  }, {
    roleId: 'admin',
    permissionId: 'form',
    permissionName: '表单权限',
    actions: '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
    actionEntitySet: [{
      action: 'add',
      describe: '新增',
      defaultCheck: false,
    }, {
      action: 'get',
      describe: '详情',
      defaultCheck: false,
    }, {
      action: 'query',
      describe: '查询',
      defaultCheck: false,
    }, {
      action: 'update',
      describe: '修改',
      defaultCheck: false,
    }, {
      action: 'delete',
      describe: '删除',
      defaultCheck: false,
    }],
    actionList: null,
    dataAccess: null,
  }, {
    roleId: 'admin',
    permissionId: 'order',
    permissionName: '订单管理',
    actions: '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
    actionEntitySet: [{
      action: 'add',
      describe: '新增',
      defaultCheck: false,
    }, {
      action: 'query',
      describe: '查询',
      defaultCheck: false,
    }, {
      action: 'get',
      describe: '详情',
      defaultCheck: false,
    }, {
      action: 'update',
      describe: '修改',
      defaultCheck: false,
    }, {
      action: 'delete',
      describe: '删除',
      defaultCheck: false,
    }],
    actionList: null,
    dataAccess: null,
  }, {
    roleId: 'admin',
    permissionId: 'permission',
    permissionName: '权限管理',
    actions: '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
    actionEntitySet: [{
      action: 'add',
      describe: '新增',
      defaultCheck: false,
    }, {
      action: 'get',
      describe: '详情',
      defaultCheck: false,
    }, {
      action: 'update',
      describe: '修改',
      defaultCheck: false,
    }, {
      action: 'delete',
      describe: '删除',
      defaultCheck: false,
    }],
    actionList: null,
    dataAccess: null,
  }, {
    roleId: 'admin',
    permissionId: 'role',
    permissionName: '角色管理',
    actions: '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
    actionEntitySet: [{
      action: 'add',
      describe: '新增',
      defaultCheck: false,
    }, {
      action: 'get',
      describe: '详情',
      defaultCheck: false,
    }, {
      action: 'update',
      describe: '修改',
      defaultCheck: false,
    }, {
      action: 'delete',
      describe: '删除',
      defaultCheck: false,
    }],
    actionList: null,
    dataAccess: null,
  }, {
    roleId: 'admin',
    permissionId: 'table',
    permissionName: '桌子管理',
    actions: '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
    actionEntitySet: [{
      action: 'add',
      describe: '新增',
      defaultCheck: false,
    }, {
      action: 'get',
      describe: '详情',
      defaultCheck: false,
    }, {
      action: 'query',
      describe: '查询',
      defaultCheck: false,
    }, {
      action: 'update',
      describe: '修改',
      defaultCheck: false,
    }, {
      action: 'delete',
      describe: '删除',
      defaultCheck: false,
    }],
    actionList: null,
    dataAccess: null,
  }, {
    roleId: 'admin',
    permissionId: 'user',
    permissionName: '用户管理',
    actions: '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
    actionEntitySet: [{
      action: 'add',
      describe: '新增',
      defaultCheck: false,
    }, {
      action: 'import',
      describe: '导入',
      defaultCheck: false,
    }, {
      action: 'get',
      describe: '详情',
      defaultCheck: false,
    }, {
      action: 'update',
      describe: '修改',
      defaultCheck: false,
    }, {
      action: 'delete',
      describe: '删除',
      defaultCheck: false,
    }, {
      action: 'export',
      describe: '导出',
      defaultCheck: false,
    }],
    actionList: null,
    dataAccess: null,
  }],
};

const superPermission = {
  roleId: 'admin',
  permissionId: 'support',
  permissionName: '超级模块',
  actions: '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
  actionEntitySet: [{
    action: 'add',
    describe: '新增',
    defaultCheck: false,
  }, {
    action: 'import',
    describe: '导入',
    defaultCheck: false,
  }, {
    action: 'get',
    describe: '详情',
    defaultCheck: false,
  }, {
    action: 'update',
    describe: '修改',
    defaultCheck: false,
  }, {
    action: 'delete',
    describe: '删除',
    defaultCheck: false,
  }, {
    action: 'export',
    describe: '导出',
    defaultCheck: false,
  }],
  actionList: null,
  dataAccess: null,
};


const noAuthList = ['/api/user/login'];
module.exports = {
  loginByName(req, res) {
    const { username, password } = req.body;
    const user = adminUsers.filter(item => item.username === username);
    if (user.length > 0 && user[0].password === password) {
      const now = new Date();
      now.setDate(now.getDate() + 1);
      res.cookie('token', JSON.stringify({ id: user[0].id, deadline: now.getTime() }), {
        maxAge: 900000,
        httpOnly: true,
      });
      res.json(baseData('success', '登录成功'));
    } else {
      res.json(baseData('error', '用户名密码错误'));
    }
  },
  authLogin(req, res, next) {
    if (noAuthList.indexOf(req.path) > -1) {
      next();
      return;
    }
    const cookie = req.headers.cookie || '';
    const cookies = qs.parse(cookie.replace(/\s/g, ''), { delimiter: ';' });
    const response = {};
    if (!cookies.token) {
      res.status(200).send(baseData('error', '登录超时', 3));
      return;
    }
    const token = JSON.parse(cookies.token);
    if (token) {
      response.success = token.deadline > new Date().getTime();
    }
    if (response.success) {
      next();
    } else {
      res.status(200).send(baseData('error', '登录超时', 3));
    }
  },
  getUserInfo(req, res) {
    const cookie = req.headers.cookie || '';
    const cookies = qs.parse(cookie.replace(/\s/g, ''), { delimiter: ';' });
    const token = JSON.parse(cookies.token);
    console.log('Token for mock:', token);
    const user = {};
    const userItem = adminUsers.filter(_ => _.id === token.id);
    if (userItem.length > 0) {
      user.permissions = userItem[0].permissions;
      user.username = userItem[0].username;
      user.id = userItem[0].id;
    }
    const data = baseData('success', '操作成功');
    data.entity = user;
    res.json(data);
  },
};
