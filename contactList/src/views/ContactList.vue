<template>
  <div id="contactList">
    <!-- 联系人列表 -->
    <van-contact-list :list="list" @add="onAdd" @edit="onEdit" />
    <van-popup v-model="showEdit" position="bottom" :style="{height:'100%'}" closeable>
      <van-contact-edit
        :contact-info="editingContact"
        :is-edit="isEdit"
        @save="onSave"
        @delete="onDelete"
      />
    </van-popup>
  </div>
</template>

<script>
// 引入vant组件
import { ContactList, Toast, ContactEdit, Popup } from "vant";
import axios from "axios";

export default {
  name: "contactList",
  components: {
    [ContactList.name]: ContactList,
    [ContactEdit.name]: ContactEdit,
    [Popup.name]: Popup
  },

  data() {
    /*
    {
      id:0,
      name:'张三',
      tel:''
    }
    */

    return {
      list: [],
      instance: null, //axios实例
      showEdit: false, //弹窗的显示隐藏
      editingContact: {}, //正在编辑的联系人数据
      isEdit: false
    };
  },

  created() {
    // 创建axios实例
    this.instance = axios.create({
      baseURL: "http://localhost:9000/api",
      timeout: 1000
    });
    // 获取接口数据
    // 封装成方法，方便调用
    // this.instance
    //   .get("/contactList")
    //   .then(res => {
    //     this.list = res.data.data;
    //   })
    //   .catch(err => {
    //     // console.log(err);
    //     Toast("请求失败，请稍后重试");
    //   });
    this.getList();
  },

  methods: {
    // 获取联系人列表
    getList() {
      this.instance
        .get("/contactList")
        .then(res => {
          this.list = res.data.data;
        })
        .catch(err => {
          // console.log(err);
          Toast("请求失败，请稍后重试");
        });
    },
    // 添加联系人
    onAdd() {
      this.showEdit = true;
    },
    // 编辑联系人
    onEdit(info) {
      this.isEdit = true;
      this.showEdit = true;
      this.editingContact = info; //将修改联系人信息添加到修改弹窗中
    },
    // 保存编辑
    // info为正在编辑的对象
    onSave(info) {
      if (this.isEdit) {
        // 编辑保存
        this.instance
          .put("/contact/edit", info)
          .then(res => {
            if (res.data.code === 200) {
              Toast("编辑成功");
              this.showEdit = false;
              this.getList();
            }
          })
          .catch(() => {});
      } else {
        // 新建保存
        this.instance
          .post("/contact/new/json", info)
          .then(res => {
            if (res.data.code === 200) {
              Toast("新建成功");
              this.showEdit = false;
              this.getList();
            }
          })
          .catch(() => {});
      }
      this.isEdit = false;
    },
    // 删除联系人
    onDelete(info) {
      this.instance
        .delete("/contact", {
          params: {
            id: info.id
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            Toast("删除成功");
            this.showEdit = false;
            this.getList();
          }
        })
        .catch(() => {});
    }
  }
};
</script>
