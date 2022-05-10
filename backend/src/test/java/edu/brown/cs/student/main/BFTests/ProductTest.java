package edu.brown.cs.student.main.BFTests;

import com.google.common.annotations.VisibleForTesting;
import edu.brown.cs.student.Structures.Product;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class ProductTest {
  @Test
  public void bloomFilterAttributesTest() {
    List<String> tags0 = Arrays.asList(new String[] {"sweater", "winter", "vintage", "fleece", "new"});
    Product product0 = new Product(0, "vintage brown university sweater",  tags0, "clothing");
    List<String> attributes0 = product0.getAttributes();

    assertEquals(attributes0.size(), 11);

    List<String> tags1 = Arrays.asList(new String[] {"handmade", "custom"});
    Product product1 = new Product(1, "rainbow bead necklace", tags1, "jewelry");
    List<String> attributes1 = product1.getAttributes();

    assertEquals(attributes1.size(), 9);
    assertTrue(attributes1.contains("handmade"));
    assertTrue(attributes1.contains("custom"));
    assertTrue(attributes1.contains("rainbow"));
    assertTrue(attributes1.contains("bead"));
    assertTrue(attributes1.contains("necklace"));
    assertTrue(attributes1.contains("jewelry"));
    assertTrue(attributes1.contains("jewelryweights0"));
    assertTrue(attributes1.contains("jewelryweights1"));
    assertTrue(attributes1.contains("jewelryweights2"));
  }
}
