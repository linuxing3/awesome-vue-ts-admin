export const roleList = [
  {
    id: '1',
    name: 'admin',
    permissions: [],
  },
  {
    id: '2',
    name: 'user',
    permissions: [],
  },
  {
    id: '3',
    name: 'guest',
    permissions: [],
  },
];

export const defaultActionEntitySet = [
  { key: 'close', describe: 'close' },
  { key: 'use', describe: 'use' },
  { key: 'change', describe: 'change' },
  { key: 'delete', describe: 'delete' },
  { key: 'update', describe: 'update' },
  { key: 'dev', describe: 'dev' },
  { key: 'all', describe: 'all' },
];

export const priority = [
  {
    label: '特提',
    value: '特提',
  },
  {
    label: '特急',
    value: '特急',
  },
  {
    label: '加急',
    value: '加急',
  },
];

export const privacy = [
  {
    label: '因公',
    value: '因公',
  },
  {
    label: '因私',
    value: '因私',
  },
];

export const area = [
  {
    label: '人事',
    value: '人事',
  },
  {
    label: '党务',
    value: '党务',
  },
  {
    label: '财务',
    value: '财务',
  },
  {
    label: '后勤',
    value: '后勤',
  },
  {
    label: '纪检',
    value: '纪检',
  },
  {
    label: '安全',
    value: '安全',
  },
  {
    label: '对外',
    value: '对外',
  },
];

export const inOrOut = [
  {
    label: '发',
    value: '发',
  },
  {
    label: '收',
    value: '收',
  },
];

export const classLevel = [
  {
    label: '机密',
    value: '机密',
  },
  {
    label: '秘密',
    value: '秘密',
  },
  {
    label: '内部',
    value: '内部',
  },
];

export const entity = [
  {
    key: '1',
    label: '外交部',
    value: '外交部',
    children: [
      {
        label: '办公厅',
        value: '办公厅',
      },
      {
        label: '拉美司',
        value: '拉美司',
      },
      {
        label: '礼宾司',
        value: '礼宾司',
      },
      {
        label: '新闻司',
        value: '新闻司',
      },
      {
        label: '财务司',
        value: '财务司',
      },
      {
        label: '行政司',
        value: '行政司',
      },
      {
        label: '服务中心',
        value: '服务中心',
      },
    ],
  },
  {
    key: '2',
    label: '商务部',
    value: '商务部',
    children: [
      {
        label: '美大司',
        value: '美大司',
      },
      {
        label: '援外司',
        value: '援外司',
      },
      {
        label: '人事司',
        value: '人事司',
      },
    ],
  },
  {
    key: '3',
    label: '文化旅游部',
    value: '文化旅游部',
    children: [
      {
        label: '国际司',
        value: '国际司',
      },
      {
        label: '人事司',
        value: '人事司',
      },
    ],
  },
];

export const department = [
  {
    key: '1',
    label: '单位领导',
    value: '单位领导',
  },
  {
    key: '2',
    label: '政新处',
    value: '政新处',
  },
  {
    key: '3',
    label: '经商处',
    value: '经商处',
  },
  {
    key: '4',
    label: '武官处',
    value: '武官处',
  },
  {
    key: '5',
    label: '领侨处',
    value: '领侨',
  },
  {
    key: '6',
    label: '办公室',
    value: '办公室',
  },
];

export const militantRole = [
  {
    key: '1',
    label: '党委书记',
    value: '党委书记',
  },
  {
    key: '2',
    label: '党委委员',
    value: '党委委员',
  },
  {
    key: '3',
    label: '纪检委员',
    value: '纪检委员',
  },
  {
    key: '4',
    label: '支部书记',
    value: '支部书记',
  },
  {
    key: '5',
    label: '党小组长',
    value: '党小组长',
  },
  {
    key: '6',
    label: '支委委员',
    value: '支委委员',
  },
  {
    key: '7',
    label: '正式党员',
    value: '正式党员',
  },
  {
    key: '8',
    label: '预备党员',
    value: '预备党员',
  },
  {
    key: '9',
    label: '发展对象',
    value: '发展对象',
  },
  {
    key: '10',
    label: '积极分子',
    value: '积极分子',
  },
];

