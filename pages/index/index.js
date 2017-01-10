//index.js
//获取应用实例
var app = getApp()
var mapNumber = ['1','2','3','4','5','6','7','8','']
var emptyIndex = 8
var moveFirstPoint
var moveLastPoint
Page({
  data: {
    time:'00:00\n',
    num: mapNumber
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    that.initMap()

  },
  initMap: function() {
    console.log('initMap')
    var tempNumbers = ['1','2','3','4','5','6','7','8','']
    for(var i = 0; i < 10; i++){
      var indexA = Math.round(Math.random()*7)
      var indexB = Math.round(Math.random()*7)
      console.log('swap:' + indexA + '<->' + indexB)
      var tempNum = tempNumbers[indexA]
      tempNumbers[indexA] = tempNumbers[indexB]
      tempNumbers[indexB] = tempNum
    }
    mapNumber = tempNumbers
    emptyIndex = 8
    this.setData({
      num:mapNumber
    })
    
  },

  checkresult: function() {
    var win = true;
    for(var i = 0; i < 8; i++){
      if((i+1).toString() != mapNumber[i]){
        win = false;
        break;
      }
    }
    if(win){
      wx.showToast({
        title: '成功',
        icon: 'success',
      })
      var that = this
      setTimeout(function(){ 
        that.initMap();
      },2000)
      
    }
    
  },

  swapMap: function(indexA,indexB){
    var tempNum = mapNumber[indexA]
    mapNumber[indexA] = mapNumber[indexB]
    mapNumber[indexB] = tempNum
    this.setData({
      num:mapNumber
    })
  },

  movedirection: function(direction){//1:left, 2:right, 3:up, 4:down
    console.log('move direction' + direction)
    var newIndex = -1
    if(direction == 1 && (emptyIndex%3) != 2){
      newIndex = emptyIndex + 1
    }else if(direction == 2 && (emptyIndex%3 != 0)){
      newIndex = emptyIndex - 1
    }else if(direction == 3 && (emptyIndex/3 < 2)){
      newIndex = emptyIndex + 3
    }else if(direction == 4 && (emptyIndex/3 != 0)){
      newIndex = emptyIndex - 3
    }

    if(newIndex >= 0){
       this.swapMap(newIndex,emptyIndex)
       emptyIndex = newIndex
       this.checkresult()
    }
    
  },

  handletouchmove: function(e){
    if(!moveFirstPoint){
      moveFirstPoint = e.touches[0]
    }else{
      moveLastPoint = e.touches[0]
    }
  },
  handletouchend: function(e){
    if(moveFirstPoint && moveLastPoint){
      var moveH = moveFirstPoint.pageX - moveLastPoint.pageX
      var moveV = moveFirstPoint.pageY - moveLastPoint.pageY
      moveFirstPoint = null
      moveLastPoint = null
      if(Math.abs(moveH) < 30 && Math.abs(moveV) < 30){
        console.log('move ignore');
      }
      if(Math.abs(moveH) > Math.abs(moveV)){
        //h swipe
        if(moveH < 0){
          //swipe right
          this.movedirection(2)
        }else{
          this.movedirection(1)
        }
      }else{
        //V swipe
        if(moveV < 0){
          //swipe down
          this.movedirection(4)
        }else{
          this.movedirection(3)
        }
      }
    }
  },
  handletouchcancel: function(e){
    moveFirstPoint = null
    moveLastPoint = null
  },

  canvashandletouchmove: function(e) {
  }

})
