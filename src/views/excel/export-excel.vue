<template>
  <div class="app-container">
    <div>
      <el-button
        :loading="downloadLoading"
        style="margin:0 0 20px 20px;"
        type="primary"
        icon="el-icon-document"
        @click="handleAddData"
      >
        添加数据
      </el-button>
      <el-button
        :loading="downloadLoading"
        style="margin:0 0 20px 20px;"
        type="primary"
        icon="el-icon-document"
        @click="fileNameDialogVisible = true"
      >
        导出表单
      </el-button>
      <el-button
        :loading="downloadLoading"
        style="margin:0 0 20px 20px;"
        type="primary"
        icon="el-icon-document"
        @click="handleExportImage"
      >
        导出图片
      </el-button>
    </div>

    <div id="table-container">
      <div class="table-header">
        <div class="table-header-title">科琳包覆门板厂报价表</div>
        <div class="table-header-user">
          <div class="table-header-user-item table-header-user-name">
            <label>姓名：</label>
            <el-input v-model="orderForm.name" />
          </div>
          <div class="table-header-user-item table-header-user-address">
            <label>地址：</label>
            <el-input v-model="orderForm.address" />
          </div>
          <div class="table-header-user-item table-header-user-data">
            <label>日期：</label>
            <el-input v-model="orderForm.data" />
          </div>
        </div>
      </div>
      <el-table
        id="table-wrap"
        :data="tableData"
        :style="{width:exportImagedialogVisible?'1160px':'1340px'}"
        :header-row-class-name="headerClass"
        show-summary
        sum-text="合计"
        :summary-method="getSummaries"
        border
      >
        <el-table-column prop="id" label="序号" width="140" />
        <el-table-column prop="height" label="高" width="80" />
        <el-table-column prop="width" label="宽" width="80" />
        <el-table-column prop="count" label="数量" width="80" />
        <el-table-column prop="notch" label="开孔" width="80" />
        <el-table-column prop="color" label="色号" width="80" />
        <el-table-column prop="remark" label="备注" width="200" />
        <el-table-column prop="area" label="面积" width="120" />
        <el-table-column prop="perPrice" label="单价" width="120" />
        <el-table-column prop="totalPrice" label="总价" width="180" />
        <el-table-column v-if="!loadingImage" label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <h2>咨询电话：13080608058</h2>
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="高/mm">
          <el-input v-model="form.height" type="number" />
        </el-form-item>
        <el-form-item label="宽/mm">
          <el-input v-model="form.width" type="number" />
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="form.count" type="number" />
        </el-form-item>
        <el-form-item label="开孔">
          <el-input v-model="form.notch" />
        </el-form-item>
        <el-form-item label="颜色">
          <el-input v-model="form.color" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" type="textarea" />
        </el-form-item>
        <el-form-item label="面积">
          {{ getPanelArea() }}m²
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model="form.perPrice" />
        </el-form-item>
        <el-form-item label="总价">
          {{ getTotalPrice() }}
        </el-form-item>
        <el-form-item>
          <el-button v-if="editType === 'add'" type="primary" @click="onSubmit">立即添加</el-button>
          <el-button v-if="editType === 'edit'" type="primary" @click="handleUpdate">更新</el-button>
          <el-button @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>

    <!-- 导出表单，输入文件名 -->
    <el-dialog title="请输入导出表单文件名" :visible.sync="fileNameDialogVisible" width="30%">
      <el-input v-model="filename" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDownload">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 导出图片，输入文件名 -->
    <el-dialog title="请输入导出表单文件名" :visible.sync="exportImagedialogVisible" width="30%" :before-close="handleCancelDownImage">
      <el-input v-model="filename" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancelDownImage">取 消</el-button>
        <el-button type="primary" @click="handleDownloadImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import html2canvas from 'html2canvas'
