let data = {
  list: [
    {
      goodsId: '10001',
      goodsSrc: 'https://aplus-img.oss-cn-beijing.aliyuncs.com/vVORwq7j4JJPH3LfR55.jpg',
      goodsTitle: '南酸枣粒 酸甜解暑',
      goodsSubtitle: '江西特产 五眼果 249g',
      goodsPrice: '25.8',
      goodsNum: 2,
      check: true,
    },
    {
      goodsId: '10002',
      goodsSrc: 'https://aplus-img.oss-cn-beijing.aliyuncs.com/kSJmZOJWythpbOFnMnb.jpg',
      goodsTitle: '麻花小辫 迷你酥条',
      goodsSubtitle: '山药小麻花 249g',
      goodsPrice: '88.8',
      goodsNum: 1,
      check: true,
    },
    {
      goodsId: '10003',
      goodsSrc: 'https://timgsa.oss-cn-beijing.aliyuncs.com/dearcoo/thumb/8015.png',
      goodsTitle: '香菇脆 即食果蔬',
      goodsSubtitle: '江西风味 249g',
      goodsPrice: '100',
      goodsNum: 10,
      check: true,
    },
    {
      goodsId: '10004',
      goodsSrc: 'https://timgsa.oss-cn-beijing.aliyuncs.com/dearcoo/thumb/8002_v1.png',
      goodsTitle: '酸甜可口 风味独特',
      goodsSubtitle: '菩提圣果 圣果可串手串 220g',
      goodsPrice: '30.5',
      goodsNum: 5,
      check: true,
    },
  ],
}

/**
 * Rewritten to be immutable and type-consistent.
 *
 * Fixes over the original reducer:
 *  - no in-place mutation of state.list items (Redux anti-pattern);
 *  - goodsNum is always a number (was initialized as a string, then
 *    incremented into a number and compared loosely with '0');
 *  - quantity can no longer go below 0;
 *  - the default branch returns state unchanged instead of re-checking
 *    every item on each unrelated action (which silently reset the
 *    user's selections);
 *  - the initial `check: true` lives in the initial state itself.
 */
export default function (state = data, action) {
  switch (action.type) {
    // 选中商品，如果当前商品数量为0 那么选中之后变为1
    case 'checkGoods':
      return {
        ...state,
        list: state.list.map((item) => {
          if (item.goodsId !== action.data) return item
          const check = !item.check
          return {
            ...item,
            check,
            goodsNum: check && item.goodsNum === 0 ? 1 : item.goodsNum,
          }
        }),
      }
    // 切换数量
    case 'changeGoodsNum':
      return {
        ...state,
        list: state.list.map((item) => {
          if (item.goodsId !== action.data.goodsId) return item
          const delta = action.data.status === 'add' ? 1 : -1
          const goodsNum = Math.max(0, item.goodsNum + delta) // 不允许减到负数
          return {
            ...item,
            goodsNum,
            check: goodsNum === 0 ? false : item.check, // 减到0自动取消选择
          }
        }),
      }
    // 全选
    case 'checkAllGoods':
      return {
        ...state,
        list: state.list.map((item) => ({ ...item, check: !action.data })),
      }
    default:
      return state
  }
}
