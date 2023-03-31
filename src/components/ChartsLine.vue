<template>
<figure class="charts-line" id="myChart">
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
        document.getElementById("myChart"),
        "light"
      );
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "rgba(66, 139, 202, 0.7)"
            }
          }
        },
        legend: {
          textStyle: {
            color: "#999",
            fontSize: 14,
          },
          data: [{
            name: "报价单个数",
            icon: 'circle'
          }, {
            name: "订单数",
            icon: 'circle'
          }]
        },
        grid: {
          left: "4%",
          right: "4%",
          bottom: "0%",
          containLabel: true
        },
        xAxis: [{
          type: "category",
          boundaryGap: false,
          axisLine: {
            show: false
          }, //轴线不显示
          axisTick: {
            show: false
          }, //
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#eee"],
              width: 1,
              type: "dashed"
            }
          },
          data: [
            "2020年1月",
            "2020年2月",
            "2020年3月",
            "2020年4月",
            "2020年5月",
            "2020年6月",
            "2020年7月"
          ]
        }],
        yAxis: [{
          type: "value",
          axisLine: {
            show: false
          }, //轴线不显示
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          }, //
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#eee"],
              width: 1,
              type: "dashed"
            }
          },
        }],
        series: [{
          name: "报价单个数",
          type: "line",
          // stack: "总量",
          itemStyle: {
            color: "#FD9E8A"
          },
          label: {
            normal: {
              show: true,
              position: "top"
            }
          },
          smooth: true,
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                  offset: 0,
                  color: "#FD9E8A" // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#ffe" // 100% 处的颜色
                }
              ]
            }
          },
          data: [820, 932, 901, 320, 852, 1250, 901, 1234, 350]
        }, {
          name: "订单数",
          type: "line",
          // stack: "总量",
          itemStyle: {
            color: "#00C8EE"
          },
          smooth: true,
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                  offset: 0,
                  color: "#00C8EE" // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#ffe" // 100% 处的颜色
                }
              ]
            }
          },
          data: [220, 532, 0, 134, 720, 932, 101, 34, 834]
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
.charts-line {
    height: 350px;
}
</style>
