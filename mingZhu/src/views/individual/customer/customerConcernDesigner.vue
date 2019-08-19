<template>
  <mdb-container>
    <mdb-row v-if="designerDetail.length==0">
      <mdb-col class="text-center">
          <p class="h2" style="color:#999;">您还没有关注任何建筑师</p>
          <div>
            <mdb-btn color="primary" @click="go()">查找建筑师</mdb-btn>
          </div>
      </mdb-col>
    </mdb-row>
    <mdb-row v-else class="justify-content-md-center">
      <mdb-col md="10" v-for="(item,index1) in designerDetail" :key="index1" class="right-pic">
        <mdb-row class="w-100">
          <mdb-col md="4" class style="position: relative;height: 13rem">
            <img
              src="@/assets/images/mingzhujianzhu.jpg"
              alt
              style="width:100%;height: 100%"
              class="pic-swirter"
              v-if="item.desginerCaseList.length==0"
            >
            <img
              :src="pictureUrls[index1]"
              alt
              style="width:100%;height: 100%"
              class="pic-swirter"
              v-else
            >
            <div
              @click="checkDetails(listItem.id)"
              :style="{width:item.desginerCaseList.length>0 ? 100/item.desginerCaseList.length + '%' : '100%'}"
              v-for="(listItem,index) in item.desginerCaseList"
              :key="listItem.id"
              class="opcityDiv"
              @mouseover="designerListChild(item, listItem,index1,index)"
            ></div>
          </mdb-col>
          <mdb-col md="8" style="poaition:relative;">
            <mdb-row>
              <mdb-col md="3" style="padding-right:0;padding-left:0;">
                <div class="headPhoto">
                  <img :src="item.head">
                </div>
              </mdb-col>
              <mdb-col md="4">
                <p
                  style="cursor:pointer;"
                  class="designerName"
                  @click="designerDetails(item)"
                >{{item.designerSerial}}</p>
                <div class="city">
                  <span>{{item.description1}}</span>
                </div>
                <p class="describe">{{item.description2}}</p>
                <p class="hotTags">{{item.description3}}</p>

                <p class="clearfix infoIcon">
                  <span class="attentionNum">
                    关注
                    <span>{{item.attention}}</span>
                  </span>
                  <span class="line">|</span>
                  <span class="projectNum">
                    已完成项目
                    <span>{{item.cooperativeProject}}</span>
                  </span>
                </p>
              </mdb-col>
              <mdb-col md="4">
                <div class="btnTeam">
                  <div class="addConcern" @click="addConcern(item)">
                    <img src="@/assets/images/attentionBtn.png" v-if="item.concernStatus==0">
                    <img src="@/assets/images/attentedBtn.png" v-else-if="item.concernStatus==1">
                  </div>
                  <div class="sendInvite" @click="saveInviteList(item)">
                    <img src="@/assets/images/sendInvite.png">
                  </div>
                </div>
              </mdb-col>
            </mdb-row>
          </mdb-col>
        </mdb-row>
      </mdb-col>
    </mdb-row>
    <mdb-row  v-if="totalCount!=0">
      <mdb-col md="12">
        <pagination
          :total="totalCount"
          :pageSize="pageSize"
          @changePage="handleCurrentChange"
          v-if="totalCount !=0"
        ></pagination>
      </mdb-col>
    </mdb-row>
    <div class="invite-dialog">
      <el-dialog title="项目列表" :visible.sync="centerDialogVisible" width="30%" center>
        <span>
          <el-checkbox-group v-model="projectId" :max="1">
            <el-checkbox
              v-for="item in projectList"
              :key="item.projectId"
              :true-label="item.projectId"
              false-label
              :checked="item.checked"
              @change="getProjectId(item.id,item.projectId)"
            >{{item.projectName}}</el-checkbox>
          </el-checkbox-group>
        </span>
      </el-dialog>
    </div>
  </mdb-container>
  <!-- <div class="p-body" v-loading="loading">
    <div class="body-detail">
      <div v-if="designerDetail.length==0" class="no-designer">
        <div>您还没有关注任何建筑师</div>
        <div>
          <mdb-btn color="primary" @click="go()">查找建筑师</mdb-btn>
        </div>
      </div>
      <div class="listMenu">
        <mdb-row v-for="(item,index1) in designerDetail" :key="index1" class="right-pic">
          <mdb-col col="4" class style="position: relative;height: 13rem">
            <img
              src="@/assets/images/mingzhujianzhu.jpg"
              alt
              style="width:100%;height: 100%"
              class="pic-swirter"
              v-if="item.desginerCaseList.length==0"
            >
            <img
              :src="pictureUrls[index1]"
              alt
              style="width:100%;height: 100%"
              class="pic-swirter"
              v-else
            >
            <div
              @click="checkDetails(listItem.id)"
              :style="{width:item.desginerCaseList.length>0 ? 100/item.desginerCaseList.length + '%' : '100%'}"
              v-for="(listItem,index) in item.desginerCaseList"
              :key="listItem.id"
              class="opcityDiv"
              @mouseover="designerListChild(item, listItem,index1,index)"
            ></div>
          </mdb-col>
          <mdb-col col="8" style="poaition:relative;">
            <mdb-row>
              <mdb-col col="3" style="padding-right:0;padding-left:0;">
                <div class="headPhoto">
                  <img :src="item.head">
                </div>
              </mdb-col>
              <mdb-col col="8">
                <p
                  style="cursor:pointer;"
                  class="designerName"
                  @click="designerDetails(item)"
                >{{item.designerSerial}}</p>
                <div class="city">
                  <span>{{item.description1}}</span>
                </div>
                <p class="describe">{{item.description2}}</p>
                <p class="hotTags">{{item.description3}}</p>

                <p class="clearfix infoIcon">
                  <span class="attentionNum">
                    关注
                    <span>{{item.attention}}</span>
                  </span>
                  <span class="line">|</span>
                  <span class="projectNum">
                    已完成项目
                    <span>{{item.cooperativeProject}}</span>
                  </span>
                </p>
              </mdb-col>
            </mdb-row>
            <div class="btnTeam">
              <div class="addConcern" @click="addConcern(item)">
                <img src="@/assets/images/attentionBtn.png" v-if="item.concernStatus==0">
                <img src="@/assets/images/attentedBtn.png" v-else-if="item.concernStatus==1">
              </div>
              <div class="sendInvite" @click="saveInviteList(item)">
                <img src="@/assets/images/sendInvite.png">
              </div>
            </div>
          </mdb-col>
        </mdb-row>
      </div>
    </div>
    <div class="block" v-if="totalCount!=0">
      <pagination
        :total="totalCount"
        :pageSize="pageSize"
        @changePage="handleCurrentChange"
        v-if="totalCount !=0"
      ></pagination>
    </div>
    <div class="invite-dialog">
      <el-dialog title="项目列表" :visible.sync="centerDialogVisible" width="30%" center>
        <span>
          <el-checkbox-group v-model="projectId" :max="1">
            <el-checkbox
              v-for="item in projectList"
              :key="item.projectId"
              :true-label="item.projectId"
              false-label
              :checked="item.checked"
              @change="getProjectId(item.id,item.projectId)"
            >{{item.projectName}}</el-checkbox>
          </el-checkbox-group>
        </span>
      </el-dialog>
    </div>
  </div> -->
