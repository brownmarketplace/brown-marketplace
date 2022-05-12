package edu.brown.cs.student.main.server;

import com.google.common.collect.ImmutableMap;
import com.google.gson.Gson;
import edu.brown.cs.student.main.Recommender.RecommenderSystem;
import edu.brown.cs.student.main.Structures.Product;
import org.json.JSONException;
import org.json.JSONObject;
import edu.brown.cs.student.main.dbProxy.dbProxy;
import spark.Request;
import spark.Response;
import spark.Route;
import spark.Spark;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Server {

  private dbProxy _proxy;

  public Server(dbProxy proxy){
    _proxy = proxy;
  }

  public void runSparkServer(int port) {
    Spark.port(port);
    Spark.externalStaticFileLocation("src/main/resources/static");

    Spark.options("/*", (request, response) -> {
      String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
      if (accessControlRequestHeaders != null) {
        response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
      }

      String accessControlRequestMethod = request.headers("Access-Control-Request-Method");

      if (accessControlRequestMethod != null) {
        response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
      }

      return "OK";
    });

    Spark.before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));

    // Put Routes Here
    Spark.post("/recommend", new RecommendHandler());

    Spark.init();
  }


  /**
   * Attempt to update a row in a table.
   */
  private class RecommendHandler implements Route {
    @Override
    public String handle(Request req, Response res) {
      //initiate db
      Gson gson = new Gson();

      JSONObject reqJson;
      String id;

      try {
        // Parse the request's body
        reqJson = new JSONObject(req.body());
        id = reqJson.getString("user");
      } catch (JSONException e) {
        res.status(500);
        Map<String, String> error = ImmutableMap.of("error", "JSON is in the wrong format");
        return gson.toJson(error);
      }

      ArrayList<Product> products = _proxy.getProduct();
      RecommenderSystem recSys = new RecommenderSystem(products);

      ArrayList<Product> likedProducts = _proxy.getLiked(id);
      List<String> recommendedProducts;
//      if (likedProducts == null) {
//        recommendedProducts = recSys.generateDefaultExploreRecommendations(5);
//      } else {
//        recommendedProducts = recSys.generateRandomizedExploreRecommendations(3, 20, likedProducts);
//      }
      recommendedProducts = recSys.generateRandomizedExploreRecommendations(3, 20, likedProducts);

//      System.out.println(user.getPurchased());
//      System.out.println(products.getProducts());
//      Map<String, Object> tags = (Map<String, Object>) products.getProducts().get("p1").get("tags");
//      System.out.println(new ArrayList<String>(tags.keySet()));

      return gson.toJson(ImmutableMap.of("result", recommendedProducts));
    }
  }

}
