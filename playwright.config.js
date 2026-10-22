const {defineConfig,devices}=require('@playwright/test');
module.exports=defineConfig({testDir:'tests',timeout:30000,fullyParallel:true,workers:4,reporter:[['list'],['json',{outputFile:'test-results/results.json'}]],use:{baseURL:process.env.BASE_URL||'http://127.0.0.1:8765',timezoneId:'America/Los_Angeles',trace:'retain-on-failure'},projects:[
{name:'chrome-desktop',use:{browserName:'chromium',launchOptions:{executablePath:require('playwright').chromium.executablePath()},viewport:{width:1280,height:900}}},
{name:'firefox-desktop',use:{browserName:'firefox',viewport:{width:1280,height:900}}},
{name:'webkit-iphone',use:{...devices['iPhone 13'],browserName:'webkit'}},
{name:'webkit-ipad',use:{...devices['iPad (gen 7)'],browserName:'webkit'}},
{name:'firefox-phone',use:{browserName:'firefox',viewport:{width:390,height:844}}}
]});