</template>
<script>
export default {
  data() {
    return {
      pictureUrls: [],
      loading: false,
      activeName: "first",
      isInvited: "N",
      centerDialogVisible: false,
      projectList: [],
      projectId: "",
      pageSize: 6,
      designerDetail: [],
      currentPage: 1,
      totalCount: 0,
      seniorInfo: {
        page: 1,
        pageSize: 6,
        bossId: "",
        projectId: ""
      }
    };
  },
  methods: {
    handleSizeChange(val) {
      if (val == undefined || val == 0) {
        this.pageSize = 6;
      } else {
        this.pageSize = val;
      }
      this.seniorInfo.pageSize = this.pageSize;
      this.getdesignerList();
    },
    handleCurrentChange(val) {
      if (val == null || val == 0) {
        this.currentPage = 1;
      } else {
        this.currentPage = val;
      }
      this.seniorInfo.page = this.currentPage;
      this.getdesignerList();
    },
    saveInviteList(item) {
      let id = item.id;
      if (this.seniorInfo.projectId == null) {
        this.getProjectArr(id);
        this.isInvited = "N";
      } else {
        this.invited(id);
      }
    },
    invited(id) {
      this.api
        .saveInviteList({
          designerId: id,
          projectId: this.seniorInfo.projectId
        })
        .then(res => {
          if (res.code == 0 || res.code == 1) {
            this.$message(res.msg);
          } else {
            this.$message(res.msg);
          }
        });
      if (this.$route.query.id == null) {
        this.seniorInfo.projectId = null;
      }
    },
    getProjectArr(id) {
      this.projectId = null;
      this.api.goingProject({ bossId: this.seniorInfo.bossId }).then(res => {
        if (res.projectList.length == 0) {
          this.$confirm("未查找到进行中的项目, 是否需要发布项目?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            center: true
          }).then(() => {
            this.$router.push({ path: "/CommissionedDesign" });
          });
        } else {
          let _arr = res.projectList;
          _arr.forEach(function(item) {
            item.checked = false;
            item.id = id;
          });
          this.projectList = _arr;
          this.centerDialogVisible = true;
        }
      });
    },
    getProjectId(id, val,item) {
      this.seniorInfo.projectId = val;
      this.invited(id);
    },
    handleClick(tab, event) {
    },
    go() {
      const { href } = this.$router.resolve({
        path: "/SearchDesigners"
      });
      window.open(href, "_blank");
    },
    seniorDetails(item) {
      let designerId = item.id;
      const { href } = this.$router.resolve({
        path: "/DesignerDetails",
        query: {
          designerId: designerId
        }
      });
      window.open(href, "_blank");
    },
    designerDetails(item) {
      let designerId = item.id;
      const { href } = this.$router.resolve({
        path: "/seniorDesignerDetails",
        query: {
          id: designerId
        }
      });
      window.open(href, "_blank");
    },
    addConcern(item) {
      if (item.concernStatus == 0) {
        this.api
          .concernDesigner({
            bossID: this.$store.state.user.id,
            designerID: item.id
          })
          .then(res => {
            if (res.code == 0) {
              this.$message(res.msg);
              item.concernStatus = 1;
            } else {
              this.$message(res.msg);
              item.concernStatus = 0;
            }
          });
      } else {
        this.api
          .cancelConcernDesigner({
            bossID: this.$store.state.user.id,
            designerID: item.id
          })
          .then(res => {
            if (res.code == 0) {
              this.$message(res.msg);
              item.concernStatus = 0;
            } else {
              this.$message(res.msg);
            }
          });
      }
    },
    getdesignerList() {
      this.loading = true;
      this.api
        .designerList({
          page: this.seniorInfo.page,
          pageSize: this.seniorInfo.pageSize,
          projectId: this.$route.query.id
        })
        .then(res => {
          console.log(res.data)
          this.designerDetail = res.data;
          this.totalCount = res.total;
          this.loading = false;

          this.pictureUrls = [];
          this.designerDetail.map(item => {
            if (item.desginerCaseList.length > 0) {
              this.pictureUrls.push(item.desginerCaseList[0].pictureUrls);
            }
          });
        });
    },
    getParams() {
      this.seniorInfo.projectId = this.$route.query.id;
      if (this.seniorInfo.projectId == null) {
        this.isInvited = "N";
      }
      let type = sessionStorage.getItem("loginType");
      if (type == null) {
        this.seniorInfo.bossId = this.$store.state.user.id;
      } else {
        this.seniorInfo.bossId =
          type == 1
            ? localStorage.getItem("userId")
            : sessionStorage.getItem("userId");
      }
    }
  },
  mounted() {
    this.getParams();
    this.getdesignerList();
  }
};
</script>
<style lang="less" scoped>
// @media only screen and (min-width: 1600px) {
//   .body-detail{
//    max-width:1200px;
//    margin:1.25rem auto !important;
//   }
//   }

