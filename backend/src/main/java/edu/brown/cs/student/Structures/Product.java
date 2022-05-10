package edu.brown.cs.student.Structures;

import edu.brown.cs.student.Recommender.bloomFilter.BFInsertable;
import edu.brown.cs.student.Recommender.bloomFilter.BloomFilter;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

/**
 * This class models a Product. Although a Product is instantiated from the fields relevant to the
 * recommender system (our primary backend functionality), the rest of the fields are still
 * maintained with getters and setters in the case of extended functionality in the future.
 */
public class Product implements BFInsertable {
  private int id;
  private String name;
  private String description;
  private Double price;
  private List<String> tags;
  private String category;
  private int sellerId;
  private List<String> pictureUrls;
  private String datePosted;
  private Boolean status;

  private BloomFilter bf;
  private double xnorSimilarity;

  /**
   * The constructor of Product. Since the overall dataset isn't being stored and consistently
   * updated in the back end, a Product is instantiated using only the fields relevant to the
   * recommender system.
   *
   * @param id the product id
   * @param name the name of the product
   * @param tags the list of the product's tags
   * @param category the category of the product
   */
  public Product(int id, String name, List<String> tags, String category) {
    this.id = id;
    this.name = name;
    this.tags = tags;
    this.category = category;
//    this.description = " ";
//    this.price = 0.0;
//    this.sellerId = 0;
//    this.pictureUrls = new ArrayList<>();
//    this.datePosted = "test";
//    this.status = true;
  }

  /**
   * This is the setter for the product id.
   *
   * @param id the product id
   */
  public void setId(int id) {
    this.id = id;
  }

  /**
   * This is the getter for the product name.
   *
   * @return the name of the product
   */
  public String getName() {
    return this.name;
  }

  /**
   * This is the setter for the product name.
   *
   * @param name the name of the product
   */
  public void setName(String name) {
    this.name = name;
  }

  /**
   * This is the getter for the product description.
   *
   * @return the product description
   */
  public String getDescription() {
    return this.description;
  }

  /**
   * This is the setter for the product description.
   *
   * @param description the product description
   */
  public void setDescription(String description) {
    this.description = description;
  }

  /**
   * This is the getter for the product price.
   *
   * @return the price of the product
   */
  public Double getPrice() {
    return this.price;
  }

  /**
   * This is the setter for the product price.
   *
   * @param price the price of the product
   */
  public void setPrice(Double price) {
    this.price = price;
  }

  /**
   * This is the getter for the product's list of tags.
   *
   * @return the list of the product's tags
   */
  public List<String> getTags() {
    return this.tags;
  }

  /**
   * This is the setter for the product's list of tags.
   *
   * @param tags the list of the product's tags
   */
  public void setTags(List<String> tags) {
    this.tags = tags;
  }

  /**
   * This is the getter for the product's category.
   *
   * @return the product's category
   */
  public String getCategory() {
    return this.category;
  }

  /**
   * This is the setter for the product's category.
   *
   * @param category the product's category
   */
  public void setCategory(String category) {
    this.category = category;
  }

  /**
   * This is the getter for the seller ID of the user who listed the product.
   *
   * @return the seller ID of the user who listed the product
   */
  public int getSellerId() {
    return this.sellerId;
  }

  /**
   * This is the setter for the seller ID of the user who listed the product.
   *
   * @param sellerId the seller ID of the user who listed the product
   */
  public void setSellerId(int sellerId) {
    this.sellerId = sellerId;
  }

  /**
   * This is the getter for the list of picture URLs for the product.
   *
   * @return a list of picture URLS
   */
  public List<String> getPictureUrls() {
    return this.pictureUrls;
  }

  /**
   * This is the setter for the list of picture URLs for the product.
   *
   * @param pictureUrls a list of picture URLs
   */
  public void setPictureUrls(List<String> pictureUrls) {
    this.pictureUrls = pictureUrls;
  }

  /**
   * This is the getter for the date that the product was listed.
   *
   * @return the date of the product's listing
   */
  public String getDatePosted() {
    return this.datePosted;
  }

  /**
   * This is the setter for the date that the product was listed.
   *
   * @param datePosted the date of the product's listing
   */
  public void setDatePosted(String datePosted) {
    this.datePosted = datePosted;
  }

  /**
   * This is the getter of the product's status (either available or unavailable).
   *
   * @return true if the product is available,
   *         false if the product is unavailable
   */
  public Boolean getStatus() {
    return this.status;
  }

  /**
   * This is the setter of the product's status.
   *
   * @param status the product's status, in regard to whether or not it's available
   */
  public void setStatus(Boolean status) {
    this.status = status;
  }

  /**
   * This method gets the attributes of the BFInsertable object. These are the attributes that are
   * used for the bloom filter.
   *
   * @return the list of attributes for the bloom filter
   */
  @Override
  public List<String> getAttributes() {
    List<String> attributes = new ArrayList<>();

    // split and add each word in the name of a product
    String[] wordsInName = this.name.trim().split(" ");
    for (String word: wordsInName) {
      if (!attributes.contains(word) && !word.equals(this.category)) {
        attributes.add(word);
      }
    }
    // add each tag to the list
    for (String tag : this.tags) {
      if (!attributes.contains(tag) && !tag.equals(this.category)) {
        attributes.add(tag);
      }
    }
    // add the product's category
    attributes.add(this.category);
    attributes.add(this.category + "weights0");
    attributes.add(this.category + "weights1");
    attributes.add(this.category + "weights2");

    // return the list of all individual attributes
    return attributes;
  }

  /**
   * This method generates a bloom filter for every product and stores the bloom filters
   * in an ArrayList.
   *
   * @param falsePositiveRate the desired false positive rate
   * @param maxNum the max number of elements to be inserted into the bf
   * @return
   */
  @Override
  public BloomFilter generateBF(double falsePositiveRate, int maxNum) {
    BloomFilter filter = new BloomFilter();
    filter.create(falsePositiveRate, maxNum);

    // insert every attribute of the product into its bloom filter
    for (String att : this.getAttributes()) {
      try {
        filter.add(att);
      } catch (NoSuchAlgorithmException e) {
        e.printStackTrace();
      }
    }
    this.bf = filter;
    return filter;
  }

  @Override
  public BloomFilter getBf() {
    return this.bf;
  }

  @Override
  public int getId() {
    return this.id;
  }

  public void setXNORSimilarity(double similarity) {
    this.xnorSimilarity = (double) similarity;
  }

  public double getXNORSimilarity() {
    return (double) this.xnorSimilarity;
  }
}
