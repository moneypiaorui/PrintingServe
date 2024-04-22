const express = require('express');
const axios = require('axios');

const background = express.Router();
background.get('/', (req, res) => {
    // 同时发送多个请求
    axios.all([
        axios.get('https://api.lolicon.app/setu/v2', {
            params: {
                r18: 0,
                // tag: '碧蓝航线|AzurLane',
                aspectRatio:'gt1'//横图
            }
        }),
        axios.get('https://api.lolicon.app/setu/v2', {
            params: {
                r18: 0,
                // tag: '碧蓝航线|AzurLane',
                aspectRatio:'lt1'//竖图
            }
        })
    ])
        .then(axios.spread((response1, response2) => {
            // console.log([response1.data.data[0].urls.original,response2.data.data[0].urls.original]);
            res.send([response1.data.data[0].urls.original,response2.data.data[0].urls.original])
        }))
        .catch(error => {
            console.error('Error:', error);
        });
})

module.exports = background;