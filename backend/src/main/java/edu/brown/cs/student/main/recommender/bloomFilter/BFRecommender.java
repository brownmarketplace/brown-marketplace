package edu.brown.cs.student.main.recommender.bloomFilter;

import java.security.NoSuchAlgorithmException;
import java.util.AbstractQueue;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.PriorityQueue;

/**
 * @param <T> generic type variable
 *            This class represents the Bloom Filter recommender system. It creates and stores all
 *            bloom filters for all products.
 */
public class BFRecommender<T extends BFInsertable> {
  private List<T> allProducts;
  private String productID;
  private T targetProduct;
  private int numSimilarProducts;
  private final double falsePositiveRate = 0.1;
  private int maxNumElements;
  private AbstractQueue<T> sortedProducts;

  /**
   * This is the BF Recommender constructor. It creates a recommender that generates k similar
   * products based on their bloom filters.
   *
   * @param products a list of generic type variable T
   */
  public BFRecommender(List<T> products) {
    this.allProducts = products;
  }

  /**
   * This method calculates the maximum number of elements that will be inserted into the bloom
   * filter based on the largest number of attribute values possessed by a product.
   *
   * @return a integer that represents the maximum number of elements
   */
  public int calculateMaxNum() {
    // loop through all products and find the max number of attribute values
    int maxNum = 0;
    for (T s : this.allProducts) {
      int currNum = s.getAttributes().size();
      maxNum = Math.max(maxNum, currNum);
    }
    return maxNum;
  }

  /**
   * This method generates a bloom filter for every product and stores the bloom filters
   * in an arraylist.
   *
   * @param products a list of students for which to generate bloom filters
   * @return a list of bloom filters for all products
   * @throws NoSuchAlgorithmException thrown when a particular cryptographic algorithm is requested
   * but is not available in the environment
   */
  public List<BloomFilter> generateBF(List<T> products)
      throws NoSuchAlgorithmException {
    List<BloomFilter> filters = new ArrayList<>();
    this.maxNumElements = this.calculateMaxNum();
    for (T s : products) {
      //initialize bloom filter
      filters.add(s.generateBF(this.falsePositiveRate, this.maxNumElements));
    }
    return filters;
  }

  /**
   * This method finds the target product given the product ID.
   *
   * @return the target product
   */
  public T findTargetProduct() {
    for (T s : this.allProducts) {
      if (s.getId().equals(this.productID)) {
        return s;
      }
    }
    return null;
  }

  /**
   * This method generates recommendations of k similar products to a given product. It prints
   * out the IDs of the k recommended products.
   *
   * @param iD  the product ID
   * @param k   the number of similar products to be recommended
   * @param com the comparator used to compare the products
   * @return a list of k similar products (declared generic type variable T)
   * @throws NoSuchAlgorithmException thrown when a particular cryptographic algorithm is requested
   * but is not available in the environment
   */
  public List<String> generateRecommendations(String iD, int k, Comparator com)
      throws NoSuchAlgorithmException {
    // set parameters
    this.productID = iD;
    this.numSimilarProducts = k;
    this.targetProduct = this.findTargetProduct();
    this.sortedProducts = new PriorityQueue<T>(this.allProducts.size(), com);
    List<String> kSimilarProducts = new ArrayList<>();

    // remove target product from the list of products
    this.allProducts.remove(this.targetProduct);
    //add all products except for the target product to the priority queue
    for (T s : this.allProducts) {
      this.sortedProducts.add(s);
    }

    // get the k most similar products
    int count = 0;

    // check if k is greater than the number of products
    if (this.numSimilarProducts > this.allProducts.size()) {
      this.numSimilarProducts = this.allProducts.size();
    }

    // add k similar products to an ArrayList
    while (count < this.numSimilarProducts) {
      T currStudent = this.sortedProducts.poll();
      kSimilarProducts.add(currStudent.getId());
      count++;
    }

    // add target product back to the list of products
    this.allProducts.add(this.targetProduct);
    return kSimilarProducts;
  }

  /**
   * This getter method returns the list of products for the REPL to use.
   * @return a list of products, declared generic type variable T.
   */
  public List<T> getAllProducts() {
    return this.allProducts;
  }
}
