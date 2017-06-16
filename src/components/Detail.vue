<template>
    <div>
        <h1>Detail test</h1>
        <p>Detail rowData:    {{ rowData }} </p>
        <p>Detail tmpRowData: {{ tmpRowData }} </p>
        <p>Detail optionsAgentObject: {{ optionsAgentObject }} </p>
        <div>
            <button class="btn btn-primary btn-xs" @click.prevent="fnSetFormModeRowData('edit')" v-if="!fnIsEmpty(rowData)">修改</button>
            <button class="btn btn-warning btn-xs" @click.prevent="fnResetRowData()" v-if="!fnIsEmpty(rowData)">还原</button>
        </div>
        <form class="form-horizontal">

          <div class="form-group">
            <label class="col-sm-2 control-label">ID</label>

            <div class="col-sm-4">
              <input type="text" class="form-control" placeholder="id"
                :disabled="formModeRowData == 'view'"
                v-model="tmpRowData.id">
            </div>
          </div>

          <div class="form-group">
            <label for="" class="col-sm-2 control-label">隶属 Flow</label>
            <div class="col-sm-4">
               <select v-model="tmpRowData.flumeFlow" class="form-control select2" style="width: 100%;" :disabled="formModeRowData == 'view'">
                  <option v-for="option in optionsFlowObject" :value="fnFindById(dataFlow, option.value)"
                    :selected="fnContitionOfOptionSelectedForFlow(tmpRowData, option)">
                      {{ option.text }}
                  </option>
                </select>
            </div>
          </div>
          <!-- <div class="form-group">
            <label for="" class="col-sm-2 control-label">关联 Agent</label>
            <div class="col-sm-4">
               <select v-model="tmpRowData.flumeAgent" class="form-control select2" style="width: 100%;" :disabled="formModeRowData == 'view'">
                  <option v-for="option in optionsAgentObject" :value="fnFindById(dataAgent, option.value)"
                    :selected="fnContitionOfOptionSelectedForAgent(tmpRowData, option)">
                      {{ option.text }}
                  </option>
                </select>
            </div>

            <label class="col-sm-2 control-label">关联 Host</label>
            <div class="col-sm-4">
                <select v-model="tmpRowData.flumeHost" class="form-control select2" style="width: 100%;" :disabled="formModeRowData == 'view'">
                  <option v-for="option in optionsHostObject" :value="fnFindById(dataHost, option.value.id)"
                    :selected="fnContitionOfOptionSelectedForHost(tmpRowData, option)">
                      {{ option.text }}
                  </option>
                </select>
            </div>

          </div>
            -->
          <div class="form-group">
            <label class="col-sm-2 control-label">监控端口</label>

            <div class="col-sm-4">
              <input type="text" class="form-control" placeholder="port"
                :disabled="formModeRowData == 'view'"
                v-model="tmpRowData.httpMonitorPort">
            </div>
          </div>

          <div class="form-group">
            <label for="inputDescription" class="col-sm-2 control-label">描述</label>

            <div class="col-sm-10">
              <textarea name="" id="textareaDescription" class="form-control" placeholder="description"
                :disabled="formModeRowData == 'view'"
                v-model="tmpRowData.description">
              </textarea>
            </div>
          </div>
        </form>
    </div>
</template>

