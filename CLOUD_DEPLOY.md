# SnackMall 微信云开发部署指南

本文档指导您如何将 SnackMall 小程序部署到微信云开发环境。

## 前置要求

1. 注册并登录 [微信小程序后台](https://mp.weixin.qq.com/)
2. 下载并安装 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

## 部署步骤

### 1. 开通云开发

1. 在微信开发者工具中打开项目
2. 点击工具栏的「云开发」按钮
3. 点击「开通」按钮
4. 选择基础版（免费）
5. 创建环境，记住环境 ID（类似 `cloud1-xxx`）

### 2. 更新云环境 ID

编辑 `app.js` 文件，将 `your-env-id` 替换为你的云环境 ID：

```javascript
wx.cloud.init({
  env: 'your-env-id', // 替换为你的云环境 ID
  traceUser: true,
})
```

### 3. 创建云数据库集合

在云开发控制台 -> 数据库中创建以下集合：

#### 1. users（用户表）
点击「添加集合」，输入集合名 `users`

#### 2. products（商品表）
输入集合名 `products`

#### 3. cart（购物车表）
输入集合名 `cart`

#### 4. orders（订单表）
输入集合名 `orders`

#### 5. addresses（地址表）
输入集合名 `addresses`

#### 6. favorites（收藏表）
输入集合名 `favorites`

#### 7. categories（分类表）
输入集合名 `categories`

### 4. 上传并部署云函数

在微信开发者工具中：

1. 找到 `cloudfunctions` 目录
2. 右键点击每个云函数文件夹
3. 选择「上传并部署：云端安装依赖」

依次部署以下云函数：
- `login`（登录）
- `products`（商品管理）
- `cart`（购物车）
- `orders`（订单管理）
- `addresses`（地址管理）
- `favorites`（收藏功能）

### 5. 初始化测试数据

#### 添加测试商品

在云开发控制台 -> 数据库 -> `products` 集合中，点击「添加记录」，输入以下 JSON 数据：

```json
{
  "name": "测试商品1",
  "description": "这是一个测试商品",
  "price": 99.00,
  "original_price": 199.00,
  "images": ["https://via.placeholder.com/300"],
  "detail_images": ["https://via.placeholder.com/600"],
  "category_id": "cat001",
  "stock": 100,
  "sales": 10,
  "is_active": true,
  "created_at": {"$date": 1234567890000}
}
```

添加多条测试商品数据。

#### 添加测试分类

在 `categories` 集合中添加：

```json
{
  "name": "电子产品",
  "description": "电子数码产品",
  "icon": "https://via.placeholder.com/50",
  "sort_order": 1,
  "is_active": true
}
```

### 6. 配置云存储（图片上传）

1. 在云开发控制台 -> 存储 -> 管理
2. 创建文件夹 `products` 用于存放商品图片
3. 可以手动上传测试图片，或在小程序中实现图片上传功能

### 7. 测试运行

1. 在微信开发者工具中点击「编译」
2. 在模拟器中测试各个功能：
   - 点击「我的」->「点击登录」测试登录
   - 查看首页商品列表
   - 点击商品查看详情
   - 测试购物车功能

### 8. 上传发布

测试无误后，可以发布小程序：

1. 点击工具栏「上传」按钮
2. 填写版本号和备注
3. 上传成功后，在微信小程序后台提交审核
4. 审核通过后，小程序即可上线

## 常见问题

### Q: 云函数部署失败？
A: 检查网络连接，确保已开通云开发环境。

### Q: 数据库查询不到数据？
A: 确保集合名称正确，检查数据是否已添加。

### Q: 云开发额度用完了怎么办？
A: 基础版每天有免费额度，用完可以升级或第二天重置。

### Q: 如何配置微信支付？
A: 需要在微信商户平台申请开通，然后在云函数中集成支付接口。

## 费用说明

### 云开发免费额度（基础版）

- 读操作：5 万次/天
- 写操作：3 万次/天
- CDNA 流量：2GB/天
- 云函数调用：2 万次/天

对于初创项目，免费额度完全够用。

## 技术支持

- 微信云开发文档：https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html
- 云函数文档：https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/functions.html
- 云数据库文档：https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database.html

## 下一步优化建议

1. **添加更多商品数据**
2. **实现图片上传到云存储**
3. **集成微信支付**
4. **添加订单管理页面**
5. **优化 UI/UX**
6. **添加搜索功能**
7. **实现评价系统**
8. **添加分享功能**

祝您部署成功！🎉
