"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const pandas_js_1 = require("pandas-js");
const port = 3000;
const app = express_1.default();
let mongodb;
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Thani:2sNQqGhEip8uVV4@covidstalker-g15s2.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: false
}));
client.connect(err => {
    mongodb = client.db("LocationDatabase");
    //mongodb.collection("UserLocations").createIndex({ "lastModifiedDate": 1 }, { expireAfterSeconds: 3600 })
    // perform actions on the collection object
    var listprint = [];
    mongodb.collection("UserLocations").find().forEach(function (el) {
        el.lastModifiedDate = new Date(el.lastModifiedDate);
        var doc = el;
        mongodb.collection("UserLocations").save(el);
        listprint.push(doc);
    }, function () {
        const df = new pandas_js_1.DataFrame(listprint);
        //console.log(df.toString())
        //const df = new DataFrame(listprint).get(['latitude', 'longitude'])
        const computationFrame = df.get(['latitude', 'longitude']);
        //console.log(computationFrame.toString())
        var tempList = computationFrame.values;
        for (let i = 0; i < computationFrame.length; i++) {
            //console.log(tempList[i])
            var nCount = calculate(df.get('latitude').iloc(i), df.get('longitude').iloc(i), df, function (nCount) {
                if (nCount.length >= 5) {
                    console.log("this is a entry:", df.get('user_id').iloc(i), " with ", nCount.length);
                    console.log(nCount);
                    mongodb.collection("PopulatedLocation").countDocuments({ "location_id": df.get('user_id').iloc(i) }, {}, function (err, count) {
                        console.log(nCount.toString());
                        if (err)
                            throw err;
                        console.log("count:", count);
                        if (count === 0) {
                            mongodb.collection("PopulatedLocation").updateOne({ "location_id": df.get('user_id').iloc(i) }, {
                                $set: {
                                    'location_id': df.get('user_id').iloc(i),
                                    'latitude': df.get('latitude').iloc(i),
                                    'longitude': df.get('longitude').iloc(i),
                                    'nearby': nCount,
                                    'lastModifiedDate': new Date()
                                }
                            }, {
                                "upsert": true
                            });
                        }
                    });
                }
            });
        }
    });
});
// var euclidianDistance = (row1, row2): number => {
//     var distance = 0.0
//     for (let i = 0; i < row1.length; i++) {
//         distance += Math.pow((row1[i] - row2[i]), 2)
//     }
//     distance = Math.sqrt(distance)
//     return distance
// }
// var numNearest = (list): number => {
//     var nearest = 0
//     var origin = [list[0].latitude, list[0].longitude]
//     let distancelist: number[] = []
//     for (let i = 0; i < list.length; i++) {
//         distancelist.push(euclidianDistance(origin, [list[i].latitude, list[i].longitude]))
//     }
//     console.log(distancelist)
//     return nearest
// }
var locationPoller = function (req, res, next) {
    var tempObj = req.body;
    console.log(tempObj);
    mongodb.collection("UserLocations").updateOne({ "user_id": tempObj.user_id }, {
        $set: {
            'user_id': tempObj.user_id,
            'latitude': tempObj.latitude,
            'longitude': tempObj.longitude,
            'lastModifiedDate': new Date()
        }
    }, {
        "upsert": true
    }, function (err, result) {
        if (err) {
            res.status(500).send({ result: "Error!" });
            throw err;
        }
        else {
            next();
        }
    });
};
app.get('/', (req, res) => {
    res.json({
        message: 'Hello World!'
    });
    //numNearest(locationList)
    //calculate(locationList[297].latitude, locationList[297].longitude)
});
app.post('/poll_location/', locationPoller, function (req, res) {
    var tempObj = req.body;
    // mongodb.collection("UserLocations").updateOne({}, {
    //     $set: {
    //         'user_id': tempObj.user_id,
    //         'latitude': tempObj.latitude, 
    //         'longitude': tempObj.longitude, 
    //         'lastModifiedDate': new Date().getDate()
    //     }
    // }, function (err, result) {
    //     if (err)  {
    //         res.status(500);
    //         throw err;
    //     }
    // });
    // mongodb.collection("UserLocations").ensureIndex( { "lastModifiedDate": 1 }, { expireAfterSeconds: 3600 } )
    res.status(200).send({ result: "Success!" });
});
app.post('/request_nearby/', locationPoller, function (req, res) {
    console.log(req.body);
    var tempObj = req.body;
    var listprint = [];
    let df;
    let location_list;
    mongodb.collection("UserLocations").find().forEach(function (el) {
        var doc = el;
        listprint.push(doc);
    }, function () {
        const df = new pandas_js_1.DataFrame(listprint);
        console.log(df.toString());
        var nCount = calculate(tempObj.location.latitude, tempObj.location.longitude, df, function (nCount) {
            console.log("this is a entry:", tempObj.location.location_id, " with ", nCount.length);
            console.log(nCount);
            mongodb.collection("PopulatedLocation").updateOne({ "location_id": tempObj.location.location_id }, {
                $set: {
                    'location_id': tempObj.location.location_id,
                    'latitude': tempObj.location.latitude,
                    'longitude': tempObj.location.longitude,
                    'nearby': nCount,
                    'lastModifiedDate': new Date()
                }
            }, {
                "upsert": true
            }, function () {
                mongodb.collection("PopulatedLocation").find().forEach(function (el) {
                    var doc = el;
                    location_list.push({
                        'latitude': doc.latitude,
                        'longitude': doc.longitude,
                        'nearby': doc.nearby
                    });
                });
            });
        });
        res.status(200).send({ "hotspots": location_list });
    });
});
var haversine = (lat1, lat2, lng1, lng2) => {
    //console.log(lat1, lat2, lng1, lng2)
    var rad = 6372.8;
    var deltaLat = toRad(lat2 - lat1);
    var deltaLng = toRad(lng2 - lng1);
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);
    var a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) + Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return rad * c;
};
var toRad = (degrees) => {
    return degrees * (Math.PI / 180);
};
// 43.662896, -79.395437
// radius 50 - 500
var calculate = (user_lat, user_lon, df, callback) => {
    var count = 0;
    let nearby_users;
    nearby_users = [];
    for (let y = 0; y < df.length; y++) {
        var dist_to_point = haversine(user_lat, df.get('latitude').iloc(y), user_lon, df.get('longitude').iloc(y));
        if (user_lat === 43.6560811 && user_lon === -79.3801714)
            console.log("dist_to_point of index " + y + " is: " + dist_to_point);
        if (dist_to_point <= 0.25) {
            //console.log(dist_to_point)
            // console.log("latitude: " + locationList[i].latitude + " longitute: " + locationList[i].longitude);
            // console.log("this index is within 500 m: " + i);
            count += 1;
            nearby_users.push(df.get("user_id").iloc(y));
        }
        //console.log(count)
    }
    //console.log("There are " + count + " people within a 500 m radius.") //return count instead.
    callback(nearby_users);
};
app.listen(port, "192.168.2.17", err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});
var minutes = 5, the_interval = minutes * 60 * 1000;
var masscompute = 0;
setInterval(function () {
    console.log("Recomputing...............................");
    var all;
    if (masscompute !== 0) {
        var listprint = [];
        var userPrint = [];
        let df;
        masscompute -= 5;
        mongodb.collection("PopulatedLocation").find().forEach(function (el) {
            var doc = el;
            listprint.push(doc);
        }, function () {
            mongodb.collection("UserLocation").find().forEach(function (el) {
                var doc = el;
                userPrint.push(doc);
            }, function () {
                const df = new pandas_js_1.DataFrame(listprint);
                const uf = new pandas_js_1.DataFrame(userPrint);
                console.log(df.toString());
                const computationFrame = df.get(['latitude', 'longitude']);
                //console.log(computationFrame.toString())
                var tempList = computationFrame.values;
                for (let i = 0; i < computationFrame.length; i++) {
                    //console.log(tempList[i])
                    var nCount = calculate(df.get('latitude').iloc(i), df.get('longitude').iloc(i), uf, function (nCount) {
                        if (nCount.length >= 5) {
                            console.log("this is a entry:", df.get('user_id').iloc(i), " with ", nCount.length);
                            console.log(nCount);
                            mongodb.collection("PopulatedLocation").updateOne({ "location_id": df.get('location_id').iloc(i) }, {
                                $set: {
                                    'location_id': df.get('location_id').iloc(i),
                                    'latitude': df.get('latitude').iloc(i),
                                    'longitude': df.get('longitude').iloc(i),
                                    'nearby': nCount,
                                    'lastModifiedDate': new Date()
                                }
                            }, {
                                "upsert": true
                            });
                        }
                    });
                }
            });
        });
        //console.log(df.toString())
        //const df = new DataFrame(listprint).get(['latitude', 'longitude'])
    }
    else {
        masscompute = 60;
        var listprint = [];
        let df;
        mongodb.collection("UserLocations").find().forEach(function (el) {
            var doc = el;
            listprint.push(doc);
        }, function () {
            const df = new pandas_js_1.DataFrame(listprint);
            console.log(df.toString());
            const computationFrame = df.get(['latitude', 'longitude']);
            //console.log(computationFrame.toString())
            var tempList = computationFrame.values;
            for (let i = 0; i < computationFrame.length; i++) {
                //console.log(tempList[i])
                var nCount = calculate(df.get('latitude').iloc(i), df.get('longitude').iloc(i), df, function (nCount) {
                    if (nCount.length >= 5) {
                        console.log("this is a entry:", df.get('user_id').iloc(i), " with ", nCount.length);
                        console.log(nCount);
                        mongodb.collection("PopulatedLocation").countDocuments({ "location_id": df.get('user_id').iloc(i) }, {}, function (err, count) {
                            console.log(nCount.toString());
                            if (err)
                                throw err;
                            console.log("count:", count);
                            if (count === 0) {
                                mongodb.collection("PopulatedLocation").updateOne({ "location_id": df.get('user_id').iloc(i) }, {
                                    $set: {
                                        'location_id': df.get('user_id').iloc(i),
                                        'latitude': df.get('latitude').iloc(i),
                                        'longitude': df.get('longitude').iloc(i),
                                        'nearby': nCount,
                                        'lastModifiedDate': new Date()
                                    }
                                }, {
                                    "upsert": true
                                });
                            }
                        });
                    }
                });
            }
        });
        //console.log(df.toString())
        //const df = new DataFrame(listprint).get(['latitude', 'longitude'])
        console.log("Completed Computations...................");
    }
}, the_interval);
//# sourceMappingURL=Index.js.map