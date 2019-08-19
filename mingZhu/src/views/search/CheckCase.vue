<template>
  <mdb-container class="checkCase pt-5" fluid v-loading.fullscreen.lock="fullscreenLoading">
    <mdb-row class="mdb-search mt-3 mb-4">
      <mdb-col col="2"></mdb-col>
      <mdb-col col="6" class="px-0" style="margin-left:-0.625rem;">
        <div class="grid-content bg-purple searchBox" style="margin-top:2rem !important;">
          <i class="el-icon-search"></i>
          <input type="text" name="uname" placeholder="输入您想搜的内容" v-model="caseForm.caseName"
            onfocus="this.placeholder=''" onblur="this.placeholder='输入您想搜的内容' ">
        </div>
      </mdb-col>
      <mdb-col col="2">
        <div class="submit" @click="search()">搜索</div>
      </mdb-col>
      <mdb-col col="2"></mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col col="1"></mdb-col>
      <mdb-col col="10">
        <div class="select-conditions" v-if="conditions != null">
          <ul>
            <li v-for="item in conditions" :label="item.name" :key="item.value">
              <button @click="close(item)">
                <i class="el-icon-close"></i>
              </button>
              <a>{{item.name}}</a>
            </li>
          </ul>
        </div>
      </mdb-col>
      <mdb-col col="1"></mdb-col>
    </mdb-row>
    <!-- <mdb-row>
        <mdb-col col="1"></mdb-col>
        <mdb-col  col="10"></mdb-col>
        <mdb-col col="1"></mdb-col>
      </mdb-row> -->
    <mdb-row>
      <mdb-col lg="2" class="mb-4">
        <div class="card">
          <mdb-row>
            <mdb-col lg="12" md="3" col="6">
              <p class="title text-left" style="font-size:0.875rem;">建筑类型</p>
              <div class="left-filter">
                <mdb-container v-if="buildingTypeList.length>0" class="px-0">
                  <mdb-select btnSavePlaceholder="确认" class="text-left my-0" multiple
                    @getValue="getTypeSelectBuildingType" :options="buildingTypeList" />
                  <label></label>
                </mdb-container>
              </div>
            </mdb-col>
            <mdb-col lg="12" md="3" col="6">
              <p class="title text-left" style="font-size:0.875rem;">建筑规模</p>
              <div class="left-filter">
                <div class="form-check pl-0" v-for="item in scaleList" :key="item.id">
                  <input type="radio" class="form-check-input" :value="item.value" name="scale"
                    :checked="architecturalScaleChecked" :id="`${item.text}`+5" v-model="architecturalScaleChecked">
                  <label class="form-check-label" :for="`${item.text}`+5">{{item.text}}</label>
                </div>
              </div>
            </mdb-col>
            <mdb-col lg="12" md="3" col="6">
              <p class="title text-left" style="font-size:0.875rem;">建筑地点</p>
              <div class="left-filter">
                <mdb-container v-if="workplaceList.length>0" class="px-0">
                  <mdb-select btnSavePlaceholder="确认" class="text-left my-0" multiple @getValue="getTypeSelectWorkplace"
                    :options="workplaceList" />
                  <label></label>
                </mdb-container>
              </div>
            </mdb-col>
            <mdb-col lg="12" md="3" col="6">
              <p class="title text-left" style="font-size:0.875rem;">热门标签</p>
              <div class="left-filter">
                <mdb-container v-if="hotTagList.length>0" class="px-0">
                  <mdb-select btnSavePlaceholder="确认" class="text-left my-0" multiple @getValue="getTypeSelectHotTag"
                    :options="hotTagList" />
                  <label></label>
                </mdb-container>
              </div>
            </mdb-col>
          </mdb-row>
        </div>
      </mdb-col>
      <mdb-col lg="10" class="card">
        <div class="listMenu">
          <section class="section text-center minHeight">
            <div class="row pt-3 text-center" v-if="allList.length > 0">
              <div class="col-md-6 mb-4" v-for="(item,index) of allList" :key="item.id">
                <div class="img-wrap ripple-parent waves-effect waves-light" @click="caseDetail($event, item.id)"
                  style="height:22.513rem;overflow:hidden;"
                  :style="{backgroundImage: 'url(' + item.pictureUrls + ')', backgroundSize:'cover'}">
                </div>
                <h6 class="mb-3 mt-3 font-weight-bold">
                  <span class="teal-text text-center text-uppercase font-small">{{item.designerSerial}}</span>
                  <span class="grey-text font-small"> - {{item.finishTime}}</span>
                </h6>
                <div class="mb-3">
                  <h4 class="title">{{item.caseName}}</h4>
                </div>
                <p class="text-justify description">{{item.caseDetail}}</p>
                <hr class="pb-0 mb-0">
                <a class="nav-link backTipParent" @mouseover="hoverIndex = index" @mouseout="hoverIndex = -1">
                  <mdb-icon far icon="thumbs-up" @click.native='praise(item)' v-show='item.praisedStatus==0' />
                  <mdb-icon icon="thumbs-up" @click.native='cancelPraise(item)' v-show='item.praisedStatus==1' />
                  <small>{{item.showNumber}}</small>
                  <div class="backTip2" v-if="hoverIndex == index">点赞</div>
                </a>
                <a class="nav-link backTipParent" @mouseover="shareHoverIndex = index" @mouseout="shareHoverIndex = -1">
                  <mdb-icon v-show="item.concernState == 0" @click.native="cancelConcernCase(item)" far icon="heart">
                  </mdb-icon>
                  <mdb-icon v-show="item.concernState == 1" @click.native="cancelConcernCase(item)" icon="heart"
                    style="color:red;"></mdb-icon>
                  <div class="backTip" v-if="shareHoverIndex == index">关注</div>
                </a>
                <hr class="pb-0 mt-0">
              </div>
            </div>
            <div class="row pt-5 pl-5 text-center no-case" v-else>
              <div>暂无符合要求的项目作品请更换搜索条件重试</div>
            </div>
          </section>
        </div>
      </mdb-col>
    </mdb-row>
    <mdb-row v-if="totalCount !=0">
      <mdb-col col="12">
        <!-- <div class="custom-pagination"> -->
        <pagination :total="totalCount" :pageSize="pageSize" @changePage="handleCurrentChange" v-if="totalCount !=0">
        </pagination>
        <!-- </div> -->
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>

