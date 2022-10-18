/*
 Navicat Premium Data Transfer

 Source Server         : 本地
 Source Server Type    : MongoDB
 Source Server Version : 30221
 Source Host           : localhost:27017
 Source Schema         : node-vue-moba

 Target Server Type    : MongoDB
 Target Server Version : 30221
 File Encoding         : 65001

 Date: 18/10/2022 15:08:48
*/


// ----------------------------
// Collection structure for adminusers
// ----------------------------
db.getCollection("adminusers").drop();
db.createCollection("adminusers");

// ----------------------------
// Documents of adminusers
// ----------------------------
db.getCollection("adminusers").insert([ {
    _id: ObjectId("63462e0f3c55f53f7c2b8bcc"),
    username: "admin",
    password: "$2b$10$en0J3TTptxKl3A.K4TnJce5Wnd1rg12sYdhlGyULN/47bROhHsij2",
    __v: NumberInt("0")
} ]);
