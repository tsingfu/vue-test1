# vue-test1

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



## 中文描述
问题概述：父组件 Table 传递给子组件 Detail 一个属性数据 rowData，子组件 Detail 根据 rowData 克隆出一份数据 tmpRowData，当 rowData 中存在 对象字段且子组件 Detail template 中使用到对象字段属性时， clone 出来的 tmpRowData 不正确，template 使用的字段属性是 undefined

### 重现问题1：子组件 clone 父组件传递的 属性值，可能不正确，与属性值中是否存在对象属性有关
步骤1 运行测试代码：

```
git pull https://github.com/tsingfu/vue-test1
cd vue-test1
npm i

git checkout bug-test1

npm run dev
```

测试代码中有两个组件：Table, Detail

步骤2 点击表格中某行记录的详情按钮，
详情组件调试信息显示：
>Detail rowData: { "id": "2", "enabled": false, "flumeAgent": { "id": "2" }, "flumeHost": { "id": "2", "ip": "192.168.4.124" }, "flumeFlow": { "id": "1" }, "status": 1, "target_status": 1, "description": null, "properties": "{}", "httpMonitorEnabled": true, "httpMonitorPort": 41414, "_index": 0 }
Detail tmpRowData: { "id": "2", "enabled": false, "status": 1, "target_status": 1, "description": null, "properties": "{}", "httpMonitorEnabled": true, "httpMonitorPort": 41414, "_index": 0 }

rowData 是父组件 Table 传递给子组件 Detail 一个属性数据
tmpRowData 子组件 Detail 根据 rowData 克隆出一份数据 tmpRowData

tmpRowData: 相比 rowData 少了属性：flumeAgent, flumeHost, flumeFlow

### 重现问题2：子组件 clone 父组件传递的 属性值，可能不正确，与子组件 template 模板是否使用对象属性有关

步骤3 切换到代码： bug-test2 相比 bug-test1，子组件模板中注释了部分对象属性的使用

git checkout bug-test2


刷新页面，进行步骤2的测试
详情组件调试信息显示：
>Detail rowData: { "id": "2", "enabled": false, "flumeAgent": { "id": "2" }, "flumeHost": { "id": "2", "ip": "192.168.4.124" }, "flumeFlow": { "id": "1" }, "status": 1, "target_status": 1, "description": null, "properties": "{}", "httpMonitorEnabled": true, "httpMonitorPort": 41414, "_index": 0 }
Detail tmpRowData: { "id": "2", "enabled": false, "flumeAgent": { "id": "2" }, "flumeHost": { "id": "2", "ip": "192.168.4.124" }, "status": 1, "target_status": 1, "description": null, "properties": "{}", "httpMonitorEnabled": true, "httpMonitorPort": 41414, "_index": 0 }

tmpRowData: 相比 rowData 少了属性：flumeFlow,出现的属性 flumeAgent, flumeHost 正是 子组件模板中注释的对象属性


## english description
problem description: parent component give child component one prop, child component clone the prop for update, if the prop has properties of object, and child component use that properties with type of object in template, the data that cloned by child component misses those properties with object type used in the template.

### reproduce problem1: the problem may be related with property of object type in prop from parent component

step 1: run test code

```
git pull https://github.com/tsingfu/vue-test1
cd vue-test1
npm i

git checkout bug-test1

npm run dev
```

step2: click last column of detail button
you will found some debug infomation:
>Detail rowData: { "id": "2", "enabled": false, "flumeAgent": { "id": "2" }, "flumeHost": { "id": "2", "ip": "192.168.4.124" }, "flumeFlow": { "id": "1" }, "status": 1, "target_status": 1, "description": null, "properties": "{}", "httpMonitorEnabled": true, "httpMonitorPort": 41414, "_index": 0 }
Detail tmpRowData: { "id": "2", "enabled": false, "status": 1, "target_status": 1, "description": null, "properties": "{}", "httpMonitorEnabled": true, "httpMonitorPort": 41414, "_index": 0 }

compared with rowData, tmpRowData lack properties: flumeAgent, flumeHost, flumeFlow


### reproduce problem2: the problem may be related with that whether child component use the object properties in its template

step3: switch test code

git checkout bug-test2

refresh you brower, and do test in step2: click last column of detail button

you will found some debug infomation:
>Detail rowData: { "id": "2", "enabled": false, "flumeAgent": { "id": "2" }, "flumeHost": { "id": "2", "ip": "192.168.4.124" }, "flumeFlow": { "id": "1" }, "status": 1, "target_status": 1, "description": null, "properties": "{}", "httpMonitorEnabled": true, "httpMonitorPort": 41414, "_index": 0 }
Detail tmpRowData: { "id": "2", "enabled": false, "status": 1, "target_status": 1, "description": null, "properties": "{}", "httpMonitorEnabled": true, "httpMonitorPort": 41414, "_index": 0 }

compared with rowData, tmpRowData lack properties: flumeFlow, for I had comment the use of flumeAgent, flumeHost in child component template
