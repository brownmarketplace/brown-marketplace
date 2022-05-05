package edu.brown.cs.student.main.BFTests;

import org.junit.Test;
import static org.junit.Assert.assertEquals;

import edu.brown.cs.student.Recommender.RecommenderSystem;
import edu.brown.cs.student.Structures.Product;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class BloomFilterTest {
  @Test
  public void createBFTest() {
    List<Product> testProducts = new ArrayList<>();

    List<String> tags0 = Arrays.asList(new String[] {"sweater", "winter", "university", "vintage"});
    Product product0 = new Product(0, "vintage brown university sweater", "good condition, size small",
        20.0, tags0, "women's clothing", 0, new ArrayList<String>(), "4/4/2022", "available");
    testProducts.add(product0);

    List<String> tags1 = Arrays.asList(new String[] {"sweater", "winter", "sportswear", "columbia", "vintage"});
    Product product1 = new Product(1, "vintage mint green soft fleece columbia jacket", "size medium," +
        " 100% polyester", 20.0, tags1, "women's clothing", 0, new ArrayList<String>(), "4/4/2022",
        "available");
    testProducts.add(product1);

    List<String> tags2 = Arrays.asList(new String[] {"sweater", "fleece", "blue"});
    Product product2 = new Product(2, "north face blue fleece jacket", "north face black fleece full" +
        " zip jacket, zip pockets, size large, good used condition", 20.0, tags2, "women's clothing", 0,
        new ArrayList<String>(), "4/4/2022", "available");
    testProducts.add(product2);

    RecommenderSystem recommender = new RecommenderSystem(product0, testProducts);
    List<Integer> productRecommendations = recommender.generateBFRecommendations(1, 0.2, 10);

    assertEquals(productRecommendations.get(0), 1);
  }
}
