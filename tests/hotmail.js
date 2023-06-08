//RUN TEST = npx mocha --no-timeouts tests/hotmail.js

const { Builder, By, Key } = require("selenium-webdriver");

function generateUser() {
  let user = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 8) {
    user += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return user;
}

describe("Create email", function () {
  it("Hotmail account", async function () {
    let user = `B${generateUser()}`;
    let password = "qwerty123456?";

    let driver = await new Builder().forBrowser("firefox").build();

    driver.manage().window().maximize();

    await driver.get(
      "https://signup.live.com/signup?lcid=1033&wa=wsignin1.0&rpsnv=13&ct=1682781185&rver=7.0.6737.0&wp=MBI_SSL&wreply=https%3a%2f%2foutlook.live.com%2fowa%2f%3fnlp%3d1%26signup%3d1%26RpsCsrfState%3d758fc1ac-541c-3a31-1948-9f42194f9e34&id=292841&CBCXT=out&lw=1&fl=dob%2cflname%2cwld&cobrandid=90015&lic=1&uaid=fefed830b61542b5b6c324ffca55d96e"
    );

    const hotmailWindow = await driver.getWindowHandle();
    // console.log(hotmailWindow);

    await driver.findElement(By.id("MemberName")).sendKeys(user, Key.RETURN);

    await driver.manage().setTimeouts({ implicit: 2000 });

    await driver.findElement(By.id("iOptinEmail")).click();
    await driver.findElement(By.id("PasswordInput")).sendKeys(password);
    await driver.findElement(By.id("iSignupAction")).click();

    await driver.findElement(By.id("FirstName")).sendKeys("Benza");
    await driver.findElement(By.id("LastName")).sendKeys("Value");
    await driver.findElement(By.id("iSignupAction")).click();

    await driver.manage().setTimeouts({ implicit: 2000 });

    await driver.findElement(By.id("BirthYear")).sendKeys("1980");
    await driver
      .findElement(
        By.xpath(
          "/html/body/div[1]/div/div/div[2]/div/div[1]/div[3]/div/div[1]/div[5]/div/div/form/div/div[4]/div[3]/div[1]/select/option[7]"
        )
      )
      .click();
    await driver
      .findElement(
        By.xpath(
          "/html/body/div[1]/div/div/div[2]/div/div[1]/div[3]/div/div[1]/div[5]/div/div/form/div/div[4]/div[3]/div[2]/select/option[9]"
        )
      )
      .click();
    await driver.findElement(By.id("iSignupAction")).click();

    await driver.manage().setTimeouts({ implicit: 2000 });

    await driver.switchTo().newWindow("tab");
    await driver.get("https://blank.page/");
    await driver
      .findElement(By.id("sheet"))
      .sendKeys(`User:${user}@outlook.com - Password:${password}`);

      driver.switchTo().window(hotmailWindow);
  });
});
