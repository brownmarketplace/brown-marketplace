package edu.brown.cs.student.main.instances;

import java.util.ArrayList;

public class User {

//  public static ArrayList<String> _liked;
  public static ArrayList<String> _listings;

  public User(ArrayList<String> listings) {
//    _liked = liked;
    _listings = listings;
    System.out.println(_listings);
  }
}