package edu.brown.cs.student.Recommender;

import edu.brown.cs.student.Recommender.bloomFilter.BFRecommender;
import edu.brown.cs.student.Recommender.bloomFilter.XNORSimilarity;

import edu.brown.cs.student.Structures.Product;

import java.security.NoSuchAlgorithmException;
import java.util.List;

public class RecommenderSystem {
  private Product targetProduct;
  private List<Product> productsList;
  /**
   * This is the constructor of the RecommenderSystem class.
   *
   * @param product Product to generate recommendations for
   * @param productsList List of Product objects
   */
  public RecommenderSystem(Product product, List<Product> productsList) {
    this.targetProduct = product;
    this.productsList = productsList;
  }

  /**
   * This takes in a list of products and creates a bloom filter for each one based on its tags.
   * Then, it generates k recommendations for the target Product based off these bloom filters.
   *
   * @param k integer representing number of recommendations to be generated
   * @param falsePosRate double representing false positive rate for each bloom filter
   * @param maxNum integer representing max number of elements to be inserted into the bloom filter
   *
   * @return List of k most similar product recommendations for the target product
   */
  public List<Integer> generateBFRecommendations(int k, double falsePosRate, int maxNum) {
    // create bloom filters for each product in the list
    for (Product product: this.productsList) {
      product.generateBF(falsePosRate, maxNum);
    }
    // generate list of recommendations
    try {
      BFRecommender<Product> bfRecommender = new BFRecommender<Product>(this.productsList);
      Integer productID = this.targetProduct.getId();
      List<Integer> recommendedProducts = bfRecommender.generateRecommendations(productID, k,
          new XNORSimilarity(this.targetProduct));
      return recommendedProducts;
    } catch (NoSuchAlgorithmException e) {
      return null;
    }
  }
}
