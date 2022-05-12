package edu.brown.cs.student.main.dbProxy;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import edu.brown.cs.student.main.Structures.Product;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;
import java.util.Set;

public class dbProxy {

  private Set<String> _userLikes;
  private Map<String, Map<String, Object>> _productMap;

  public dbProxy(){
    _productMap = null;
    _userLikes = null;
//    _user = new User();
//    _productList = new ArrayList<Product>();

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
//        Set<String> purchased = ((Map<String, Object>) dataSnapshot.child("purchased-items").getValue()).keySet();
        _userLikes = ((Map<String, Object>) dataSnapshot.child("liked-items").getValue()).keySet();

//        for (String likedID: likes) {
//
//        }
//        _user.setListings(purchased);
//        _user.setLikes(likes);
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

    // get first 100 product reference
    //orderByChild("sold").limitToLast(100).
    productRef.orderByChild("sold").addListenerForSingleValueEvent(new ValueEventListener() {
      @Override
      public void onDataChange(DataSnapshot dataSnapshot) {
//        System.out.println(dataSnapshot.getValue());
        _productMap = (Map<String, Map<String, Object>>) dataSnapshot.getValue();
//        _productList.setProducts(products);
//        Iterator<DataSnapshot> products = dataSnapshot.getChildren().iterator();
//        while (products.hasNext()) {
//          System.out.println(products.next().getValue());
//        }
      }

      @Override
      public void onCancelled(DatabaseError error) {
        System.out.println(error);
      }
    });
  }

  public ArrayList<Product> getLiked(String id){

    this.queryUser(id);
    try {
      Thread.sleep(5000);
    } catch (Exception e) {
      System.out.println(e);
    }

    System.out.println(_userLikes);

    ArrayList<Product> likedList = new ArrayList<>();
    if (_productMap == null) {
      System.out.println("Error: failed to load the product information");
    } else if (_userLikes == null || _userLikes.size() == 0) {
      System.out.println("Error: failed to load the user information");
    } else {
      for (String productID : _productMap.keySet()) {
        Map<String, Object> temp = _productMap.get(productID);
        if (_userLikes.contains(productID)) {
          likedList.add(new Product(temp));
        }
      }
    }
    if (likedList.size() == 0) {
      return null;
    } else {
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
