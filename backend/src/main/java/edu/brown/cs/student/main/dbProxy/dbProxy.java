package edu.brown.cs.student.main.dbProxy;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.io.FileInputStream;
import java.io.IOException;

public class dbProxy {

  public dbProxy(){
    try {
      this.connectDb();
    } catch (IOException e) {
      System.out.println("Error: cannot connect to the firebase");
    }
//    this.retrieve("products");
//    this.retrieve("users/1");
    // TODO: parsing
    // Product: product name, list of tags, category
    // User: list of likes, list of bookmarks
  }

  private void connectDb() throws IOException {
    FileInputStream refreshToken = new FileInputStream("src/main/java/edu/brown/cs/student/main/resource/firebase-key.json");

    FirebaseOptions options = FirebaseOptions.builder()
        .setCredentials(GoogleCredentials.fromStream(refreshToken))
        .setDatabaseUrl("https://cs32-final-project-7a4b0-default-rtdb.firebaseio.com/")
        .build();

    FirebaseApp.initializeApp(options);
  }

  public void retrieve(String route){
    DatabaseReference ref = FirebaseDatabase.getInstance()
        .getReference("/" + route);

    ref.addListenerForSingleValueEvent(new ValueEventListener() {
      @Override
      public void onDataChange(DataSnapshot dataSnapshot) {
        Object document = dataSnapshot.getValue();
        System.out.println(document);
      }

      @Override
      public void onCancelled(DatabaseError error) {
      }
    });
  }
}
