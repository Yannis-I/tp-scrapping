const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto("https://www.amazon.com/s?k=monitor"); // URL de la page des monitors sur Amazon

  await page.waitForSelector(".s-main-slot .s-result-item");

  const products = await page.evaluate(() => {
    const productNodes = document.querySelectorAll(
      ".s-main-slot .s-result-item"
    ); // le sélecteur CSS peut changer
    return Array.from(productNodes).map((node) => {
      let name = node.querySelector(".a-size-mini a.a-link-normal");
      let price = node.querySelector(".a-offscreen");
      let link = node.querySelector(".a-link-normal.a-text-normal");
      let image = node.querySelector(".s-image");

      return {
        name: name ? name.innerText : "N/A",
        price: price ? price.innerText : "N/A",
        link: link ? link.href : "N/A",
        image: image ? image.src : "N/A",
      };
    });
  });

  console.log(products);

  await browser.close();
})();
