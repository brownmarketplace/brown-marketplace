package edu.brown.cs.student.main.BFTests;

import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import edu.brown.cs.student.main.Recommender.RecommenderSystem;
import edu.brown.cs.student.main.Structures.Product;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class BloomFilterTest {
  @Test
  public void createBFTest() {
    List<Product> testProducts = new ArrayList<>();

    List<String> tags0 = Arrays.asList(new String[] {"sweater", "winter", "university", "vintage"});
    Product product0 = new Product(0, "vintage brown university sweater",  tags0, "clothing");
    testProducts.add(product0);

    List<String> tags1 = Arrays.asList(new String[] {"sweater", "winter", "sportswear", "columbia", "vintage"});
    Product product1 = new Product(1, "vintage mint green soft fleece columbia jacket", tags1, "clothing");
    testProducts.add(product1);

    List<String> tags2 = Arrays.asList(new String[] {"sweater", "fleece", "blue"});
    Product product2 = new Product(2, "north face blue fleece jacket",  tags2, "clothing");
    testProducts.add(product2);

    List<String> tags3 = Arrays.asList(new String[] {"casual", "dress"});
    Product product3 = new Product(3, "light blue sun dress", tags3, "clothing");
    testProducts.add(product3);

    List<String> tags4 = Arrays.asList(new String[] {"university", "vintage", "ring"});
    Product product4 = new Product(4, "vintage brown university class ring", tags4, "jewelry");
    testProducts.add(product4);

    RecommenderSystem recommender = new RecommenderSystem(testProducts);

    List<Integer> productRecommendations = recommender.generateBFRecommendations(product4, 5, 0.2, 20);

    int one = productRecommendations.get(0);
    int two = productRecommendations.get(1);
    int three = productRecommendations.get(2);
    int four = productRecommendations.get(3);

    assertEquals(productRecommendations.size(), 4);
    assertEquals(one, 0);
    assertEquals(two, 2);
    assertEquals(three, 1);
    assertEquals(four, 3);
  }
}
