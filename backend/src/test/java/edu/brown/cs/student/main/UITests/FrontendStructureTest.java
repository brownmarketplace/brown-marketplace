package edu.brown.cs.student.main.UITests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.time.Duration;
import java.util.List;

public class FrontendStructureTest {
  private static String frontendPath;
  private static ChromeDriver chrome;

  /**
   * The frontend gets a path, and the chrome driver is initialized.
   */
  @BeforeClass
  public static void setup() {
    try {
      frontendPath = "http://localhost:3000/";
      WebDriverManager.chromedriver().setup();
      ChromeOptions options = new ChromeOptions();
      chrome = new ChromeDriver(options);
      chrome.manage().timeouts().implicitlyWait(Duration.ofMillis(500));
      chrome.get(frontendPath);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  /**
   * This test check if the title of the React page is present and matches the desired
   * style and content.
   */
  @Test
  public void testTitle() {
    WebElement title = chrome.findElement(By.className("title"));
    assertEquals("Database Visualization", title.getText());
    assertEquals("p", title.getTagName());
    assertEquals("center", title.getCssValue("text-align"));
    assertTrue(title.isDisplayed());
  }

  /**
   * AfterCLass to shut the chrome driver.
   */
  @AfterClass
  public static void end() {
    chrome.close();
    chrome.quit();
  }
}
