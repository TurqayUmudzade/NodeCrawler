import { Builder, Browser, By } from "selenium-webdriver"
import dotenv from 'dotenv';

dotenv.config();

const domain = process.env.WEBSITE_URL
const uniqueLinks = new Set()
const queue = [domain]

const init = async () => {
    let driver = await new Builder().forBrowser(Browser.CHROME).build()

    //BFS
    try {
        let counter = 0
        while (queue.length > 0) {
            let target = queue.shift()
            await driver.get(target)
            let anchorTags = await driver.findElements(By.css("a"))
            for (const anchor of anchorTags) {
                let link = await anchor.getAttribute("href")
                if (link && link.startsWith(domain) && !uniqueLinks.has(link)) {
                    uniqueLinks.add(link)
                    queue.push(link)
                    console.log(++counter, link)
                }
            }
        }
    } catch (e) {
        console.log(e)
    } finally {
        await driver.quit()
    }
}

init()
