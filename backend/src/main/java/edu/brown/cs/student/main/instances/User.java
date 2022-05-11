package edu.brown.cs.student.main.instances;

import java.util.Set;

public class User {

  private Set<String> _purchased;
  private Set<String> _likes;

  public User() {
  }

  public void setListings(Set<String> purchased){
    _purchased = purchased;
  }

  public void setLikes(Set<String> likes){
    _likes = likes;
  }

  public Set<String> getLikes(){
    return _likes;
  }

  public Set<String> getPurchased(){
    return _purchased;
  }
}