.p-body {
  background-color: #f6f6f6;
  overflow: hidden;
  text-align: left;
  .row {
    margin-right: 0;
    margin-left: 0;
  }
}
.body-detail {
  overflow: hidden;
  margin: 1.25rem 10%;
  min-height: 31.25rem;
}
.headPhoto {
  height: 5.625rem;
  width: 5.625rem;
  overflow: hidden;
  border-radius: 100px;
  -webkit-border-radius: 100px;
  -moz-border-radius: 100px;
  img {
    width: 100%;
    min-height: 100%;
  }
}
.right-pic {
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  display: flex;
}

.btnTeam {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 1rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
}
.addConcern {
  margin-right: 1rem;
}

.no-designer {
  text-align: center;
  font-size: 2.5rem;
  color: #999999;
}
.seniorInfo {
  height: 29.375rem;
  position: relative;
  background: #fff;
  margin-top: 0.625rem;
  // .headImg {
  //   cursor: pointer;
  //   width: 100%;
  //   height: 20rem;
  //   overflow: hidden;
  //   img {
  //     height: 100%;
  //     width: 100%;
  //   }
  // }
  .btnTeam {
    position: absolute;
    text-align: right;
    display: flex;
    right: 1.25rem;
    z-index: 1;
    cursor: pointer;
    .sendInvite,
    .attentionImme {
      padding: 0.625rem;
      overflow: hidden;
      height: 1.5rem;
    }
  }
}
.seniorInfo:hover {
  box-shadow: 0 0 0.9375rem rgba(45, 50, 55, 0.3);
  -webkit-transform: translateY(-0.3125rem);
  -moz-transform: translateY(-0.25rem);
  -ms-transform: translateY(-0.25rem);
  -o-transform: translateY(-0.25rem);
  transform: translateY(-0.25rem);
}
.itemDetails {
  margin: 0.625rem;
  .itemTag,
  .itemName {
    height: 1.25rem;
    font: bold 0.875rem/1.25rem "PingFangHK-Medium";
    color: #333333;
    margin-bottom: 0.3125rem;
  }
  .itemName {
    cursor: pointer;
  }
  .itemTag {
    font-weight: normal;
    font-size: 0.875rem;
    height: 2.5rem;
  }
  .praiseNum,
  .address {
    height: 1.25rem;
    font: 0.75rem/1.25rem "PingFangHK-Regular";
    color: #999999;
  }
  .praiseNum {
    margin-top: 0.625rem;
    height: 1.5rem;
    line-height: 1.5rem;
    a {
      outline: none;
      color: #999999;
      font: bold 0.75rem/1.5rem "PingFangHK-Regular";
      text-decoration: none;
    }
  }
}
.block {
  width: 100%;
  margin-top: 3.75rem;
  text-align: center;
}
.edit-button {
  margin: 2.5rem auto;
  border: 0px;
  background-image: linear-gradient(-90deg, #f3daa4 6%, #f2cd89 98%);
  border-radius: 2.25rem;
  padding: 0.75rem 1.875rem;
}
</style>