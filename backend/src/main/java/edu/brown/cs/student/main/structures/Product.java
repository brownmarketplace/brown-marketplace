package edu.brown.cs.student.main.structures;

import edu.brown.cs.student.main.recommender.bloomFilter.BFInsertable;
import edu.brown.cs.student.main.recommender.bloomFilter.BloomFilter;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * This class models a Product. Although a Product is instantiated from the fields relevant to the
 * recommender system (our primary backend functionality), the rest of the fields are still
 * maintained with getters and setters in the case of extended functionality in the future.
 */
public class Product implements BFInsertable {
  private Map<String, Object> attributes;
  private BloomFilter bf;
//  private double xnorSimilarity;

  /**
   * The constructor of Product. Since the overall dataset isn't being stored and consistently
   * updated in the back end, a Product is instantiated using only the fields relevant to the
   * recommender system.
   */
  public Product(Map<String, Object> attributes) {
    this.attributes = attributes;
  }


  @Override
  public String getId() {
    return (String) (this.attributes.get("id"));
  }


  /**
   * This method gets the attributes of the BFInsertable object. These are the attributes that are
   * used for the bloom filter.
   *
   * @return the list of attributes for the bloom filter
   */
  @Override
  public List<String> getAttributes() {
    List<String> bfAttributes = new ArrayList<>();

    String name = (String) this.attributes.get("name");
    String category = (String) this.attributes.get("category");
    String subCategory = (String) this.attributes.get("sub-category");
    ArrayList<String> tags = new ArrayList<String> (((Map<String, Object>) this.attributes.get("tags")).keySet());

    // split and add each word in the name of a product
    String[] wordsInName = name.trim().split(" ");
    for (String word: wordsInName) {
      if (!bfAttributes.contains(word) && !word.equals(category) && !word.equals(subCategory)) {
        bfAttributes.add(word);
      }
    }
    // add each tag to the list
    for (String tag : tags) {
      if (!bfAttributes.contains(tag) && !tag.equals(category) && !tag.equals(subCategory)) {
        bfAttributes.add(tag);
      }
    }
    // add the product's category
    bfAttributes.add(category);
    bfAttributes.add(category + "weights0");

    bfAttributes.add(subCategory);
    bfAttributes.add(subCategory + "weights0");
    bfAttributes.add(subCategory + "weights1");
    bfAttributes.add(subCategory + "weights2");

    // return the list of all individual bfAttributes
    return bfAttributes;
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

//  public void setXNORSimilarity(double similarity) {
//    this.xnorSimilarity = (double) similarity;
//  }
}