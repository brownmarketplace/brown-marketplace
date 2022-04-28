package Structures;

import java.util.List;

public class User {
  private int id;
  private String userName;
  private String actualName;
  private String profilePicUrl;
  private String email;
  private String classYear;
  private List<Integer> listings;
  private List<Integer> referrals;
  private List<Integer> wishList;
  private List<Integer> likedItems;
  private List<Integer> dislikedItems;
  private List<Integer> purchasedItems;

  public User(int id, String userName, String actualName, String profilePicUrl, String email,
              String classYear, List<Integer> listings, List<Integer> referrals,
              List<Integer> wishList, List<Integer> likedItems, List<Integer> dislikedItems,
              List<Integer> purchasedItems) {
    this.id = id;
    this.userName = userName;
    this.actualName = actualName;
    this.profilePicUrl = profilePicUrl;
    this.email = email;
    this.classYear = classYear;
    this.listings = listings;
    this.referrals = referrals;
    this.wishList = wishList;
    this.likedItems = likedItems;
    this.dislikedItems = dislikedItems;
    this.purchasedItems = purchasedItems;
  }

  public int getId() {
    return this.id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getUserName() {
    return this.userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public String getActualName() {
    return this.actualName;
  }

  public void setActualName(String actualName) {
    this.actualName = actualName;
  }

  public String getProfilePicUrl() {
    return this.profilePicUrl;
  }

  public void setProfilePicUrl(String profilePicUrl) {
    this.profilePicUrl = profilePicUrl;
  }

  public String getEmail() {
    return this.email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getClassYear() {
    return this.classYear;
  }

  public void setClassYear(String classYear) {
    this.classYear = classYear;
  }

  public List<Integer> getListings() {
    return this.listings;
  }

  public void setListings(List<Integer> listings) {
    this.listings = listings;
  }

  public List<Integer> getReferrals() {
    return this.referrals;
  }

  public void setReferrals(List<Integer> referrals) {
    this.referrals = referrals;
  }

  public List<Integer> getWishList() {
    return this.wishList;
  }

  public void setWishList(List<Integer> wishList) {
    this.wishList = wishList;
  }

  public List<Integer> getLikedItems() {
    return this.likedItems;
  }

  public void setLikedItems(List<Integer> likedItems) {
    this.likedItems = likedItems;
  }

  public List<Integer> getDislikedItems() {
    return this.dislikedItems;
  }

  public void setDislikedItems(List<Integer> dislikedItems) {
    this.dislikedItems = dislikedItems;
  }

  public List<Integer> getPurchasedItems() {
    return this.purchasedItems;
  }

  public void setPurchasedItems(List<Integer> purchasedItems) {
    this.purchasedItems = purchasedItems;
  }
}
