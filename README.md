# NodeCrawler

There is a need to crawl all the urls of the target domain in href tags via Nodejs selenium.
Rules:

1. You need to crawl only the urls that belongs to the target domain.
2. You need to crawl iteratively. For example, you crawled the first url then got 5 different urls inside it. Then you crawl that 5 found urls to see other urls till you get all the urls.
3. Performance is the key thing. You should handle only unique urls while crawling
