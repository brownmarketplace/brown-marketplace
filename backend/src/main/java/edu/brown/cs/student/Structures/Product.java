package edu.brown.cs.student.Structures;

import edu.brown.cs.student.Recommender.bloomFilter.BFInsertable;
import edu.brown.cs.student.bloomFilter.BloomFilter;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

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
  private String status;

  private BloomFilter bf;
  private double xnorSimilarity;

  public Product(int id, String name, String description, Double price, List<String> tags,
                 String category, int sellerId, List<String> pictureUrls, String datePosted,
                 String status) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.tags = tags;
    this.category = category;
    this.sellerId = sellerId;
    this.pictureUrls = pictureUrls;
    this.datePosted = datePosted;
    this.status = status;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return this.description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Double getPrice() {
    return this.price;
  }

  public void setPrice(Double price) {
    this.price = price;
  }

  public List<String> getTags() {
    return this.tags;
  }

  public void setTags(List<String> tags) {
    this.tags = tags;
  }

  public String getCategory() {
    return this.category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public int getSellerId() {
    return this.sellerId;
  }

  public void setSellerId(int sellerId) {
    this.sellerId = sellerId;
  }

  public List<String> getPictureUrls() {
    return this.pictureUrls;
  }

  public void setPictureUrls(List<String> pictureUrls) {
    this.pictureUrls = pictureUrls;
  }

  public String getDatePosted() {
    return this.datePosted;
  }

  public void setDatePosted(String datePosted) {
    this.datePosted = datePosted;
  }

  public String getStatus() {
    return this.status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  @Override
  public List<String> getAttributes() {
    List<String> attributes = new ArrayList<>();

    attributes.add(this.name);

    for (String tag : this.tags) {
      attributes.add(tag);
    }
    return attributes;
  }

  @Override
  public BloomFilter generateBF(double falsePositiveRate, int maxNum) {
    BloomFilter filter = new BloomFilter();
    filter.create(falsePositiveRate, maxNum);

    //insert every attribute of the student into their bloom filter
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
