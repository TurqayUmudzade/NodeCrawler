const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const { Logger } = require('selenium-webdriver/lib/logging');

const url = 'http://testphp.vulnweb.com/'
const set = new Set()
const queue = [url]


async function init() {
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    try {


        while (queue.length > 0) {
            let target = queue.shift()
            await driver.get(target);
            let anchorTags = await driver.findElements(By.css('a'))
            for (const anchor of anchorTags) {
                let link = await anchor.getAttribute('href')
                if (link.startsWith(target) && !set.has(link)) {
                    set.add(link)
                    queue.push(link)
                    console.log(link);
                }
            }
        }


    }
    catch (e) {
        console.log(e);
    }
    finally {
        await driver.quit();
    }
}

init()