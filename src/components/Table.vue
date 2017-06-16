<template>
    <div>
        <h1>Table test</h1>

        <table class="table table-bordered table-hover table-responsive no-padding">
            <!-- table header -->
            <thead>
                <tr style="cursor: pointer">
                    <th v-for="field in tableFields">
                        {{ field.title }}
                    </th>
                </tr>
            </thead>
            <!-- table body -->
            <!-- TODO: 默认排序 -->
            <tbody>
              <template v-for="(rowData, index) in tableData">
                <!-- TODO: style="cursor: pointer" 效果？ -->
                <tr style="cursor: pointer">
                    <!-- <td>{{ index }}</td> -->
                    <td>{{ rowData.id }}</td>
                    <td>{{ rowData.enabled }}</td>
                    <td>{{ rowData.flumeAgent.id }}</td>
                    <td>{{ rowData.flumeHost.ip }}</td>
                    <td>{{ rowData.flumeFlow.id }}</td>
                    <td>{{ rowData.httpMonitorEnabled }}</td>
                    <td>{{ rowData.httpMonitorPort }}</td>
                    <td>{{ rowData.status }}</td>
                    <td>{{ rowData.target_status }}</td>
                    <td>
                      <span>
                        <button class="btn btn-success btn-xs">
                          <i class="fa fa-eye" data-toggle="tooltip" title="详情" @click="fnUpdateTmpRowDataForCRU(rowData)">详情</i>
                        </button>
                      </span>
                    </td>
                </tr>
              </template>
            </tbody>
          </table>

        <hr>
        <hr>
        <hr>
        <detail :row-data=tmpRowDataForCRU :form-mode=formMode></detail>
    </div>
</template>

<script>
  import Detail from './Detail.vue'
  export default {
    name: 'Table',
    // 组合其它组件
    extends: {},
    // 子组件
    components: {
      'detail': Detail
    },
    // 组件属性、变量
    props: [],
    directives: {},
    filters: {},
    // 组件本地属性、变量
    data () {
      return {
        tableData: [
          {
            'id': '1',
            'enabled': false,
            'flumeAgent': { 'id': '1' },
            'flumeHost': { 'id': '3', 'ip': '192.168.4.145' },
            'flumeFlow': { 'id': '1' },
            'status': 1,
            'target_status': 1,
            'description': null,
            'properties': '{}',
            'httpMonitorEnabled': true,
            'httpMonitorPort': 41414,
            '_index': 0
          },
          {
            'id': '2',
            'enabled': false,
            'flumeAgent': { 'id': '2' },
            'flumeHost': { 'id': '2', 'ip': '192.168.4.124' },
            'flumeFlow': { 'id': '1' },
            'status': 1,
            'target_status': 1,
            'description': null,
            'properties': '{}',
            'httpMonitorEnabled': true,
            'httpMonitorPort': 41414,
            '_index': 0
          }
        ],
        tableFields: [
          { key: 'id', title: 'ID' },
          { key: 'enabled', title: '是否启用' },
          {
            key: 'flumeAgent',
            title: '关联 Agent'
          },
          {
            key: 'flumeHost',
            title: '关联 Host'
          },
          {
            key: 'flumeFlow',
            title: '关联 Flow'
          },
          { key: 'httpMonitorEnabled', title: '是否监控' },
          { key: 'httpMonitorPort', title: '监控端口' },
          { key: 'status', title: '当前状态' },
          { key: 'target_status', title: '目标状态' },
          {
            key: '',
            title: '操作'
          }
        ],
        tmpRowDataForCRU: {},
        formMode: 'view'
      }
    },
    computed: {
    },
    // 组件方法
    watch: {},
    methods: {
      fnUpdateTmpRowDataForCRU (rowData) {
        this.tmpRowDataForCRU = rowData
      }
    },
    // 生命周期函数
    created () {
      console.log('[debug] Table created')
    }
  }
</script>

<style>
</style>
