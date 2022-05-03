package Recommender;

import Structures.Product;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class RecommenderSystem {
  private List<Product> testProducts;

  /**
   * This is the constructor of the RecommenderSystem class.
   */
  public RecommenderSystem() {
    this.createTestData();
  }

  /**
   * This creates the mock data that will be used to temporarily test the functionality of the
   * recommender system methods.
   */
  private void createTestData() {
    this.testProducts = new ArrayList<>();
    List<String> tags0 = Arrays.asList(new String[] {"A", "B"});
//    Product sample0 = new Product("0", "north face blue fleece jacket", "north face black fleece " +
//        "full zip jacket, zip pockets, size large, good used condition", 40, tags0, );
    System.out.println(tags0);
  }
}
