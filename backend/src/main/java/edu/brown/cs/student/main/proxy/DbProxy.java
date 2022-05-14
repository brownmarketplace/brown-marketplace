package edu.brown.cs.student.main.proxy;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import edu.brown.cs.student.main.structures.Product;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;
import java.util.Set;

/**
 * This class creates a proxy for the Google Firebase that handles user and product query.
 */
public class DbProxy {

  private Set<String> userLikes;
  private Map<String, Map<String, Object>> productMap;
  private Boolean succeed;
  private static final int MAX_PRODUCT_NUM = 100;
  private static final int WAIT_TIME = 1000;

  /**
   * The proxy connects to database and cache the products.
   */
  public DbProxy() {
    productMap = null;
    userLikes = null;
    succeed = false;

    try {
      this.connectDb();
    } catch (IOException e) {
      System.out.println("Error: cannot connect to the firebase.");
    }

    this.queryProducts();
  }

  /**
   * The proxy connects to database.
   *
   * @throws IOException if the connection fails
   */
  private void connectDb() throws IOException {
    FileInputStream refreshToken = new FileInputStream("config/secret/firebase-key.json");

    FirebaseOptions options = FirebaseOptions.builder()
        .setCredentials(GoogleCredentials.fromStream(refreshToken))
        .setDatabaseUrl("https://cs32-final-project-7a4b0-default-rtdb.firebaseio.com/")
        .build();

    FirebaseApp.initializeApp(options);
  }

  /**
   * This method makes an user id query and sets the liked items of the user.
   *
   * @param id the user id
   */
  public void queryUser(String id) {
    DatabaseReference userRef = FirebaseDatabase.getInstance()
        .getReference("/users/" + id);

    // get the user reference
    userRef.addListenerForSingleValueEvent(new ValueEventListener() {
      /**
       * This async method performs query based on liked-items and store them as a set.
       *
       * @param dataSnapshot the map object returned from database
       */
      @Override
      public void onDataChange(DataSnapshot dataSnapshot) {
        userLikes = ((Map<String, Object>) dataSnapshot.child("liked-items").getValue()).keySet();
        succeed = true;
        System.out.println("User query succeed!");
      }

      /**
       * This method prints out the error message when the query is interrupted.
       *
       * @param error database
       */
      @Override
      public void onCancelled(DatabaseError error) {
        System.out.println(error);
      }
    });
  }

  /**
   * This method makes a product query and stores the products in a map.
   */
  public void queryProducts() {
    DatabaseReference productRef = FirebaseDatabase.getInstance()
        .getReference("/products");

    // Prioritize products that are not sold
    productRef.orderByChild("sold").addListenerForSingleValueEvent(new ValueEventListener() {
      @Override
      /**
       * This async method performs query based on all the products and store them as a map.
       *
       * @param dataSnapshot the map object returned from database
       */
      public void onDataChange(DataSnapshot dataSnapshot) {
        productMap = (Map<String, Map<String, Object>>) dataSnapshot.getValue();
        succeed = true;
        System.out.println("Product query succeed!");
      }

      /**
       * This method prints out the error message when the query is interrupted.
       *
       * @param error database
       */
      @Override
      public void onCancelled(DatabaseError error) {
        System.out.println(error);
      }
    });
  }

  /**
   * This method waits for the async calls to the database until successful queries are made.
   */
  public void waitSucceed() {
    synchronized (succeed) {
      while (!succeed) {
        try {
          succeed.wait(WAIT_TIME);
        } catch (InterruptedException e) {
          System.out.println("Error: cannot load from database.");
        }
      }
    }
    succeed = false;
  }

  /**
   * This method waits for the async calls to the database until successful queries are made.
   *
   * @return an arraylist of liked product (null if cannot find the user like items)
   */
  public ArrayList<Product> getLiked() {
    this.waitSucceed();
    // Check if there exists liked items
    if (userLikes.size() == 0) {
      return null;
    } else { // Match the liked items with product info
      ArrayList<Product> likedList = new ArrayList<>();
      for (String productID : productMap.keySet()) {
        Map<String, Object> temp = productMap.get(productID);
        if (userLikes.contains(productID)) {
          likedList.add(new Product(temp));
        }
      }
      return likedList;
    }
  }

  /**
   * This methods gets the products from the stored product map to generate an unsold product list.
   *
   * @return an arraylist of unsold product (max size 100)
   */
  public ArrayList<Product> getProduct() {
    this.waitSucceed();
    int count = 0;
    ArrayList<Product> productList = new ArrayList<>();
    for (String id : productMap.keySet()) {
      Map<String, Object> temp = productMap.get(id);
      if (temp.get("sold").equals("false")) {
        productList.add(new Product(temp));
        count++;
      }
      if (count >= MAX_PRODUCT_NUM) {
        break;
      }
    }
    return productList;
  }
}
