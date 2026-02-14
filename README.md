# SnackMall 微信电商商城小程序

一个完整的电商商城微信小程序项目，基于微信云开发，无需服务器即可快速上线。

## ✨ 功能特性

- 🏠 **首页展示**: 轮播图、商品列表展示
- 📦 **商品分类**: 左右分栏分类浏览
- 🛒 **购物车**: 商品管理、数量调整、价格计算
- 👤 **用户中心**: 用户信息、订单管理、地址管理
- 📱 **商品详情**: 图片轮播、商品信息、加入购物车、立即购买
- ☁️ **云开发**: 无需服务器，一键部署
- 🔐 **微信登录**: 一键登录，无需注册
- 💾 **云数据库**: 自动扩容，安全可靠

## 🚀 技术栈

- 微信小程序原生开发
- 微信云开发（云函数 + 云数据库 + 云存储）
- 云开发 SDK

## 📁 项目结构

```
wechat-miniprogram-mall/
├── pages/              # 页面目录
│   ├── index/          # 首页
│   ├── category/       # 分类页
│   ├── cart/           # 购物车
│   ├── user/           # 用户中心
│   └── detail/         # 商品详情
├── cloudfunctions/     # 云函数
│   ├── login/          # 登录云函数
│   ├── products/       # 商品云函数
│   ├── cart/          # 购物车云函数
│   ├── orders/         # 订单云函数
│   ├── addresses/      # 地址云函数
│   └── favorites/      # 收藏云函数
├── images/             # 图片资源
├── app.js              # 小程序入口
├── app.json            # 小程序配置
├── app.wxss            # 全局样式
└── project.config.json # 项目配置
```

## 🎯 快速开始

### 1. 下载项目

```bash
git clone git@github.com:Haojie-Zhou/SnackMall.git
```

### 2. 打开微信开发者工具

1. 打开 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. 导入项目，选择项目目录
3. 填写 AppID（测试可用测试号）
4. 点击"导入"

### 3. 部署云开发

详细的云开发部署步骤请查看 [CLOUD_DEPLOY.md](./CLOUD_DEPLOY.md)

**简要步骤：**
1. 在微信开发者工具中开通云开发
2. 更新 `app.js` 中的云环境 ID
3. 创建云数据库集合（users、products、cart、orders、addresses、favorites）
4. 上传并部署云函数
5. 添加测试数据
6. 编译运行

## 📚 详细文档

- [云开发部署指南](./CLOUD_DEPLOY.md)

## 🔧 开发说明

### 页面说明

- **index**: 首页，展示轮播图和热门商品
- **category**: 商品分类页，左右分栏展示
- **cart**: 购物车页面，管理购物车商品
- **user**: 用户中心，展示用户信息和订单状态
- **detail**: 商品详情页，展示商品详细信息

### 云函数说明

- **login**: 处理用户微信登录
- **products**: 商品数据查询和管理
- **cart**: 购物车增删改查
- **orders**: 订单创建和查询
- **addresses**: 地址管理
- **favorites**: 收藏功能

### 云数据库集合

- **users**: 用户信息
- **products**: 商品信息
- **cart**: 购物车数据
- **orders**: 订单信息
- **addresses**: 收货地址
- **favorites**: 收藏数据
- **categories**: 商品分类

## 🎁 免费额度

微信云开发基础版免费额度（每天）：
- 读操作：5 万次
- 写操作：3 万次
- CDN 流量：2GB
- 云函数调用：2 万次

对于初创项目，免费额度完全够用！

## 🚧 待开发功能

- [ ] 图片上传到云存储
- [ ] 微信支付集成
- [ ] 订单管理页面
- [ ] 搜索功能
- [ ] 评价系统
- [ ] 分享功能
- [ ] 优惠券系统
- [ ] 秒杀功能

## ⚠️ 注意事项

1. 需要在微信小程序后台开通云开发
2. 需要配置云环境 ID
3. 支付功能需要开通微信支付
4. 首次使用云开发需要开通环境

## 💡 优势

### 为什么选择微信云开发？

✅ **无需服务器** - 不需要购买云服务器
✅ **无需运维** - 不需要部署、维护服务器
✅ **免费额度** - 初期完全免费使用
✅ **自动扩容** - 无需担心性能问题
✅ **快速部署** - 一键上传部署
✅ **微信集成** - 登录、支付无缝集成

## 📞 技术支持

- 微信云开发文档：https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html
- 云函数文档：https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/functions.html
- 云数据库文档：https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database.html

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

**祝您开发顺利，小程序早日上线！** 🎉