<script>
  import { waves } from "mdbvue";
  export default {
    mixins: [waves],
    data() {
      return {
        architecturalScaleChecked: null,
        hoverIndex: -1,
        shareHoverIndex: -1,
        checked: false,
        fullscreenLoading: false,
        parentidList: [],
        scaleList: [],
        workplaceList: [],
        buildingTypeList: [],
        hotTagList: [],
        conditions: [],
        caseForm: {
          buildingType: [],
          architecturalScale: null,
          constructionSite: [],
          caseType: [],
          hotLabel: [],
          page: 1,
          pageSize: 12,
          bossId: "",
          caseName: []
        },
        pageSize: 12,
        currentPage: 1,
        totalCount: 0,
        allList: [],
        projectId: ""
      };
    },
    methods: {
      praise(item) {
        // 点赞
        this.api.getAddPraise({
          id: item.id
        }).then(res => {
          if (res.code == 0) {
            item.showNumber += 1
            item.praisedStatus = 1
            this.$message(res.msg)
          } else {
            this.$message(res.msg)
          }
        })
      },
      // 取消点赞
      cancelPraise(item) {
        this.api.cancelAddPraise({
          id: item.id
        }).then(res => {
          if (res.code == 0) {
            item.showNumber -= 1
            item.praisedStatus = 0
            this.$message(res.msg)
          } else {
            this.$message(res.msg)
          }
        })
      },
      //建筑类型
      getTypeSelectBuildingType(value) {
        this.caseForm.buildingType = value
        let _this = this
        if (document.getElementsByClassName('btn-save')[0]) {
          document.getElementsByClassName('btn-save')[0].addEventListener('click', function () {
            _this.caseForm.pageNumber = 1;
            _this.getCaseList(_this.caseForm);
          }, false)
        }
      },
      //建筑地点
      getTypeSelectWorkplace(value) {
        this.caseForm.constructionSite = value
        let _this = this
        if (document.getElementsByClassName('btn-save')[0]) {
          document.getElementsByClassName('btn-save')[0].addEventListener('click', function () {
            _this.caseForm.pageNumber = 1;
            _this.getCaseList(_this.caseForm);
          }, false)
        }
      },
      //热门标签
      getTypeSelectHotTag(value) {
        this.caseForm.hotLabel = value
        let _this = this
        if (document.getElementsByClassName('btn-save')[0]) {
          document.getElementsByClassName('btn-save')[0].addEventListener('click', function () {
            _this.caseForm.pageNumber = 1;
            _this.getCaseList(_this.caseForm);
          }, false)
        }
      },
      getTypeList() {
        this.api.buildingType("building_type").then(res => {
          // 建筑类型
          this.buildingTypeList = res.data;
          this.buildingTypeList.map(item => {
            item.text = item.name
            item.value = item.name
          })
          this.buildingTypeList.unshift({ text: '不限', value: null, selected: true })
        }),
          //建筑地点
          this.api.buildingType("workplace").then(res => {
            this.workplaceList = res.data
            this.workplaceList.map(item => {
              item.text = item.name
              item.value = item.name
            })
            this.workplaceList.unshift({ text: '不限', value: null, selected: true })
          }),
          //建筑规模
          this.api.buildingType("arc_model_size").then(res => {
            this.scaleList = res.data;
            console.log(this.scaleList)
            this.scaleList.map(item => {
              item.text = item.name
              item.value = item.name
            })
            this.scaleList.unshift({ text: '不限', value: null, checked: true })
          });
        //热门标签
        this.api.buildingType("hotLabel").then(res => {
          this.hotTagList = res.data
          this.hotTagList.map(item => {
            item.text = item.name
            item.value = item.name
          })
          this.hotTagList.unshift({ text: '不限', value: null, selected: true })
        });
      },
      getType(item) {
        let hasChecked = false;
        for (var j = 0; j < this.conditions.length; j++) {
          if (this.conditions[j].name == item.name) {
            hasChecked = true;
            this.conditions.splice(j, 1);
          }
        }
        if (!hasChecked) {
          this.conditionsItem(item);
        }
        this.caseForm.pageNumber = 1;
        this.getCaseList(this.caseForm);
      },
      conditionsItem(item) {
        var conditionsObj = {};
        conditionsObj.name = item.name;
        conditionsObj.value = item.value;
        this.conditions.push(conditionsObj);
      },
      removeConditionsItem(item) {
        for (var j = 0; j < this.conditions.length; j++) {
          if (item.name == this.conditions[j].name) {
            var index1 = this.conditions.indexOf(this.conditions[j]);
            if (index1 > -1) {
              this.conditions.splice(index1, 1);
            }
          }
        }
      },
      close(item) {
        for (var i = 0; i < this.caseForm.buildingType.length; i++) {
          if (item.name == this.caseForm.buildingType[i]) {
            var index = this.caseForm.buildingType.indexOf(
              this.caseForm.buildingType[i]
            );
            if (index > -1) {
              this.caseForm.buildingType.splice(index, 1);
            }
          }
        }
        for (var i = 0; i < this.caseForm.architecturalScale.length; i++) {
          if (item.name == this.caseForm.architecturalScale[i]) {
            var index = this.caseForm.architecturalScale.indexOf(
              this.caseForm.architecturalScale[i]
            );
            if (index > -1) {
              this.caseForm.architecturalScale.splice(index, 1);
            }
          }
        }
        for (var i = 0; i < this.caseForm.constructionSite.length; i++) {
          if (item.name == this.caseForm.constructionSite[i]) {
            var index = this.caseForm.constructionSite.indexOf(
              this.caseForm.constructionSite[i]
            );
            if (index > -1) {
              this.caseForm.constructionSite.splice(index, 1);
            }
          }
        }
        for (var i = 0; i < this.caseForm.hotLabel.length; i++) {
          if (item.name == this.caseForm.hotLabel[i]) {
            var index = this.caseForm.hotLabel.indexOf(this.caseForm.hotLabel[i]);
            if (index > -1) {
              this.caseForm.hotLabel.splice(index, 1);
            }
          }
        }
        this.removeConditionsItem(item);
        this.getCaseList(this.caseForm);
      },
      caseDetail(e, id) {
        this.wave(e)
        setTimeout(() => {
          this.projectId = this.$route.query.id;
          const { href } = this.$router.resolve({
            path: "/CaseDetails",
            query: {
              caseId: id,
              projectId: this.projectId
            }
          });
          window.open(href, "_blank");
        }, 300)
      },
      cancelConcernCase(item) {
        let flag = item.concernState == 1 ? "0" : "1";
        if (item.concernState == 1) {
          this.api
            .cancelConcernCase({
              bossID: this.caseForm.bossId,
              caseID: item.id
            })
            .then(res => {
              if (res.code == 0) {
                item.concernState = flag;
                this.$message(res.msg)
              } else {
                this.$message(res.msg)
              }
            });
        } else {
          this.api
            .concernCase({
              bossID: this.caseForm.bossId,
              caseID: item.id
            })
            .then(res => {
              if (res.code == 0) {
                item.concernState = flag;
                this.$message(res.msg)
              } else {
                this.$message(res.msg)
              }
            });
        }
      },
      getCaseList(caseForm) {
        this.fullscreenLoading = true;
        let params = {
          buildingType: caseForm.buildingType ? caseForm.buildingType.toString() : "",
          architecturalScale: caseForm.architecturalScale ? caseForm.architecturalScale.toString() : "",
          constructionSite: caseForm.constructionSite ? caseForm.constructionSite.toString() : "",
          hotLabel: caseForm.hotLabel ? caseForm.hotLabel.toString() : "",
          caseType: caseForm.caseType ? caseForm.caseType.toString() : "",
          page: caseForm.page,
          pageSize: caseForm.pageSize,
          caseName: caseForm.caseName ? caseForm.caseName.toString() : "",
          bossId: caseForm.bossId
        };
        this.api.getCaseList(params).then(res => {
          this.totalCount = res.data.total;
          this.allList = res.data.listDesginerCase;
          this.fullscreenLoading = false;
        });
      },
      resetCaseList(formName) {
        (this.caseForm.pageSize = 12),
          (this.caseForm.currentPage = 1),
          (this.caseForm.buildingType = []),
          (this.caseForm.architecturalScale = []),
          (this.caseForm.constructionSite = []),
          (this.caseForm.caseType = []),
          (this.caseForm.hotLabel = []),
          (this.caseForm.caseName = []),
          this.getCaseList(this.caseForm);
        this.pageSize = 12;
        this.currentPage = 1;
        this.conditions = [];
      },
      handleSizeChange(val) {
        if (val == undefined || val == 0) {
          this.pageSize = 12;
        } else {
          this.pageSize = val;
        }
        this.caseForm.pageSize = this.pageSize;
        this.getCaseList(this.caseForm);
      },
      handleCurrentChange(val) {
        if (val == null || val == 0) {
          this.currentPage = 1;
        } else {
          this.currentPage = val;
        }
        this.caseForm.page = this.currentPage;
        this.getCaseList(this.caseForm);
      },
      search() {
        this.caseForm.page = 1
        this.getCaseList(this.caseForm);
      },
      getParams() {
        let type = sessionStorage.getItem("loginType");
        this.caseForm.bossId =
          type == 1
            ? localStorage.getItem("userId")
            : sessionStorage.getItem("userId");
      },
    },
    mounted() {
      this.caseForm.caseName = this.$route.query.case;
      this.search();
      this.getParams()
      this.getCaseList(this.caseForm);
      this.getTypeList();
    },
    watch: {
      architecturalScaleChecked(v) {
        this.architecturalScaleChecked = v;
        this.caseForm.architecturalScale = v;
        this.search()
      },
    }
  };