export default {
  name: 'ExportExcel',
  components: {},
  data() {
    return {
      list: null,
      listLoading: true,
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx',
      tableData: [],
      dialogVisible: false,
      orderForm: {
        name: '',
        address: '',
        data: ''
      },
      form: {
        height: '',
        width: '',
        count: '',
        notch: '',
        color: '',
        remark: '',
        area: '',
        perPrice: '',
        totalPrice: ''
      },
      editType: 'add',
      ediIndex: 0,
      fileNameDialogVisible: false,
      loadingImage: false,
      exportImagedialogVisible: false
    }
  },
  methods: {
    getSummaries(param) {
      console.log(11111)
      const { columns } = param
      const sums = []
      let priceAll = 0
      this.tableData.forEach(row => {
        priceAll = priceAll + Number(row.totalPrice)
      })
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (index === 9) {
          sums[index] = '总价：' + priceAll
        } else {
          sums[index] = ''
        }
      })
      return sums
    },
    // 表单样式部分
    headerClass({ row, rowIndex }) {
      if (rowIndex === 0) {
        return 'table_header'
      }
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['序号', '高', '宽', '数量', '开孔', '颜色', '备注', '面积', '单价', '总价']
        const filterVal = ['id', 'height', 'width', 'count', 'notch', 'color', 'remark', 'area', 'perPrice', 'totalPrice']
        const tableData = this.tableData
        const data = this.formatJson(filterVal, tableData)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
        this.fileNameDialogVisible = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    handleAddData() {
      this.editType = 'add'
      this.dialogVisible = true
    },
    onSubmit() {
      this.form.id = this.tableData.length + 1
      this.tableData.push(JSON.parse(JSON.stringify(this.form)))
      this.dialogVisible = false
      this.form = {
        height: '',
        width: '',
        count: '',
        notch: '',
        color: '',
        remark: '',
        area: '',
        perPrice: '',
        totalPrice: ''
      }
    },
    handleDelete(index, row) {
      this.tableData.splice(index, 1)
    },
    handleClose() {
      this.dialogVisible = false
      this.form = {
        height: '',
        width: '',
        count: '',
        notch: '',
        color: '',
        remark: '',
        area: '',
        perPrice: '',
        totalPrice: ''
      }
    },
    handleEdit(index, row) {
      this.editType = 'edit'
      this.ediIndex = index
      this.dialogVisible = true
      this.form = row
    },
    handleUpdate() {
      this.tableData.splice(this.ediIndex, 1, this.form)
      this.dialogVisible = false
      this.ediIndex = 0
      this.editType = 'add'
      this.form = {
        height: '',
        width: '',
        count: '',
        notch: '',
        color: '',
        remark: '',
        area: '',
        perPrice: '',
        totalPrice: ''
      }
    },
    getPanelArea() {
      if (!this.form.height || !this.form.width || !this.form.count) {
        return 0
      }
      const singleArea = (this.form.height / 1000) * (this.form.width / 1000)
      const totalArea = Math.round(singleArea * this.form.count * 100) / 100
      this.form.area = totalArea
      return totalArea
    },
    getTotalPrice() {
      if (!this.form.area || !this.form.perPrice) return 0
      const totalPrice = (this.form.area * this.form.perPrice).toFixed(2)
      this.form.totalPrice = totalPrice
      return totalPrice
    },
    handleExportImage() {
      this.loadingImage = true
      this.exportImagedialogVisible = true
      this.$forceUpdate()
    },
    handleCancelDownImage() {
      this.loadingImage = false
      this.exportImagedialogVisible = false
      this.$forceUpdate()
    },
    handleDownloadImage() {
      html2canvas(document.getElementById('table-container')).then(canvas => {
        // 在这里，canvas 是已经包含你指定 HTML 内容的图片

        // 创建一个图片链接元素
        const link = document.createElement('a')
        // 设置图片的 URL 为 Canvas 的图片 URL
        link.href = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
        // 设置下载文件的名称
        link.download = this.filename + '.png'
        // 触发下载
        link.click()
        this.loadingImage = false
        this.exportImagedialogVisible = false
      })
    }
  }
}
</script>

<style lang="scss">
.radio-label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 30px;
}

.center {
  text-align: center;
}

.table-header{
  border: 1px solid #000;
  border-bottom: none;
  padding: 12px 0;
  .table-header-title{
    font-size: 36px;
    font-weight: 500;
    text-align: center;
  }
  .table-header-user{
    display: flex;
    justify-content: end;
    margin-top: 10px;
    .table-header-user-item{
      display: flex;
      align-items: center;
      label{
        white-space: nowrap;
      }
      .el-input__inner{
        border: none;
        color: #000;
        font-size: 16px;
        font-weight: 500;
      }
    }
  }
}

.el-table {
  border: 1px solid #000000;
}

.el-table thead.is-group th {
  background-color: unset;
}
.el-table th.is-leaf{
  border-color: #000000 !important;
}
.el-table--border th,.el-table--border td {
  border-color: #000000 !important;
}

.el-table th>.cell {
  text-align: center;
  color: #000000;
}
.el-table__body-wrapper{
  overflow: hidden!important;
}
.el-table__header{
  width: 100%!important;
}
#table-container{
  padding: 8px;
  width: fit-content;
}
.el-table__footer-wrapper tr td:nth-of-type(10){
  background-color: yellow;
  font-weight: 600;
  font-size: 18px;
}
</style>
