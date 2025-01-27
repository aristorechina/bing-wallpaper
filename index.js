const express = require('express');
const axios = require('axios');

const app = express();

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://global.bing.com/HPImageArchive.aspx', {
            params: {
                format: 'js',
                idx: 0,
                n: 1,
                pid: 'hp',
                uhd: 1,
                uhdwidth: 1920,
                uhdheight: 1080,
                setmkt: 'zh-cn',
                setlang: 'zh-cn'
            }
        });

        const imageUrl = `https://global.bing.com${response.data.images[0].url}`;
        res.redirect(302, imageUrl);
    } catch (error) {
        console.error('Error fetching the image of the day:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = app;