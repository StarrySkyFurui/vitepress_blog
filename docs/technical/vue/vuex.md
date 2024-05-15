Vuex是Vue的状态管理模式，用于管理组件的共享状态。核心概念包括：

State: 单一数据源，存放应用的所有状态。
Getter: 计算属性，用于从Store的State中派生出一些状态。
Mutation: 更改State的唯一途径，必须是同步函数。
Action: 提交Mutation，可以包含任意异步操作。 关系上，Actions通过commit调用Mutations来改变State，Getters则依赖于State计算得出新值，组件通过mapState、mapGetters、mapActions等辅助函数与Store交互。