export const politicalRole = [
  {
    key: '1',
    label: '中共党员',
    value: '中共党员',
  },
  {
    key: '2',
    label: '团员',
    value: '团员',
  },
  {
    key: '3',
    label: '群众',
    value: '群众',
  },
  {
    key: '4',
    label: '民主党派',
    value: '民主党派',
  },
];

export const etnia = [
  { key: '1', value: '汉族', label: '汉族' },
  { key: '2', value: '蒙古族', label: '蒙古族' },
  { key: '3', value: '回族', label: '回族' },
  { key: '4', value: '藏族', label: '藏族' },
  { key: '5', value: '维吾尔族', label: '维吾尔族' },
  { key: '6', value: '苗族', label: '苗族' },
  { key: '7', value: '彝族', label: '彝族' },
  { key: '8', value: '壮族', label: '壮族' },
  { key: '9', value: '布依族', label: '布依族' },
  { key: '10', value: '朝鲜族', label: '朝鲜族' },
  { key: '11', value: '满族', label: '满族' },
  { key: '12', value: '侗族', label: '侗族' },
  { key: '13', value: '瑶族', label: '瑶族' },
  { key: '14', value: '白族', label: '白族' },
  { key: '15', value: '土家族', label: '土家族' },
  { key: '16', value: '哈尼族', label: '哈尼族' },
  { key: '17', value: '哈萨克族', label: '哈萨克族' },
  { key: '18', value: '傣族', label: '傣族' },
  { key: '19', value: '黎族', label: '黎族' },
  { key: '20', value: '傈僳族', label: '傈僳族' },
  { key: '21', value: '佤族', label: '佤族' },
  { key: '22', value: '畲族', label: '畲族' },
  { key: '23', value: '高山族', label: '高山族' },
  { key: '24', value: '拉祜族', label: '拉祜族' },
  { key: '25', value: '水族', label: '水族' },
  { key: '26', value: '东乡族', label: '东乡族' },
  { key: '27', value: '纳西族', label: '纳西族' },
  { key: '28', value: '景颇族', label: '景颇族' },
  { key: '29', value: '柯尔克孜族', label: '柯尔克孜族' },
  { key: '30', value: '土族', label: '土族' },
  { key: '31', value: '达斡尔族', label: '达斡尔族' },
  { key: '32', value: '仫佬族', label: '仫佬族' },
  { key: '33', value: '羌族', label: '羌族' },
  { key: '34', value: '布朗族', label: '布朗族' },
  { key: '35', value: '撒拉族', label: '撒拉族' },
  { key: '36', value: '毛南族', label: '毛南族' },
  { key: '37', value: '仡佬族', label: '仡佬族' },
  { key: '38', value: '锡伯族', label: '锡伯族' },
  { key: '39', value: '阿昌族', label: '阿昌族' },
  { key: '40', value: '普米族', label: '普米族' },
  { key: '41', value: '塔吉克族', label: '塔吉克族' },
  { key: '42', value: '怒族', label: '怒族' },
  { key: '43', value: '乌孜别克族', label: '乌孜别克族' },
  { key: '44', value: '俄罗斯族', label: '俄罗斯族' },
  { key: '45', value: '鄂温克族', label: '鄂温克族' },
  { key: '46', value: '德昂族', label: '德昂族' },
  { key: '47', value: '保安族', label: '保安族' },
  { key: '48', value: '裕固族', label: '裕固族' },
  { key: '49', value: '京族', label: '京族' },
  { key: '50', value: '塔塔尔族', label: '塔塔尔族' },
  { key: '51', value: '独龙族', label: '独龙族' },
  { key: '52', value: '鄂伦春族', label: '鄂伦春族' },
  { key: '53', value: '赫哲族', label: '赫哲族' },
  { key: '54', value: '门巴族', label: '门巴族' },
  { key: '55', value: '珞巴族', label: '珞巴族' },
  { key: '56', value: '基诺族', label: '基诺族' },
  { key: '91', value: '其他族', label: '其他族' },
  { key: '92', value: '外国血统', label: '外国血统' },
  { key: '93', value: '外国民族', label: '外国民族' },
];

