//RUN TEST = npx mocha --no-timeouts tests\Benza\compraWidget.js

const { Builder, By, until, Key } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { elementIsSelected } = require("selenium-webdriver/lib/until");

// Definir las opciones para abrir Chrome incognito
const options = new chrome.Options().addArguments("--incognito");

// Dirección del ChromeDriver
const chromedriverPath = "C:/Users/alana/Desktop/Drivers/chromedriver.exe";

describe("Conseguir Window.LS.order.id", function () {
  it("Comprar producto y extraer valor deseado", async function () {
    // Configuración de opciones para el navegador (incognito, no cache/plugins/extensiones)
    const options = new chrome.Options().addArguments(
      "--incognito",
      "--disable-cache",
      "--disable-plugins",
      "--disable-extensions"
    );

    // Correr el navegador con todas las "options" especificadas
    const driver = new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .setChromeService(new chrome.ServiceBuilder(chromedriverPath))
      .build();
    let url_Store = "https://benzavalue.mitiendanube.com";

    driver.manage().window().maximize();
    // const tiendaNubeWindow = await driver.getWindowHandle();

    await driver.get(url_Store);

    await driver.executeScript(
      "window.scrollTo(0, document.body.scrollHeight);"
    );

    await driver.manage().setTimeouts({ implicit: 2000 });

    const widgetBenza = driver.wait(
      until.elementLocated(
        By.xpath("/html/body/div[4]/div/div/div/div[3]/a/img")
      ),
      4000
    );
    await widgetBenza.click();

    await driver
      .findElement(By.xpath('//*[@id="product_form"]/div[4]/div/div/input'))
      .click();

    await driver
      .findElement(By.xpath('//*[@id="ajax-cart-submit-div"]/input'))
      .click();

    await driver.manage().setTimeouts({ implicit: 2000 });

    await driver
      .findElement(By.xpath('//*[@id="contact.email"]'))
      .sendKeys("selenium@test.com");

    await driver
      .findElement(By.id("shippingAddress.zipcode"))
      .sendKeys("1744", Key.RETURN);

    await driver.manage().setTimeouts({ implicit: 2000 });

    await driver.findElement(By.css(".shipping-options-ship")).click();

    await driver.manage().setTimeouts({ implicit: 3000 });

    const fillForm = async () => {
      const inputSufix = "shippingAddress.";
      const inputPrefix = [
        "first_name",
        "last_name",
        "address",
        "number",
        "floor",
        "locality",
        "city",
      ];

      for (const input of inputPrefix) {
        // Retrieve the value attribute of each element
        let inputElement = await driver.findElement(
          By.id(`${inputSufix}${input}`)
        );
        let inputValue = await inputElement.getAttribute("value");

        if (inputValue !== "") {
          await inputElement.clear();
        } else {
          await inputElement.sendKeys("seleniumTest");
        }
      }
    };
    await fillForm();

    await driver
      .findElement(By.id("shippingAddress.city"))
      .sendKeys(Key.RETURN);

    await driver.manage().setTimeouts({ implicit: 5000 });

    await driver
      .findElement(
        By.xpath(
          '//*[@id="__next"]/div[2]/div[2]/div[1]/form/div[2]/div/textarea'
        )
      )
      .sendKeys("Automated Test By Selenium WebDriver");

    setTimeout(async () => {
      await driver.findElement(By.id("btnFinishCheckout")).click();
    }, 4000);

    // await driver.switchTo().newWindow("tab");
    // await driver.get("https://blank.page/");

    // await driver.findElement(By.id("sheet")).sendKeys(`So far so good :D`);

    // driver.switchTo().window(tiendaNubeWindow);
  });
});
