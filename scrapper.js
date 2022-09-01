const cheerio = require('cheerio');
const axios = require('axios');
const json2csv=require('json2csv').Parser;
const fs=require("fs");

const url='https://www.amazon.in/dp/product/B07YWS9SP9/';
(async()=>{
axios(url,{
    headers :{'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36'}
}).then(response =>{
    const html=response.data;
    const $=cheerio.load(html);
    let productName= $('span[id="productTitle"]').text().trim();
    let price= $('span[class="a-offscreen"]').first().text().trim();
    let reviews=$('span[id="acrCustomerReviewText"]').first().text().trim();
    let rating=$('a[class="a-popover-trigger a-declarative"]').text().slice(0,20).trim();

    const info=[{
        productName:productName,
        price:price,
        reviews:reviews,
        rating:rating,
    }
]
console.log(info);
const j2cp=new json2csv();
const csv =j2cp.parse(info);
fs.writeFileSync("./amazon.csv",csv,"utf-8");
})
})();