</script>

<style scoped lang="stylus">
  /* @media only screen and (min-width: 1600px) .checkCase max-width 1500px margin auto */
</style>
<style lang="less" scoped>
  @media (max-width: 750px) {
    .checkCase {
      .grid-content {
        .mdb-search {
          justify-content: center;

          .empty {
            display: none;
          }

          .mdb-search-right {
            padding-right: 0;
          }
        }
      }
    }
  }

  .checkCase {
    background-color: #f5f6f8
  }

  .card {
    background-color: #fff !important;
    border-radius: 0.1875rem;
    box-shadow: 0 0.0625rem 0.125rem 0 rgba(0, 0, 0, .25);
  }

  .left-filter {
    padding-right: 1rem;
    padding-left: 1.4rem;
    padding-bottom: 1.4rem;
    border-bottom: 1px solid #f1f1f1;

  }

  .left-filter:last-child {
    border: none;
  }

  .title {
    font-weight: 600;
    padding: 1rem;

  }

  .backTipParent {
    display: inline-block;
    position: relative;
  }

  .backTip {
    background: rgba(0, 0, 0);
    color: #fff;
    padding: 0.25rem;
    font-size: 0.75rem;
    border-radius: 0.1875rem;
    position: absolute;
    left: -50%;
    transform: translateX(70%);
    width: 2.5rem;
    display: inline;
    text-align: center;
    z-index: 10;
  }

  .backTip2 {
    background: rgba(0, 0, 0);
    color: #fff;
    padding: 0.25rem;
    font-size: 0.75rem;
    border-radius: 0.1875rem;
    position: absolute;
    left: -50%;
    transform: translateX(90%);
    width: 2.5rem;
    display: inline;
    text-align: center;
    z-index: 10;
  }

  .backTip:before,
  .backTip2:before {
    content: ' ';
    border-bottom: 0.3125rem solid rgba(0, 0, 0);
    border-left: 0.3125rem solid transparent;
    border-right: 0.3125rem solid transparent;
    position: absolute;
    top: -0.3125rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .description {
    font-size: 0.875rem;
    line-height: 1.5rem;
    font-weight: 400;
    color: #4f4f4f;
    height: 6rem;
    overflow: hidden;
  }

  .img-wrap {
    box-shadow: 0 0.125rem 0.3125rem 0 rgba(0, 0, 0, .16), 0 0.125rem 0.625rem 0 rgba(0, 0, 0, .12);
  }

  .searchBox {
    background: #fff !important;
    margin-top: 0 !important;
  }
</style>
<style lang="less">
  .checkCase {
    .select-dropdown {
      border: 0.0625rem solid #ced4da !important;
      border-radius: 0.125rem !important;
      padding-left: 0.625rem !important;
      padding-right: 0.625rem !important;
      box-sizing: border-box !important;
      font-size: 0.875rem !important;
      color: #333333 !important;
      margin-bottom: 0 !important;
    }

    .select-wrapper .caret {
      right: 0.625rem;
    }
  }
</style>
