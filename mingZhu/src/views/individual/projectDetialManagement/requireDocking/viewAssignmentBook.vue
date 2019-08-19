<template>
    <mdb-container class="view-assignment-book px-0">
        <mdn-row v-if="requiredTaskFileBoss&&requiredTaskFileBoss.length>0">
            <mdb-col>
                <div class="text-center"
                    v-for="(item,index) in requiredTaskFileBoss" 
                    :key="item.id" 
                    style="margin-bottom:1.5rem;display:inline-block;">
                    <a class="py-0 px-0"
                        style="display:inline-block;"
                    :href="origin+'/Mingzhu/common/sysFile/download/'+item.filePath+'/'+item.orgfileName"
                    :download="item.orgfileName"
                    @mouseover="taskfileurl = require('@/assets/images/taskfile1.png')"
                    @mouseout="taskfileurl = require('@/assets/images/taskfile0.png')">
                    <img :src="taskfileurl"/>
                    </a>
                    <p class="mt-1" style="color:#666;">{{item.orgfileName}}</p>
                </div>
            </mdb-col>
        </mdn-row>
    </mdb-container>
</template>
<script>
export default {
    name:"viewAssignmentBook",
    data(){
        return{
            taskfileurl:require('@/assets/images/taskfile0.png'),
            origin:location.origin,
            requiredTaskFileBoss:[]
        }
    },
    methods:{
        getRequiredTaskFileBoss(){
            this.api.getRequiredTaskFileBoss({projectId:this.$route.query.id}).then(res=>{
                if(res.code==0){
                  this.requiredTaskFileBoss = res.data
                }
            })
       },
    },
    mounted(){
        this.getRequiredTaskFileBoss();
    }
}
</script>

<style lang="less" scoped>
.view-assignment-book{
    a{
        color: #999999;
        font-size: 2rem;
    }
    a:hover{
        color: #4285f4;
    }
}
</style>
