//RUN TEST = npx mocha --no-timeouts tests/gmail.js

const { Builder, By, Key } = require("selenium-webdriver");

function generateUser() {
  let user = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 4) {
    user += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return user;
}

describe("Create email", function () {
  it("Gmail account", async function () {
    let user = `benzatest${generateUser()}`;
    let password = "qwerty123456?";

    let driver = await new Builder().forBrowser("firefox").build();

    driver.manage().window().maximize();

    await driver.get(
      "https://accounts.google.com/signup/v2/webcreateaccount?biz=false&cc=AR&continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&dsh=S1477167360%3A1682865300312932&emr=1&flowEntry=SignUp&flowName=GlifWebSignIn&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&ifkv=Af_xneG0PiNXKWOvotPJeIy_PeP7I10SGG6YL_vn8aE5PltYQqgt_AQHescqUfUbe4NoJ08maVja&osid=1&service=mail"
    );

    const gmailWindow = await driver.getWindowHandle();
    // console.log(hotmailWindow);

    await driver.findElement(By.id("firstName")).sendKeys("Benza");
    await driver.findElement(By.id("lastName")).sendKeys("Test");
    await driver.findElement(By.id("username")).sendKeys(user);
    await driver
      .findElement(By.xpath('//*[@id="passwd"]/div[1]/div/div[1]/input'))
      .sendKeys(password);
    await driver
      .findElement(
        By.xpath('//*[@id="confirm-passwd"]/div[1]/div/div[1]/input')
      )
      .sendKeys(password);
    await driver
      .findElement(By.xpath('//*[@id="accountDetailsNext"]/div/button'))
      .click();

    await driver.manage().setTimeouts({ implicit: 1000 });

    await driver.findElement(By.id("phoneNumberId")).sendKeys("1155272433");
    await driver
      .findElement(
        By.xpath(
          "/html/body/div[1]/div[1]/div[2]/div[1]/div[2]/div/div/div[2]/div/div[2]/div/div[1]/div/div/button"
        )
      )
      .click();

    await driver.manage().setTimeouts({ implicit: 2000 });

    await driver.switchTo().newWindow("tab");
    await driver.get("https://blank.page/");
    await driver
      .findElement(By.id("sheet"))
      .sendKeys(
        `User:${user}@gmail.com - Password:${password}`,
        Key.ENTER,
        "Check your verification number on your phone"
      );
  });
});
