const mongoose = require('mongoose')

// 创建mongo的schema(概要)(初始框架)
const schema = new mongoose.Schema({
  // 角色名称
  name: { type: String },
  // 角色头像
  //假设上传的图片很大，我们就只存储图片的地址
  avatar: { type: String },
  // 角色称号
  title: { type: String },
  // 角色定位
  // 这里有的角色定位不是一个而是多个的话我们就得定位多个分类
  // 加中括号之后在mongoose里的categories就代表是一个数组,数组里面就是内容,这样从数据上我们就可以实现多选
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  // 难度评分
  scores: {
    // 难度
    difficult: { type: Number },
    // 技能
    skills: { type: Number },
    // 攻击
    attack: { type: Number },
    // 生存
    survive: { type: Number },
  },
  // 技能
  skills: [{
    // 技能图标
    icon: { type: String },
    // 技能名称
    name: { type: String },
    // 技能描述
    description: { type: String },
    // 技能小提示
    tips: { type: String },
  }],
  // 顺风装备
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  // 逆风装备
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  // 使用技巧
  usageTips: { type: String },
  // 战斗技巧
  battleTips: { type: String },
  // 团战思路
  teamTips: { type: String },
  // 英雄关系里的最佳搭档
  partners: [{
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
    description: { type: String }
  }]
})

//                 导出名为schema的mongoose模型
module.exports = mongoose.model('Hero', schema)
