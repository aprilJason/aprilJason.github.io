<template>
  <div class="app-container">
    <div class="upload-excel-header">
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
      <div class="rule-section">
        <label>边框规格:</label>
        <el-select v-model="selectBorderSize" placeholder="请选择" @change="handleBorderSizeChange">
          <el-option v-for="item in borderSizeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="rule-section">
        <label>芯板规格:</label>
        <el-select v-model="selectPanelSize" placeholder="请选择" @change="handlePanelSizeChange">
          <el-option v-for="item in panelSizeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="rule-section">
        <label>边框长度:</label>
        <el-select v-model="selectBorderLength" placeholder="请选择" @change="handleBorderLengthChange">
          <el-option v-for="item in borderLengthOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <el-button
        :loading="downloadLoading"
        style="margin:0 0 20px 20px;"
        type="primary"
        icon="el-icon-document"
        @click="handleDownload"
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
      <el-table
        v-if="tableData"
        :data="tableData"
        border
        highlight-current-row
        style="width: 100%;margin-top:20px;"
        show-summary
        sum-text="合计"
        :summary-method="getSummaries"
      >
        <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
      </el-table>
    </div>
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
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { calculateMinimumBoards, Rectangle } from './getPanelCount.js'
import html2canvas from 'html2canvas'
export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      downloadLoading: false,
      tableData: [],
      tableHeader: [],
      panelSizeOptions: [
        {
          value: '1',
          height: 2440,
          width: 1220,
          label: '2440*1220'
        },
        {
          value: '2',
          height: 2750,
          width: 1220,
          label: '2750*1220'
        }
      ],
      borderSizeOptions: [
        {
          value: '1',
          width: 55,
          label: '50 韩式-01,宽度55mm'
        },
        {
          value: '2',
          width: 49,
          label: '汉角现代 B-02,宽度49mm'
        },
        {
          value: '3',
          width: 107,
          label: '60 边框-03,宽度107mm'
        },
        {
          value: '4',
          width: 37,
          label: '50D-04,宽度37mm'
        },
        {
          value: '5',
          width: 87,
          label: '50L-05,宽度87mm'
        },
        {
          value: '6',
          width: 6,
          label: '50E-06,宽度6mm'
        },
        {
          value: '7',
          width: 23,
          label: '45E-07,宽度23mm'
        },
        {
          value: '8',
          width: 85,
          label: '50边框-08,宽度85mm'
        },
        {
          value: '9',
          width: 115,
          label: '60小鸟-09,宽度115mm'
        },
        {
          value: '10',
          width: 115,
          label: '65 边框-10,宽度115mm'
        },
        {
          value: '11',
          width: 115,
          label: '65美式-11,宽度115mm'
        },
        {
          value: '12',
          width: 18,
          label: '45骨骼线-12,宽度18mm'
        },
        {
          value: '13',
          width: 29,
          label: '50骨骼线-13,宽度29mm'
        },
        {
          value: '14',
          width: 21,
          label: '极简-14,宽度21mm'
        },
        {
          value: '15',
          width: 9,
          label: '极简-15,宽度9mm'
        },
        {
          value: '16',
          width: 40,
          label: '新中式-16,宽度40mm'
        },
        {
          value: '17',
          width: 23,
          label: '50*33*18-17,宽度23mm'
        }
      ],
      borderLengthOptions: [
        {
          value: '1',
          length: 2440,
          label: '2440'
        },
        {
          value: '2',
          length: 2750,
          label: '2750'
        }
      ],
      panelSize: {
        width: 100,
        height: 100
      },
      selectPanelSize: '1',
      selectBorderSize: '1',
      selectBorderLength: '1',
      exportImagedialogVisible: false,
      filename: ''
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      const selectPanelItem = this.panelSizeOptions.find((item) => { return item.value === this.selectPanelSize })
      const selectBorderItem = this.borderSizeOptions.find((item) => { return item.value === this.selectBorderSize })
      // 选择的边框宽度
      const borderSize = selectBorderItem.width
      header.push('芯板规格')
      header.push('芯板高')
      header.push('芯板宽')
      header.push('芯板数量')
      header.push('边框规格')
      header.push('边框条数')
      header.splice(header.indexOf('单价'), 1)
      header.splice(header.indexOf('总价'), 1)
      results.forEach(element => {
        element['芯板规格'] = selectPanelItem.height + '*' + selectPanelItem.width
        element['芯板高'] = element['高'] - borderSize
        element['芯板宽'] = element['宽'] - borderSize
        element['芯板数量'] = ''
        element['边框规格'] = borderSize
        element['边框条数'] = ''
        delete element['单价']
        delete element['总价']
      })
      this.tableData = results
      this.tableHeader = header
    },
    /**
     * /**
     * 计算板子数量
     * @param {number} m 板材高度
     * @param {number} n 板材宽度
     * @param {Array} sizes 二维数组，表示板子的规格
     * @returns {number} 板子数量
     */
    getPanelCount(sizes) {
      const select = this.panelSizeOptions.find((item) => { return item.value === this.selectPanelSize })
      const w = select.width
      const h = select.height
      const rectangles = []
      sizes.forEach(item => {
        rectangles.push(new Rectangle(item[0], item[1]))
      })
      const count = calculateMinimumBoards(w, h, rectangles)
      return count
    },
    getBorderCount(lengths) {
      const selectBorder = this.borderLengthOptions.find((item) => { return item.value === this.selectBorderLength })
      const w = selectBorder.length
      // 计算所有棍子需要的总长度
      const totalLength = lengths.reduce((sum, length) => sum + length, 0)

      // 初始化DP数组，dp[i]表示制作长度为i的棍子所需的最少原材料数量
      // 初始化为一个很大的数（比任何可能的答案都大），除了dp[0]为0（不需要任何材料制作长度为0的棍子）
      const dp = Array(totalLength + 1).fill(Infinity)
      dp[0] = 0

      // 遍历所有可能的棍子总长度（从1到totalLength）
      for (let i = 1; i <= totalLength; i++) {
        // 遍历所有可能的切割长度（从原材料长度w到当前长度i，但不超过w）
        for (let j = 1; j <= Math.min(w, i); j++) {
          // 如果当前长度i可以减去一个长度为j的棍子，并且dp[i-j]不是初始的Infinity
          if (i >= j && dp[i - j] !== Infinity) {
            // 更新dp[i]为dp[i-j]+1和当前dp[i]中的较小值
            // dp[i-j]+1表示使用一根新的原材料来制作长度为j的棍子
            dp[i] = Math.min(dp[i], dp[i - j] + 1)
          }
        }
      }

      // dp[totalLength]现在包含了制作所有棍子所需的最少原材料数量
      return dp[totalLength]
    },
    getSummaries(param) {
      const { columns } = param
      const sums = []
      let borders = []
      let panels = []
      this.tableData.forEach(row => {
        borders = borders.concat(new Array(2 * row['数量']).fill(Number(row['宽'])))
        borders = borders.concat(new Array(2 * row['数量']).fill(Number(row['高'])))
        panels = panels.concat(new Array(Number(row['数量'])).fill([Number(row['芯板宽']), Number(row['芯板高'])]))
      })
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        // const values = data.map(item => Number(item[column.property]))
        if (index === 13) {
          sums[index] = this.getBorderCount(borders)
        } else if (index === 11) {
          sums[index] = this.getPanelCount(panels)
        } else {
          sums[index] = ''
        }
      })

      return sums
    },
    handlePanelSizeChange() {
      this.tableData = [...this.tableData]
    },
    handleBorderLengthChange() {
      this.tableData = [...this.tableData]
    },
    handleBorderSizeChange(value) {
      const selectBorderItem = this.borderSizeOptions.find((item) => { return item.value === this.selectBorderSize })
      this.tableData.forEach(item => {
        item['边框规格'] = selectBorderItem.width
        item['芯板高'] = item['高'] - selectBorderItem.width
        item['芯板宽'] = item['宽'] - selectBorderItem.width
      })
      this.tableData = [...this.tableData]
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    },
    handleDownload() {
      this.downloadLoading = true
      let borders = []
      let panels = []
      this.tableData.forEach(row => {
        borders = borders.concat(new Array(2 * row['数量']).fill(Number(row['宽'])))
        borders = borders.concat(new Array(2 * row['数量']).fill(Number(row['高'])))
        panels = panels.concat(new Array(Number(row['数量'])).fill([Number(row['芯板宽']), Number(row['芯板高'])]))
      })
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['序号', '高', '宽', '数量', '开孔', '颜色', '备注', '面积', '芯板规格', '芯板宽', '芯板高', '芯板数量', '边框规格', '边框条数']
        const filterVal = ['序号', '高', '宽', '数量', '开孔', '颜色', '备注', '面积', '芯板规格', '芯板宽', '芯板高', '芯板数量', '边框规格', '边框条数']
        const sum = {}
        tHeader.forEach((item, index) => {
          if (index === 0) {
            sum[item] = '合计'
          } else if (index === 13) {
            sum[item] = this.getBorderCount(borders)
          } else if (index === 11) {
            sum[item] = this.getPanelCount(panels)
          }
        })
        const tableData = JSON.parse(JSON.stringify(this.tableData))
        tableData.push(sum)
        const data = this.formatJson(filterVal, tableData)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
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
<style>
.upload-excel-header {
  display: flex;
  gap: 20px;

  label {
    margin-right: 10px;
    font-weight: normal;
  }
}
#table-container{
  padding: 8px;
  width: fit-content;
}
</style>
