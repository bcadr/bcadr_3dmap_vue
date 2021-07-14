import {
    Cartesian3,
    Math as cesiumMath,
    Color,
    HeightReference,
    CallbackProperty,
    VerticalOrigin,
    PointPrimitiveCollection,
    LabelStyle,
    DistanceDisplayCondition,
    NearFarScalar,

} from "cesium";


import SuperGif from "../utils/gifs/libgif.js";

// let billboards = [];
let gifs = "";
// 添加标注

//大量点加载
export function bigdata(viewer) {
    let randomCount = 200;
    let pointPrimitives = null; // 申明点渲染集合
    pointPrimitives = viewer.scene.primitives.add(
        new PointPrimitiveCollection()
    );
    while (randomCount--) {
        const dd = [3];
        dd[0] = 0 + Math.random() * 20;
        dd[1] = 0 + Math.random() * 20;
        dd[2] = 100;
        let position = new Cartesian3.fromDegrees(dd[0], dd[1], dd[2]);
        pointPrimitives.add({
            pixelSize: 50,
            color: Color.BLUE.withAlpha(0.6),
            outlineColor: Color.BLACK.withAlpha(0.6),
            outlineWidth: 0,
            position: position,
        });
    }
}
//闪烁点
export function shanshuo(viewer) {
    let x = 1;
    let flog = true;
    let enetity = viewer.entities.add({
        name: "圆点point闪烁",
        position: new Cartesian3.fromDegrees(
            108.93636821424396,
            32.70745267099441,
            500
        ),
        point: {
            show: true, // default
            color: new CallbackProperty(function () {
                if (flog) {
                    x = x - 0.05;
                    if (x <= 0) {
                        flog = false;
                    }
                } else {
                    x = x + 0.05;
                    if (x >= 1) {
                        flog = true;
                    }
                }
                return Color.RED.withAlpha(x);
            }, false),
            pixelSize: 100, // default: 1
            outlineWidth: 0,
        },
    });
    viewer.flyTo(enetity);
}
// 添加图片标注
export function addImgBillboard(viewer) {
    let billboards = [];
    const points = [
        {
            lng: "108.93543742716831",
            lat: "32.70957584826458",
            hgt: "275.4187388577364",
            status: true,
            interid: "w2356www",
            image: "./images/blueMarker.png",
        },
        {
            lng: "108.93464956205246",
            lat: "32.709266535669094",
            hgt: "270.36911883266043",
            status: true,
            interid: "ee9635",
            image: "./images/blueMarker.png",
        },
        {
            lng: "108.93652745580972",
            lat: "32.7089440888706",
            hgt: "269.9095576805446",
            status: true,
            interid: "qq63548",
            image: "./images/blueMarker.png",
        },
    ];
    // scene.globe.depthTestAgainstTerrain = true; // 设置相机初始视角 // 设置相机初始视角
    viewer.scene.camera.flyTo({
        destination: Cartesian3.fromDegrees(
            108.93636821424396,
            32.70745267099441,
            500
        ),
        orientation: {
            heading: cesiumMath.toRadians(327.95),
            pitch: cesiumMath.toRadians(-30.39),
            roll: 0,
        },
    });

    for (let i = 0; i < points.length; i++) {
        console.log(points[i].interid);
        let entity = viewer.entities.add({
            id: points[i].interid,
            name: "camera",
            position: Cartesian3.fromDegrees(
                parseFloat(points[i].lng),
                parseFloat(points[i].lat),
                parseFloat(points[i].hgt) + 10
            ),
            billboard: { image: points[i].image },
            description: "232323",
        });
        billboards.push(entity);
    }
    return billboards;
}
// 添加gif图片标注
export function addGifBillboard(viewer) {
    var div = document.createElement("div");
    var img = document.createElement("img");
    div.appendChild(img);
    img.src = "./images/gif.gif";
    console.log("11111");
    img.onload = () => {
        var rub = new SuperGif({
            gif: img,
        });
        rub.load(() => {
            console.log("222");
            if (!gifs) {
                console.log("3333");
                gifs = viewer.entities.add({
                    position: Cartesian3.fromDegrees(
                        108.93531674746316, 32.70956184444237, 275.33328818717695
                    ),
                    billboard: {
                        image: new CallbackProperty(() => {
                            return rub
                                .get_canvas()
                                .toDataURL("image/png");
                        }, false),
                        verticalOrigin: VerticalOrigin.BOTTOM,
                        heightReference:
                            HeightReference.RELATIVE_TO_GROUND
                    },
                });
                // viewer.trackedEntity = gifs;
            }
        });
    };
}


// 添加文字标注
export function addTextBillboard(viewer) {
    viewer.entities.add({
        position: Cartesian3.fromDegrees(
            108.93538879841549,
            32.70958345994372,
            275.4791541624723 + 10
        ),
        label: {
            text: "Philadelphia",
            font: "24px Helvetica",
            fillColor: Color.SKYBLUE,
            outlineColor: Color.BLACK,
            outlineWidth: 2,
            style: LabelStyle.FILL_AND_OUTLINE,
        },
    });
}
// 添加自己绘制的canvas标注
export function addCanvasBillboard(viewer) {
    const text = "波波安";
    // 飞到坐标视角
    window.viewer.scene.camera.flyTo({
        destination: Cartesian3.fromDegrees(108.93636821424396,
            32.70745267099441,
            500),
        orientation: {
            heading: 3.785774498653955,
            pitch: -0.45235945859613347,
            roll: 6.281602443469065
        }
    });
    // 添加的实体
    window.viewer.entities.add({
        id: "23562112",
        name: text,
        position: Cartesian3.fromDegrees(108.93636821424396,
            32.70745267099441,
            500),
        billboard: {
            image: _this.img,
            disableDepthTestDistance: 350000, // 开启深度检测距离
            distanceDisplayCondition: new DistanceDisplayCondition(0, 1000000000000),
            scaleByDistance: new NearFarScalar(200000, 1.2, 100000000000, 0.5)
        },
        label: {
            text: text,
            font: '14pt Source Han Sans CN', // 字体样式
            fillColor: Color.CHARTREUSE, // 字体颜色
            style: LabelStyle.FILL, // label样式
            outlineWidth: 2,
            verticalOrigin: VerticalOrigin.CENTER, // 垂直位置
            pixelOffset: new Cartesian2(0, -30) // 偏移
        }
    });
}
// 删除当前加载的标注
export function delBillboard(viewer) {
    viewer.entities.removeAll();
}
