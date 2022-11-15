<template>
    <div class="upload-box">
        <div class="upload-image-list">
            <div class="img-box" v-for="(item, i) in fileList" :key="i">
                <el-image
                    class="image"
                    :src="item"
                    :preview-src-list="fileList"
                >
                </el-image>
                <span style="color: red" @click="deleteImageItem(i)">×</span>
            </div>
            <div class="upload-content" v-if="fileList.length < this.limit" @click="simulationClick">
                <input type="file" name="file" id="file" multiple @change="upload"  ref="uploadInput">
                <i class="el-icon-plus"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'importImages',
    props: {
        // 最大可上传数
        limit: {
            type: Number,
            default: 999
        },
        // 格式为 ['', '', '']
        fileList: {
            type: Array,
            default: () => []
        },
        // 接受上传的图片类型
        accept: {
            type: Array,
            default: () => ['jpg', 'png', 'jpeg', 'gif']
        },
        w: { // 图片
            type: Number,
            default: 9999
        },
        h: { // 图片  高度
            type: Number,
            default: 9999
        },
        minHeight: { // 最小高度
            type: [Number, String],
            default: ''
        },
        size: {
            type: Number,
            default: 1024
        }
    },
    methods: {
        simulationClick () {
            document.getElementById('file').click()
        },
        upload (e) {
            for (let i = 0; i < e.target.files.length; i++) {
                const file = e.target.files[i]
                // 只有最后一条上传的数据才有提示
                file.isMessage = i === e.target.files.length - 1
                // 上传前的校验
                if (!this.beforeAvatarUpload(file, e.target.files)) return
                // 限制尺寸并执行上传
                this.limitWidthHeight(file, this.w, this.h, this.minHeight, (data) => {
                    if (!data) {
                        return false
                    }
                    // 开始执行上传
                    this.handleUploadFile(file)
                })
            }
        },
        // 删除
        deleteImageItem (i) {
            this.$emit('deleteImageItem', i)
            this.$set(this.$refs, 'uploadInput.value', null)
        },
        beforeAvatarUpload (file, fileList) {
            const img = file.name.substring(file.name.lastIndexOf('.') + 1)
            const isLtSize = file.size / 1024 < this.size
            // 限制图片类型和数量
            if (!this.accept.includes(img)) {
                this.$message.warning(`只能上传格式为 ${this.accept.join('、')} 的图片`)
                return false
            }
            if (this.fileList.length + fileList.length > this.limit) {
                this.$message.warning(`最多只能上传${this.limit}张`)
                return false
            }
            if (!isLtSize) {
                this.$message.error(`上传图片大小不能超过${this.size < 1024 ? this.size + 'kb' : this.size / 1024 + 'M'}!`)
                return false
            }
            return true
        },
        // 限制尺寸
        limitWidthHeight (file, maxWidth, maxHeight, minHeight, callback) {
            let isAllow = true
            let that = this
            let reader = new FileReader()
            reader.onload = function (e) {
                let image = new Image()
                image.src = e.target.result
                image.onload = function () {
                    let width = image.width
                    let height = image.height
                    if (maxWidth === 9999 && maxHeight !== 9999 && height !== maxHeight) {
                        that.$message.error(`上传的图片高度只能是${maxHeight}px`)
                        isAllow = false
                    }
                    if (maxWidth !== 9999 && maxHeight === 9999 && width !== maxWidth) {
                        that.$message.error(`上传的图片宽度只能是${maxWidth}px`)
                        isAllow = false
                    }
                    if (maxWidth !== 9999 && maxHeight !== 9999 && !(width === maxWidth && height === maxHeight) && !minHeight) {
                        that.$message.error(`上传的图片尺寸大小只能是${maxWidth}px*${maxHeight}px`)
                        isAllow = false
                    }
                    if (minHeight && maxHeight === 9999 && height < minHeight) {
                        that.$message.error(`上传的图片高度只能是大于${minHeight}px`)
                        isAllow = false
                    }
                    if (minHeight && maxHeight !== 9999 && maxWidth !== 9999 && width !== maxWidth) {
                        that.$message.error(`上传的图片宽度只能是${maxWidth}px`)
                        isAllow = false
                    }
                    if (minHeight && maxHeight !== 9999 && (height > maxHeight || height < minHeight)) {
                        that.$message.error(`上传的图片高度只能是${minHeight}px-${maxHeight}px`)
                        isAllow = false
                    }
                    callback(isAllow)
                }
            }
            reader.readAsDataURL(file)
        },
        async handleUploadFile (file) {
            const form = new FormData()
            form.append('file', file)
            const { data } = await this.$http.post(`/admin/api/upload`, form);
            if (data.success) {
                this.$emit('handleUploadFile', data.data, file)
            }
            if (file.isMessage) {
                this.$message[data.success ? 'success' : 'warning'](data.success ? '图片上传至服务器成功！' : data.message)
            }
            this.$refs.uploadInput.value = null
        }
    }
}
</script>

<style lang="scss" scoped>
.upload-box {
    display: flex;

    .upload-content {
        border: 1px solid #D9D9D9;
        width: 52px;
        height: 52px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        cursor: pointer;

        > .el-icon-plus {
            color: #BFBFBF;
        }

        input {
            display: none;
        }
    }

    .upload-image-list {
        display: flex;
        flex-wrap: wrap;

        .img-box {
            position: relative;

            .image {
                width: 52px !important;
                height: 52px !important;
                border: 1px solid #D9D9D9;
                margin-right: 13px
            }

            > span {
                cursor: pointer;
                position: absolute;
                top: -9px;
                right: 17px;
                opacity: 0;
                visibility: hidden;
                transition: .15s;
            }

            &:hover {
                > span {
                    opacity: 1;
                    visibility: visible;
                }
            }
        }
    }
}
</style>
