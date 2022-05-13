package edu.brown.cs.student.main.dbProxy;

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

public class dbProxy {

  private Set<String> _userLikes;
  private Map<String, Map<String, Object>> _productMap;
  private Boolean _succeed;

  public dbProxy(){
    _productMap = null;
    _userLikes = null;
    _succeed = false;

    try {
      this.connectDb();
    } catch (IOException e) {
      System.out.println("Error: cannot connect to the firebase");
    }

    this.queryProducts();
  }

  private void connectDb() throws IOException {
    FileInputStream refreshToken = new FileInputStream("src/main/java/edu/brown/cs/student/main/resource/firebase-key.json");

    FirebaseOptions options = FirebaseOptions.builder()
        .setCredentials(GoogleCredentials.fromStream(refreshToken))
        .setDatabaseUrl("https://cs32-final-project-7a4b0-default-rtdb.firebaseio.com/")
        .build();

    FirebaseApp.initializeApp(options);
  }


  public void queryUser(String id){
    DatabaseReference userRef = FirebaseDatabase.getInstance()
        .getReference("/users/" + id);

    // get the user reference
    userRef.addListenerForSingleValueEvent(new ValueEventListener() {
      @Override
      public void onDataChange(DataSnapshot dataSnapshot) {
        _userLikes = ((Map<String, Object>) dataSnapshot.child("liked-items").getValue()).keySet();
        _succeed = true;
      }

      @Override
      public void onCancelled(DatabaseError error) {
        System.out.println(error);
      }
    });
  }

  public void queryProducts(){
    DatabaseReference productRef = FirebaseDatabase.getInstance()
        .getReference("/products");

    productRef.orderByChild("sold").addListenerForSingleValueEvent(new ValueEventListener() {
      @Override
      public void onDataChange(DataSnapshot dataSnapshot) {
        _productMap = (Map<String, Map<String, Object>>) dataSnapshot.getValue();
      }

      @Override
      public void onCancelled(DatabaseError error) {
        System.out.println(error);
      }
    });
  }

  public ArrayList<Product> getLiked(String id){
    // Get user liked-items from db
    this.queryUser(id);
    // Wait for db loading
    synchronized (_succeed) {
      while (!_succeed) {
        try {
          _succeed.wait(1000);
        } catch (InterruptedException e) {
          System.out.println("Error: cannot load the users.");
        }
      }
    }
    _succeed = false;

    // Check if products are loaded
    if (_productMap == null) {
      System.out.println("Error: failed to load the product information");
      return null;
    }
    // Check if there exists liked items
    else if (_userLikes == null || _userLikes.size() == 0) {
      return null;
    }
    // Match the liked items with product info
    else {
      ArrayList<Product> likedList = new ArrayList<>();
      for (String productID : _productMap.keySet()) {
        Map<String, Object> temp = _productMap.get(productID);
        if (_userLikes.contains(productID)) {
          likedList.add(new Product(temp));
        }
      }
      return likedList;
    }
  }

  public ArrayList<Product> getProduct(){
    int count = 0;
    ArrayList<Product> productList = new ArrayList<>();
    for (String id : _productMap.keySet()) {
      Map<String, Object> temp = _productMap.get(id);
      if (temp.get("sold").equals("false")) {
        productList.add(new Product(temp));
        count++;
      }
      if (count >= 100) {
        break;
      }
    }
    return productList;
  }
}
