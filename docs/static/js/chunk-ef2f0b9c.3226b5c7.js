(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ef2f0b9c"],{1736:function(e,t,a){},"5fb3":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",[a("el-button",{staticStyle:{margin:"0 0 20px 20px"},attrs:{loading:e.downloadLoading,type:"primary",icon:"el-icon-document"},on:{click:e.handleAddData}},[e._v(" 添加数据 ")]),a("el-button",{staticStyle:{margin:"0 0 20px 20px"},attrs:{loading:e.downloadLoading,type:"primary",icon:"el-icon-document"},on:{click:function(t){e.fileNameDialogVisible=!0}}},[e._v(" 导出表单 ")]),a("el-button",{staticStyle:{margin:"0 0 20px 20px"},attrs:{loading:e.downloadLoading,type:"primary",icon:"el-icon-document"},on:{click:e.handleExportImage}},[e._v(" 导出图片 ")])],1),a("div",{attrs:{id:"table-container"}},[a("div",{staticClass:"table-header"},[a("div",{staticClass:"table-header-title"},[e._v("科琳包覆门板厂报价表")]),a("div",{staticClass:"table-header-user"},[a("div",{staticClass:"table-header-user-item table-header-user-name"},[a("label",[e._v("客户：")]),a("el-input",{model:{value:e.orderForm.name,callback:function(t){e.$set(e.orderForm,"name",t)},expression:"orderForm.name"}})],1),a("div",{staticClass:"table-header-user-item table-header-user-address"},[a("label",[e._v("安装地址：")]),a("el-input",{model:{value:e.orderForm.address,callback:function(t){e.$set(e.orderForm,"address",t)},expression:"orderForm.address"}})],1),a("div",{staticClass:"table-header-user-item table-header-user-data"},[a("label",[e._v("日期：")]),a("el-input",{model:{value:e.orderForm.data,callback:function(t){e.$set(e.orderForm,"data",t)},expression:"orderForm.data"}})],1)])]),a("el-table",{style:{width:e.exportImagedialogVisible?"1160px":"1340px"},attrs:{id:"table-wrap",data:e.tableData,"header-row-class-name":e.headerClass,"show-summary":"","sum-text":"合计","summary-method":e.getSummaries,border:""}},[a("el-table-column",{attrs:{prop:"id",label:"序号",width:"140"}}),a("el-table-column",{attrs:{prop:"height",label:"高",width:"80"}}),a("el-table-column",{attrs:{prop:"width",label:"宽",width:"80"}}),a("el-table-column",{attrs:{prop:"count",label:"数量",width:"80"}}),a("el-table-column",{attrs:{prop:"notch",label:"开孔",width:"80"}}),a("el-table-column",{attrs:{prop:"color",label:"色号",width:"80"}}),a("el-table-column",{attrs:{prop:"remark",label:"备注",width:"200"}}),a("el-table-column",{attrs:{prop:"area",label:"面积",width:"120"}}),a("el-table-column",{attrs:{prop:"perPrice",label:"单价",width:"120"}}),a("el-table-column",{attrs:{prop:"totalPrice",label:"总价",width:"180"}}),e.loadingImage?e._e():a("el-table-column",{attrs:{label:"操作",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"danger"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")]),a("el-button",{attrs:{type:"primary"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")])]}}],null,!1,2289075493)})],1),a("h2",[e._v("咨询电话：13080608058")])],1),a("el-dialog",{attrs:{title:"提示",visible:e.dialogVisible,width:"50%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{ref:"form",attrs:{model:e.form,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"高/mm"}},[a("el-input",{attrs:{type:"number"},model:{value:e.form.height,callback:function(t){e.$set(e.form,"height",t)},expression:"form.height"}})],1),a("el-form-item",{attrs:{label:"宽/mm"}},[a("el-input",{attrs:{type:"number"},model:{value:e.form.width,callback:function(t){e.$set(e.form,"width",t)},expression:"form.width"}})],1),a("el-form-item",{attrs:{label:"数量"}},[a("el-input",{attrs:{type:"number"},model:{value:e.form.count,callback:function(t){e.$set(e.form,"count",t)},expression:"form.count"}})],1),a("el-form-item",{attrs:{label:"开孔"}},[a("el-input",{model:{value:e.form.notch,callback:function(t){e.$set(e.form,"notch",t)},expression:"form.notch"}})],1),a("el-form-item",{attrs:{label:"颜色"}},[a("el-input",{model:{value:e.form.color,callback:function(t){e.$set(e.form,"color",t)},expression:"form.color"}})],1),a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{attrs:{type:"textarea"},model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1),a("el-form-item",{attrs:{label:"面积"}},[e._v(" "+e._s(e.getPanelArea())+"m² ")]),a("el-form-item",{attrs:{label:"单价"}},[a("el-input",{model:{value:e.form.perPrice,callback:function(t){e.$set(e.form,"perPrice",t)},expression:"form.perPrice"}})],1),a("el-form-item",{attrs:{label:"总价"}},[e._v(" "+e._s(e.getTotalPrice())+" ")]),a("el-form-item",["add"===e.editType?a("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("立即添加")]):e._e(),"edit"===e.editType?a("el-button",{attrs:{type:"primary"},on:{click:e.handleUpdate}},[e._v("更新")]):e._e(),a("el-button",{on:{click:e.handleClose}},[e._v("取消")])],1)],1)],1),a("el-dialog",{attrs:{title:"请输入导出表单文件名",visible:e.fileNameDialogVisible,width:"30%"},on:{"update:visible":function(t){e.fileNameDialogVisible=t}}},[a("el-input",{model:{value:e.filename,callback:function(t){e.filename=t},expression:"filename"}}),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.handleDownload}},[e._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"请输入导出表单文件名",visible:e.exportImagedialogVisible,width:"30%","before-close":e.handleCancelDownImage},on:{"update:visible":function(t){e.exportImagedialogVisible=t}}},[a("el-input",{model:{value:e.filename,callback:function(t){e.filename=t},expression:"filename"}}),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.handleCancelDownImage}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.handleDownloadImage}},[e._v("确 定")])],1)],1)],1)},o=[],l=(a("d81d"),a("14d9"),a("a434"),a("e9c4"),a("a9e3"),a("b680"),a("b64b"),a("d3b7"),a("ac1f"),a("3ca3"),a("5319"),a("159b"),a("ddb0"),a("ed08")),r=a("c0e9"),n=a.n(r),s={name:"ExportExcel",components:{},data:function(){return{list:null,listLoading:!0,downloadLoading:!1,filename:"",autoWidth:!0,bookType:"xlsx",tableData:[],dialogVisible:!1,orderForm:{name:"",address:"",data:""},form:{height:"",width:"",count:"",notch:"",color:"",remark:"",area:"",perPrice:"",totalPrice:""},editType:"add",ediIndex:0,fileNameDialogVisible:!1,loadingImage:!1,exportImagedialogVisible:!1}},methods:{getSummaries:function(e){console.log(11111);var t=e.columns,a=[],i=0;return this.tableData.forEach((function(e){i+=Number(e.totalPrice)})),t.forEach((function(e,t){a[t]=0!==t?9===t?"总价："+i:"":"合计"})),a},headerClass:function(e){e.row;var t=e.rowIndex;if(0===t)return"table_header"},handleDownload:function(){var e=this;this.downloadLoading=!0,Promise.all([a.e("chunk-f26f461a"),a.e("chunk-61b10379"),a.e("chunk-2133cd4f")]).then(a.bind(null,"4bf8")).then((function(t){var a=["序号","高","宽","数量","开孔","颜色","备注","面积","单价","总价"],i=["id","height","width","count","notch","color","remark","area","perPrice","totalPrice"],o=e.tableData,l=e.formatJson(i,o);t.export_json_to_excel({header:a,data:l,filename:e.filename,autoWidth:e.autoWidth,bookType:e.bookType}),e.downloadLoading=!1,e.fileNameDialogVisible=!1}))},formatJson:function(e,t){return t.map((function(t){return e.map((function(e){return"timestamp"===e?Object(l["c"])(t[e]):t[e]}))}))},handleAddData:function(){this.editType="add",this.dialogVisible=!0},onSubmit:function(){this.form.id=this.tableData.length+1,this.tableData.push(JSON.parse(JSON.stringify(this.form))),this.dialogVisible=!1,this.form={height:"",width:"",count:"",notch:"",color:"",remark:"",area:"",perPrice:"",totalPrice:""}},handleDelete:function(e,t){this.tableData.splice(e,1)},handleClose:function(){this.dialogVisible=!1,this.form={height:"",width:"",count:"",notch:"",color:"",remark:"",area:"",perPrice:"",totalPrice:""}},handleEdit:function(e,t){this.editType="edit",this.ediIndex=e,this.dialogVisible=!0,this.form=t},handleUpdate:function(){this.tableData.splice(this.ediIndex,1,this.form),this.dialogVisible=!1,this.ediIndex=0,this.editType="add",this.form={height:"",width:"",count:"",notch:"",color:"",remark:"",area:"",perPrice:"",totalPrice:""}},getPanelArea:function(){if(!this.form.height||!this.form.width||!this.form.count)return 0;var e=this.form.height/1e3*(this.form.width/1e3),t=Math.round(e*this.form.count*100)/100;return this.form.area=t,t},getTotalPrice:function(){if(!this.form.area||!this.form.perPrice)return 0;var e=(this.form.area*this.form.perPrice).toFixed(2);return this.form.totalPrice=e,e},handleExportImage:function(){this.loadingImage=!0,this.exportImagedialogVisible=!0,this.$forceUpdate()},handleCancelDownImage:function(){this.loadingImage=!1,this.exportImagedialogVisible=!1,this.$forceUpdate()},handleDownloadImage:function(){var e=this;n()(document.getElementById("table-container")).then((function(t){var a=document.createElement("a");a.href=t.toDataURL("image/png").replace("image/png","image/octet-stream"),a.download=e.filename+".png",a.click(),e.loadingImage=!1,e.exportImagedialogVisible=!1}))}}},d=s,c=(a("e7d0"),a("2877")),m=Object(c["a"])(d,i,o,!1,null,null,null);t["default"]=m.exports},e7d0:function(e,t,a){"use strict";a("1736")}}]);