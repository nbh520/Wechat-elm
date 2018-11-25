// components/star/star.js
const CLASS_ON = 'on'
const CLASS_HALF = 'half'
const CLASS_OFF = 'off'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    score:{ //星级评分
      type: Number,
      value:0
    }
  },
  attached:function(){
    this.starClass();
  },
  /**
   * 组件的初始数据
   */
  data: {
    starClasses:['on','on','on','on','on']
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //计算评分
    starClass: function(){
      let score = this.properties.score;
      let starArr = [];
      const scoreLen = Math.floor(score)
      for(let i = 0; i < scoreLen; i++){
        starArr.push(CLASS_ON)
      }
      if (score - scoreLen >= 0.5){
        starArr.push(CLASS_HALF)
      }
      while (starArr.length < 5){
        starArr.push(CLASS_OFF)
      }
      this.setData({
        starClasses: starArr
      })
    }
  }
})