export const gender = [
  {
    key: '男',
    label: '男',
    value: '男',
  },
  {
    key: '女',
    label: '女',
    value: '女',
  },
];

export const academicBackground = [
  {
    key: '本科',
    label: '本科',
    value: '本科',
  },
  {
    key: '硕研',
    label: '硕研',
    value: '硕研',
  },
  {
    key: '博研',
    label: '博研',
    value: '博研',
  },
  {
    key: '大专',
    label: '大专',
    value: '大专',
  },
  {
    key: '中学',
    label: '中学',
    value: '中学',
  },
  {
    key: '小学',
    label: '小学',
    value: '小学',
  },
  {
    key: '学前',
    label: '学前',
    value: '学前',
  },
];

export const diplomaticRank = [
  {
    key: '大使',
    label: '大使',
    value: '大使',
  },
  {
    key: '参赞',
    label: '参赞',
    value: '参赞',
  },
  {
    key: '一秘',
    label: '一秘',
    value: '一秘',
  },
  {
    key: '二秘',
    label: '二秘',
    value: '二秘',
  },
  {
    key: '三秘',
    label: '三秘',
    value: '三秘',
  },
  {
    key: '随员',
    label: '随员',
    value: '随员',
  },
  {
    key: '职员',
    label: '职员',
    value: '职员',
  },
];

export const administravieRank = [
  {
    key: '正司',
    label: '正司',
    value: '正司',
  },
  {
    key: '副司',
    label: '副司',
    value: '副司',
  },
  {
    key: '正师',
    label: '正师',
    value: '正师',
  },
  {
    key: '副师',
    label: '副师',
    value: '副师',
  },
  {
    key: '正处',
    label: '正处',
    value: '正处',
  },
  {
    key: '副处',
    label: '副处',
    value: '副处',
  },
  {
    key: '正团',
    label: '正团',
    value: '正团',
  },
  {
    key: '副团',
    label: '副团',
    value: '副团',
  },
  {
    key: '正科',
    label: '正科',
    value: '正科',
  },
  {
    key: '副科',
    label: '副科',
    value: '副科',
  },
  {
    key: '正营',
    label: '正营',
    value: '正营',
  },
  {
    key: '副营',
    label: '副营',
    value: '副营',
  },
  {
    key: '科员',
    label: '科员',
    value: '科员',
  },
];

export const leavePolicy = [];

export const salaryMode = [
  {
    label: 'mixto',
    value: 'mixto',
  },
  {
    label: 'divisas',
    value: 'divisas',
  },
];

export const banks = [
  {
    label: 'Banco Provincial',
    value: 'Banco Provincial',
  },
  {
    label: 'Banco Banesco',
    value: 'Banco Banesco',
  },
  {
    label: 'Bank of China',
    value: 'Bank of China',
  },
];

export const bloodGroup = [
  {
    label: 'A',
    value: 'A',
  },
  {
    label: 'B',
    value: 'B',
  },
  {
    label: 'AB',
    value: 'AB',
  },
  {
    label: 'O',
    value: 'O',
  },
];

export const educationalQualification = [
  {
    label: 'Escuela Primaria',
    value: 'Escuela Primaria',
  },
  {
    label: 'Bachelet',
    value: 'Bachelet',
  },
  {
    label: 'Licenciado',
    value: 'Licenciado',
  },
  {
    label: 'Maestro',
    value: 'Maestro',
  },
  {
    label: 'Doctor',
    value: 'Doctor',
  },
];

export const leaveType = [
  {
    label: 'Leave Without Pay',
    value: 'Leave Without Pay',
  },
  {
    label: 'Privilege leave',
    value: 'Privilege leave',
  },
  {
    label: 'Sick leave',
    value: 'Sick leave',
  },
  {
    label: 'Compensatory off',
    value: 'Compensatory off',
  },
  {
    label: 'Casual Leave',
    value: 'Casual Leave',
  },
];
