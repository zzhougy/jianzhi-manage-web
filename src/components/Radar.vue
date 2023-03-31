<template>
<figure class="radar" id="myChart2">
  折线图
</figure>
</template>

<script>
export default {
  name: "ChartsLine",
  components: {},
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(
        document.getElementById("myChart2"),
        "light"
      );
      var indicator = [{
          text: '不锈钢304',
          max: 6000,
        },
        {
          text: '铜柱4mm*6mm',
          max: 5000
        },
        {
          text: '镀锌铁皮1000mm*3卷',
          max: 5000
        },
        {
          text: '铁皮',
          max: 5000,
          // axisLabel: {
          //   show: true,
          //   textStyle: {
          //     fontSize: 12,
          //     color: '#333'
          //   }
          // }
        },
        {
          text: '不锈钢404',
          max: 5000
        },
        {
          text: '铜皮',
          max: 5000
        }
      ];
      var dataArr = [{
          value: [4300, 4700, 4600, 3900, 3800, 4200],
          name: '昨日库存',
          areaStyle: {
            normal: { // 单项区域填充样式
              color: {
                type: 'linear',
                x: 0, //右
                y: 0, //下
                x2: 1, //左
                y2: 1, //上
                colorStops: [{
                  offset: 0,
                  color: '#6CDEB0'
                }, {
                  offset: 1,
                  color: '#B9F39C'
                }],
                globalCoord: false
              },
              opacity: .6 // 区域透明度
            }
          }
        },
        {
          value: [3200, 3000, 3400, 2000, 2900, 2000],
          name: '今日剩余',
          areaStyle: {
            normal: { // 单项区域填充样式
              color: {
                type: 'linear',
                x: 1, //右
                y: 1, //下
                x2: 0, //左
                y2: 0, //上
                colorStops: [{
                  offset: 0,
                  color: '#00C8EE'
                }, {
                  offset: 1,
                  color: '#3E82EE'
                }],
                globalCoord: false
              },
              opacity: .3 // 区域透明度
            }
          }
        }
      ];
      var colorArr = ['#6CDEB0', '#00C8EE']; //颜色
      // 绘制图表
      myChart.setOption({
        // backgroundColor: '#101736',
        color: colorArr,
        tooltip: {},
        legend: {
          orient: 'vertical',
          // icon: 'circle', //图例形状
          // data: ['昨日库存', '今日剩余'], //图例
          data: [{
            name: "昨日库存",
            icon: 'circle'
          }, {
            name: "今日剩余",
            icon: 'circle'
          }],
          top: 0,
          left: 0,
          itemWidth: 14, // 图例标记的图形宽度。[ default: 25 ]
          itemHeight: 14, // 图例标记的图形高度。[ default: 14 ]
          itemGap: 21, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
          textStyle: {
            fontSize: 14,
            color: '#999',
          },
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: '#ccc',
              fontSize: 14
            },
          },
          indicator: indicator,
          splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
            show: true,
            areaStyle: { // 分隔区域的样式设置。
              color: ['rgba(255,255,255,0)', 'rgba(255,255,255,0)'], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
            }
          },
          axisLine: { //指向外圈文本的分隔线样式
            lineStyle: {
              color: '#eee',
              type: "dashed",
              width: 1, // 分隔线线宽
            }
          },
          splitLine: {
            lineStyle: {
              color: '#eee', // 分隔线颜色
              width: 1, // 分隔线线宽
              type: "dashed",
            }
          },
        },
        series: [{
          type: 'radar',
          symbolSize: 10,
          // symbol: 'circle',
          data: dataArr
        }]
      });
    }
  },
  mounted() {
    this.drawLine();
    let myChart = this.$echarts.init(
      document.getElementById("myChart"),
      "light"
    );
    window.onresize = () => {
      myChart.resize();
    }; //如果resizeSelf变为true,则刷新一下
    if (this.resizeSelf) {
      myChart.resize();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.radar {
    height: 350px;
    width: 100%;
}
</style>
