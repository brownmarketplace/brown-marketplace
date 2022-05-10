package edu.brown.cs.student.Recommender;

import edu.brown.cs.student.Recommender.bloomFilter.BFRecommender;
import edu.brown.cs.student.Recommender.bloomFilter.XNORSimilarity;
import edu.brown.cs.student.Structures.Product;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class RecommenderSystem {
  private List<Product> productsList;
  /**
   * This is the constructor of the RecommenderSystem class.
   *
   * @param productsList List of Products
   */
  public RecommenderSystem(List<Product> productsList) {
    this.productsList = productsList;
  }

  /**
   * This takes in a list of products and creates a bloom filter for each one based on its tags.
   * Then, it generates k recommendations for the target Product based off these bloom filters.
   *
   * @param targetProduct product to generate recommendations for
   * @param k integer representing number of recommendations to be generated
   * @param falsePosRate double representing false positive rate for each bloom filter
   * @param maxNum integer representing max number of elements to be inserted into the bloom filter
   *
   * @return List of k most similar product recommendations for the target product
   */
  public List<Integer> generateBFRecommendations(Product targetProduct, int k, double falsePosRate, int maxNum) {
    // create bloom filters for each product in the list
    for (Product product: this.productsList) {
      product.generateBF(falsePosRate, maxNum);
    }
    // generate list of recommendations
    try {
      BFRecommender<Product> bfRecommender = new BFRecommender<>(this.productsList);
      Integer productID = targetProduct.getId();
      List<Integer> recommendedProducts = bfRecommender.generateRecommendations(productID, k,
          new XNORSimilarity(targetProduct));
      return recommendedProducts;
    } catch (NoSuchAlgorithmException e) {
      return null;
    }
  }

  public List<Integer> generateDefaultExploreRecommendations(int numRecs) {
    List<Product> tempProducts = this.productsList;
    Collections.shuffle(tempProducts);
    List<Integer> exploreRecommendations = new ArrayList<>();

    for (int i = 0; i < numRecs; i++) {
      exploreRecommendations.add(tempProducts.get(i).getId());
    }

    return exploreRecommendations;
  }

  public List<Integer> generateRandomizedExploreRecommendations(int numRecs, int randFactor,
                                                      List<Product> likedProducts) {
    int numProducts = randFactor * numRecs;
    List<Integer> recommendationPool = new ArrayList<>();
    if (likedProducts.size() > numProducts) {
      for (int i = 0; i < likedProducts.size(); i++) {
        int rec = this.generateBFRecommendations(likedProducts.get(i), 1, .2, 20).get(0);
        recommendationPool.add(rec);
      }
    } else {
      for (int j = 0; j < numRecs; j++) {
        List<Integer> recs = this.generateBFRecommendations(likedProducts.get(j), 1, .2, 20);
        for (int k = 0; k < randFactor; k++) {
          int rec = recs.get(k);
          recommendationPool.add(rec);
        }
      }
    }
    Collections.shuffle(recommendationPool);
    List<Integer> exploreRecommendations = new ArrayList<>();
    for (int l = 0; l < numRecs; l++) {
      exploreRecommendations.add(recommendationPool.get(l));
    }
    return exploreRecommendations;
  }
}
