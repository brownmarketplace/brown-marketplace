package edu.brown.cs.student.main.Recommender;

import edu.brown.cs.student.main.Recommender.bloomFilter.BFRecommender;
import edu.brown.cs.student.main.Recommender.bloomFilter.XNORSimilarity;
import edu.brown.cs.student.main.Structures.Product;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * This is the RecommenderSystem class. It handles generating recommended items for the explore
 * page.
 */
public class RecommenderSystem {
  private List<Product> productsList;
  private List<String> currentRecommendations;
  private static final double BF_FALSE_POS_RATE = 0.2;
  private static final int BF_MAX_NUM = 30;
  /**
   * This is the constructor of the RecommenderSystem class. It takes in the overall list of
   * products from which we will generate recommendations.
   *
   * @param productsList List of Products
   */
  public RecommenderSystem(List<Product> productsList) {
    this.productsList = productsList;

    for (Product product: this.productsList) {
      product.generateBF(BF_FALSE_POS_RATE, BF_MAX_NUM);
    }
  }

  /**
   * This takes in a list of products and creates a bloom filter for each one based on its tags.
   * Then, it generates k recommendations for the target Product based off these bloom filters.
   *
   * @param targetProduct product to generate recommendations for
   * @param k integer representing number of recommendations to be generated
   *
   * @return List of k most similar product recommendations for the target product
   */
  public List<String> generateBFRecommendations(Product targetProduct, int k) {
    // if the target does not have a bloom filter, generate it
    if (targetProduct.getBf() == null) {
      targetProduct.generateBF(BF_FALSE_POS_RATE, BF_MAX_NUM);
    }
    // generate list of recommendations
    try {
      BFRecommender<Product> bfRecommender = new BFRecommender<>(this.productsList);
      String productID = targetProduct.getId();
      List<String> recommendedProducts = bfRecommender.generateRecommendations(productID, k,
          new XNORSimilarity(targetProduct));
      return recommendedProducts;
    } catch (NoSuchAlgorithmException e) {
      return null;
    }
  }

  /**
   * This generates a list of default recommendations that are not specific to any user. These
   * recommendations can be displayed on the website when a user is not logged in. This method
   * randomly gets items from the overall list of products.
   *
   * @param numRecs number of recommendations to be generated
   * @return the list of recommended items to display on the explore page
   */
  public List<String> generateDefaultExploreRecommendations(int numRecs) {
    List<Product> tempProducts = this.productsList;
    Collections.shuffle(tempProducts);
    List<String> exploreRecommendations = new ArrayList<>();
    int count = 0;
    for (int i = 0; (i < tempProducts.size() && count < numRecs); i++) {
      String productID = tempProducts.get(i).getId();
      // check if the product is already in the recommendations list
      if (!exploreRecommendations.contains(productID)) {
        exploreRecommendations.add(tempProducts.get(i).getId());
        count++;
      }
    }

    return exploreRecommendations;
  }

  /**
   * This generates a list of recommendations based on a user's list of liked products. Rather than
   * returning the most similar items of all the liked products, it generates multiple
   * recommendations from each of the liked products evenly, before randomly selecting the number
   * we need from the shuffled recommendation pool. This ensures that the user gets varied
   * recommendations (that are still based on individual preferences) when refreshing the page.
   *
   * @param numRecs the number of recommendations to show on the explore page
   * @param randFactor factor that determines how varied the products will be between refreshes
   * @param likedProducts the list of the user's liked products
   * @return the list of the recommended product IDs
   */
  public List<String> generateRandomizedExploreRecommendations(int numRecs, int randFactor,
                                                      List<Product> likedProducts) {
    // the "recommendation pool" of similar items
    List<String> recommendationPool = new ArrayList<>();
    // the total size of the "recommendation pool" that we will select products from
    int recPoolSize = randFactor * numRecs;
    if (likedProducts.size() > recPoolSize) {
      for (int i = 0; i < likedProducts.size(); i++) {
        String rec = this.generateBFRecommendations(likedProducts.get(i), 1).get(0);
        recommendationPool.add(rec);
      }
    } else {
      int recsPerProduct = recPoolSize / likedProducts.size();
      for (int j = 0; j < likedProducts.size(); j++) {
        List<String> recs = this.generateBFRecommendations(likedProducts.get(j), recsPerProduct);
        for (int k = 0; k < recsPerProduct; k++) {
          String rec = recs.get(k);
          recommendationPool.add(rec);
        }
      }
    }
    Collections.shuffle(recommendationPool);
    List<String> exploreRecommendations = new ArrayList<>();
    int count = 0;

    // gets items from the recommendation pool until count reaches the requested number of recs
    for (int l = 0; (l < recommendationPool.size() && count < numRecs); l++) {
      String recommendation = recommendationPool.get(l);
      if ((this.currentRecommendations == null
          || !this.currentRecommendations.contains(recommendation))
          && !exploreRecommendations.contains(recommendation)) {
        exploreRecommendations.add(recommendationPool.get(l));
        count++;
      }
    }
    this.currentRecommendations = exploreRecommendations;
    return exploreRecommendations;
  }
}
