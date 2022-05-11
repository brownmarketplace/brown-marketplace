package edu.brown.cs.student.main.dbProxy;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import edu.brown.cs.student.main.instances.Products;
import edu.brown.cs.student.main.instances.User;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Map;
import java.util.Set;

public class dbProxy {

  private User _user;
  private Products _products;

  public dbProxy(){
    _user = new User();
    _products = new Products();

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
        Set<String> purchased = ((Map<String, Object>) dataSnapshot.child("purchased-items").getValue()).keySet();
        Set<String> likes = ((Map<String, Object>) dataSnapshot.child("liked-items").getValue()).keySet();
        _user.setListings(purchased);
        _user.setLikes(likes);
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
    productRef.addListenerForSingleValueEvent(new ValueEventListener() {
      @Override
      public void onDataChange(DataSnapshot dataSnapshot) {
//        System.out.println(dataSnapshot.getValue());
        Map<String, Map<String, Object>> products =
            (Map<String, Map<String, Object>>) dataSnapshot.getValue();
        _products.setProducts(products);
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

  public User getUser(String id){
    this.queryUser(id);
    return _user;
  }

  public Products getProduct(){
    return _products;
  }
}
