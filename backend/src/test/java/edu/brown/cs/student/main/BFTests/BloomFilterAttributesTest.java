package edu.brown.cs.student.main.BFTests;

import com.google.common.annotations.VisibleForTesting;
import edu.brown.cs.student.main.structures.Product;
import org.junit.Test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class BloomFilterAttributesTest {
  @Test
  public void bloomFilterAttributesTest() {
    Map<String, Object> tags0 = new HashMap<>();
    tags0.put("sweater", " ");
    tags0.put("winter", " ");
    tags0.put("vintage", " ");
    tags0.put("fleece", " ");
    tags0.put("new", " ");

    Map<String, Object> attributes0 = new HashMap<>();
    attributes0.put("name", "vintage brown university sweater");
    attributes0.put("id", "0");
    attributes0.put("category", "clothing");
    attributes0.put("sub-category", "sweater");
    attributes0.put("tags", tags0);

    Product product0 = new Product(attributes0);
    List<String> bfAttributes0 = product0.getAttributes();

    assertEquals(bfAttributes0.size(), 12);

    Map<String, Object> tags1 = new HashMap<>();
    tags1.put("handmade", " ");
    tags1.put("custom", " ");

    Map<String, Object> attributes1 = new HashMap<>();
    attributes1.put("name", "rainbow bead necklace");
    attributes1.put("id", 1);
    attributes1.put("category", "jewelry");
    attributes1.put("sub-category", "necklace");
    attributes1.put("tags", tags1);

    Product product1 = new Product(attributes1);
    List<String> bfAttributes1 = product1.getAttributes();

    assertEquals(bfAttributes1.size(), 10);
    assertTrue(bfAttributes1.contains("handmade"));
    assertTrue(bfAttributes1.contains("custom"));
    assertTrue(bfAttributes1.contains("rainbow"));
    assertTrue(bfAttributes1.contains("necklace"));
    assertTrue(bfAttributes1.contains("bead"));
    assertTrue(bfAttributes1.contains("necklace"));
    assertTrue(bfAttributes1.contains("jewelry"));
    assertTrue(bfAttributes1.contains("jewelryweights0"));
    assertTrue(bfAttributes1.contains("necklaceweights0"));
    assertTrue(bfAttributes1.contains("necklaceweights1"));
    assertTrue(bfAttributes1.contains("necklaceweights2"));
  }
}
