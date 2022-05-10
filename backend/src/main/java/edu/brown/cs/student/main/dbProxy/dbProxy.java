package edu.brown.cs.student.main.dbProxy;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.Query;
import com.google.firebase.database.ValueEventListener;
import edu.brown.cs.student.main.instances.User;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class dbProxy {

  public dbProxy(){
    try {
      this.connectDb();
    } catch (IOException e) {
      System.out.println("Error: cannot connect to the firebase");
    }

    //this.getUser("1");
    this.getProducts();
//    this.retrieve("products");
    //this.retrieve("users");
    // TODO: parsing
    // Product: product name, list of tags, category
    // User: list of likes

    // products: an interface/class with methods like getName, getID, etc
    // input: arraylist of products
    // output: arraylist of product ids
  }

  private void connectDb() throws IOException {
    FileInputStream refreshToken = new FileInputStream("src/main/java/edu/brown/cs/student/main/resource/firebase-key.json");

    FirebaseOptions options = FirebaseOptions.builder()
        .setCredentials(GoogleCredentials.fromStream(refreshToken))
        .setDatabaseUrl("https://cs32-final-project-7a4b0-default-rtdb.firebaseio.com/")
        .build();

    FirebaseApp.initializeApp(options);
  }

  // User:
  // /users/1/liked-item
  // /users/1/listings

  public void getUser(String id){
    DatabaseReference userRef = FirebaseDatabase.getInstance()
        .getReference("/users/" + id);

    // get the user reference
    userRef.addListenerForSingleValueEvent(new ValueEventListener() {
      @Override
      public void onDataChange(DataSnapshot dataSnapshot) {
        List<String> listings = (List<String>) dataSnapshot.child("listings").getValue();
        System.out.println(listings);
        System.out.println(listings.get(1));
//        Object listings = dataSnapshot.child("listings").getValue();
//        System.out.println(listings);
        Object likes = dataSnapshot.child("liked-items").getValue();
        System.out.println(likes);

        System.out.println("hi");
//        List<String> liked = (List<String>) dataSnapshot.child("liked-items").getValue();
//        System.out.println(liked);
//        System.out.println("hii");
      }

      @Override
      public void onCancelled(DatabaseError error) {
        System.out.println(error);
      }
    });
  }


  public void getProducts(){
    DatabaseReference productRef = FirebaseDatabase.getInstance()
        .getReference("/products");

    // get first 100 product reference
    //orderByChild("sold").limitToLast(100).
    productRef.addListenerForSingleValueEvent(new ValueEventListener() {
      @Override
      public void onDataChange(DataSnapshot dataSnapshot) {
        Iterator<DataSnapshot> products = dataSnapshot.getChildren().iterator();
        while (products.hasNext()) {
          System.out.println(products.next().getValue());
        }
      }

      @Override
      public void onCancelled(DatabaseError error) {
        System.out.println(error);
      }
    });
  }
}