<script>
  import _ from 'lodash'
  export default {
    name: 'Detail',
    // 组合其它组件
    extends: {},
    // 子组件
    components: {
    },
    // 组件属性、变量
    props: ['rowData', 'formMode'],
    directives: {},
    filters: {},
    // 组件本地属性、变量
    data () {
      return {
        tmpRowData: {},
        dataAgent: [
           { 'id': '1', 'name': 'a1' },
           { 'id': '2', 'name': 'a2' },
           { 'id': '3', 'name': 'a3' }
        ],
        // optionsAgentObject: [
        //   {text: 'a1', value: { 'id': '1', 'name': 'a1' }},
        //   {text: 'a2', value: { 'id': '2', 'name': 'a2' }},
        //   {text: 'a3', value: { 'id': '3', 'name': 'a3' }}
        // ],
        optionsComponentType: [
          { 'text': 'Source', 'value': 'source' },
          { 'text': 'Channel', 'value': 'channel' },
          { 'text': 'Sink', 'value': 'sink' }
        ],
        dataFlow: [
          { 'id': '1', 'name': 'flow1' },
          { 'id': '2', 'name': 'flow2' },
          { 'id': '3', 'name': 'flow3' }
        ],
        // optionsFlowObject: [
        //   {text: 'flow1', value: { 'id': '1', 'name': 'flow1' }},
        //   {text: 'flow2', value: { 'id': '2', 'name': 'flow2' }},
        //   {text: 'flow3', value: { 'id': '3', 'name': 'flow3' }}
        // ],
        dataHost: [
          { 'id': '1', 'name': 'host1', ip: '192.168.4.120' },
          { 'id': '2', 'name': 'host2', ip: '192.168.4.121' },
          { 'id': '3', 'name': 'host3', ip: '192.168.4.122' }
        ],
        // optionsHostObject: [
        //   {text: 'host1', value: { 'id': '1', 'name': 'host1', ip: '192.168.4.120' }},
        //   {text: 'host2', value: { 'id': '2', 'name': 'host2', ip: '192.168.4.121' }},
        //   {text: 'host3', value: { 'id': '3', 'name': 'host3', ip: '192.168.4.122' }}
        // ],
        formModeRowData: this.formMode
      }
    },
    computed: {
      optionsAgentObject () {
        return _.map(this.dataAgent, function (obj) {
          return {text: obj.name, value: obj}
        })
      },
      optionsFlowObject () {
        return _.map(this.dataFlow, function (obj) {
          return {text: obj.name, value: obj}
        })
      },
      optionsHostObject () {
        return _.map(this.dataHost, function (obj) {
          return {text: obj.ip, value: obj}
        })
      }
    },
    // 组件方法
    watch: {
      rowData (val, oldVal) {
        this.fnInitTmpRowData(val)
      }
    },
    methods: {
      fnInitTmpRowData (rowData) {
        // this.tmpRowData = _.cloneDeep(rowData)
        console.log('[debug] fnInitTmpRowData')
        console.log('debug 0.1')
        console.log(JSON.stringify(rowData))
        // console.log(rowData)
        console.log(JSON.stringify(this.tmpRowData))
        console.log(this.tmpRowData)
        this.tmpRowData = _.cloneDeep(rowData)
        console.log('debug 0.2')
        console.log(JSON.stringify(this.tmpRowData))
        console.log(this.tmpRowData)
      },
      fnIsEmpty (rowData) {
        return _.isEmpty(rowData)
      },
      fnIsNull (obj) {
        return _.isNull(obj)
      },
      fnIsNullOrUndefined (obj) {
        // return _.isNil(obj)
        return _.isNull(obj) || obj === undefined
      },
      fnContitionOfOptionSelectedForAgent (tmpRowData, option) {
        // return option.value.id === tmpRowData.flumeAgent.id
        if (this.fnIsNullOrUndefined(tmpRowData.flumeAgent) || this.fnIsEmpty(tmpRowData.flumeAgent)) {
          return false
        } else {
          return option.value.id === tmpRowData.flumeAgent.id
        }
      },
      fnContitionOfOptionSelectedForFlow (tmpRowData, option) {
        let ret = null
        if (this.fnIsNullOrUndefined(tmpRowData.flumeFlow) || this.fnIsEmpty(tmpRowData.flumeFlow)) {
          ret = false
        } else {
          ret = option.value.id === tmpRowData.flumeFlow.id
        }
        console.log('[debug] fnContitionOfOptionSelectedForFlow ret = ', ret)
        return ret
      },
      fnContitionOfOptionSelectedForHost (tmpRowData, option) {
        if (this.fnIsNullOrUndefined(tmpRowData.flumeHost) || this.fnIsEmpty(tmpRowData.flumeHost)) {
          return false
        } else {
          return option.value.id === tmpRowData.flumeHost.id
        }
      },
      fnFindById (data, obj) {
        let idx = _.findIndex(data, function (item) {
          return item.id === obj.id
        })
        let ret = null
        if (idx === -1) {
          ret = null
          console.log('[debug] fnFindById idx=', idx)
        } else {
          ret = data[idx]
          console.log('[debug] fnFindById idx=', idx, 'name=', ret.name)
        }
        return ret
      },
      fnSetFormModeRowData (mode) {
        this.formModeRowData = mode
      },
      fnResetRowData () {
        this.tmpRowData = _.cloneDeep(this.rowData)
        this.fnSetFormModeRowData('view')
      }
    },
    // 生命周期函数
    created () {
      this.fnInitTmpRowData(this.rowData)
      console.log('[debug] Detail created')
    }
  }
</script>

<style>
</style>
