package edu.brown.cs.student.main.BFTests;

import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import edu.brown.cs.student.main.recommender.RecommenderSystem;
import edu.brown.cs.student.main.structures.Product;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RecommenderTest {
  @Test
  public void recommendationsTest() {
    List<Product> testProducts = new ArrayList<>();

    Map<String, Object> tags0 = new HashMap<>();
    tags0.put("sweater", " ");
    tags0.put("winter", " ");
    tags0.put("university", " ");
    tags0.put("vintage", " ");

    Map<String, Object> attributes0 = new HashMap<>();
    attributes0.put("name", "vintage brown university sweater");
    attributes0.put("id", "p0");
    attributes0.put("tags", tags0);
    attributes0.put("category", "clothing");
    attributes0.put("sub-category", "sweater");

    Product product0 = new Product(attributes0);
    testProducts.add(product0);

    Map<String, Object> tags1 = new HashMap<>();
    tags1.put("sweater", " ");
    tags1.put("winter", " ");
    tags1.put("sportswear", " ");
    tags1.put("columbia", " ");
    tags1.put("vintage", " ");

    Map<String, Object> attributes1 = new HashMap<>();
    attributes1.put("name", "vintage mint green soft fleece columbia jacket");
    attributes1.put("id", "p1");
    attributes1.put("tags", tags1);
    attributes1.put("category", "clothing");
    attributes1.put("sub-category", "sweater");

    Product product1 = new Product(attributes1);
    testProducts.add(product1);

    Map<String, Object> tags2 = new HashMap<>();
    tags2.put("sweater", " ");
    tags2.put("fleece", " ");
    tags2.put("blue", " ");

    Map<String, Object> attributes2 = new HashMap<>();
    attributes2.put("name", "north face blue fleece jacket");
    attributes2.put("id", "p2");
    attributes2.put("tags", tags2);
    attributes2.put("category", "clothing");
    attributes2.put("sub-category", "sweater");

    Product product2 = new Product(attributes2);
    testProducts.add(product2);

    Map<String, Object> tags3 = new HashMap<>();
    tags3.put("casual", " ");
    tags3.put("dress", " ");

    Map<String, Object> attributes3 = new HashMap<>();
    attributes3.put("name", "light blue sun dress");
    attributes3.put("id", "p3");
    attributes3.put("tags", tags3);
    attributes3.put("category", "clothing");
    attributes3.put("sub-category", "dress");

    Product product3 = new Product(attributes3);
    testProducts.add(product3);

    Map<String, Object> tags4 = new HashMap<>();
    tags4.put("university", " ");
    tags4.put("vintage", " ");
    tags4.put("ring", " ");

    Map<String, Object> attributes4 = new HashMap<>();
    attributes4.put("name", "vintage brown university class ring");
    attributes4.put("id", "p4");
    attributes4.put("tags", tags4);
    attributes4.put("category", "jewelry");
    attributes4.put("sub-category", "ring");

    Product product4 = new Product(attributes4);
    testProducts.add(product4);

    RecommenderSystem recommender = new RecommenderSystem(testProducts);

    List<String> productRecommendations = recommender.generateBFRecommendations(product4, 5);

    String one = productRecommendations.get(0);
    String two = productRecommendations.get(1);
    String three = productRecommendations.get(2);
    String four = productRecommendations.get(3);

    assertEquals(productRecommendations.size(), 4);
    assertEquals(one, "p0");
    assertEquals(two, "p1");
    assertEquals(three, "p2");
    assertEquals(four, "p3");
  }
}
