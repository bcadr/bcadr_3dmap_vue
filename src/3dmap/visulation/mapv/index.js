// import * as mapv from "./mapv.js"
// import { utilCityCenter , cesiumMapLayer , DataSet} from "./base/mapV.js"
// var mapv = require('./mapv.js');
// import MapVLayer from "./base/MapVLayerProvider.js"
// import MapVLayer from "./src/map/cesium/Layer.js"
export function currentMap(viewer) {
    
    var randomCount = 1000;
    var data = [];
    console.log(mapv);

    var citys = ["北京", "天津", "上海", "重庆", "石家庄", "太原", "呼和浩特", "哈尔滨", "长春", "沈阳", "济南", "南京", "合肥", "杭州", "南昌", "福州", "郑州", "武汉", "长沙", "广州", "南宁", "西安", "银川", "兰州", "西宁", "乌鲁木齐", "成都", "贵阳", "昆明", "拉萨", "海口"];
    
    // 构造数据
    while (randomCount--) {
        var cityCenter1 = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)]);
        var cityCenter2 = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)]);
        data.push({
            geometry: {
                type: 'LineString',
                coordinates: [[cityCenter1.lng - 1 + Math.random() * 1, cityCenter1.lat - 1 + Math.random() * 1], [cityCenter2.lng - 1 + Math.random() * 1, cityCenter2.lat - 1 + Math.random() * 1]]
            },
            count: 30 * Math.random()
        });
    }

    var dataSet = new mapv.DataSet(data);

    var options = {
        strokeStyle: 'rgba(255, 250, 50, 0.3)',
        shadowColor: 'rgba(255, 250, 50, 1)',
        shadowBlur: 20,
        lineWidth: 0.7,
        draw: 'simple'
    }
    var mapvLayer = mapv.cesiumMapLayer(viewer, dataSet, options);
}
