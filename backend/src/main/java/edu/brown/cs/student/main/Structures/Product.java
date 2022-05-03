package edu.brown.cs.student.main.Structures;

import java.util.List;

public class Product {
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
  private int liked;
  private int bookmarked;
  private int disliked;

  public Product(int id, String name, String description, Double price, List<String> tags,
                 String category, int sellerId, List<String> pictureUrls, String datePosted,
                 String status, int liked, int bookmarked, int disliked) {
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
    this.liked = liked;
    this.bookmarked = bookmarked;
    this.disliked = disliked;
  }

  public int getId() {
    return this.id;
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

  public int getLiked() {
    return this.liked;
  }

  public void setLiked(int liked) {
    this.liked = liked;
  }

  public int getBookmarked() {
    return this.bookmarked;
  }

  public void setBookmarked(int bookmarked) {
    this.bookmarked = bookmarked;
  }

  public int getDisliked() {
    return this.disliked;
  }

  public void setDisliked(int disliked) {
    this.disliked = disliked;
  }
}
