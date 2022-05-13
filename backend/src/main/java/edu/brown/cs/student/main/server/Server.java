package edu.brown.cs.student.main.server;

import com.google.common.collect.ImmutableMap;
import com.google.gson.Gson;
import edu.brown.cs.student.main.proxy.dbProxy;
import edu.brown.cs.student.main.recommender.RecommenderSystem;
import edu.brown.cs.student.main.structures.Product;
import org.json.JSONException;
import org.json.JSONObject;

import spark.Request;
import spark.Response;
import spark.Route;
import spark.Spark;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * This class sets up a Spark server that connects the recommender to the frontend.
 */
public class Server {

  private dbProxy _proxy;

  /**
   * Initialize the Server with database proxy.
   * @param proxy the Firebase database proxy that performs query
   */
  public Server(dbProxy proxy){
    _proxy = proxy;
  }

  /**
   * Run the Server with given routes.
   * @param port the port number that the server runs on
   */
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
   * This handler uses post request to receive a JsonObject of user id, and returns an immutable map
   * containing recommended product ids to the front end.
   */
  private class RecommendHandler implements Route {
    @Override
    public String handle(Request req, Response res) {
      Gson gson = new Gson();

      JSONObject reqJson;
      String id;
      // Parse for user id
      try {
        reqJson = new JSONObject(req.body());
        id = reqJson.getString("user");
      } catch (JSONException e) {
        res.status(500);
        Map<String, String> error = ImmutableMap.of("error", "JSON is in the wrong format");
        return gson.toJson(error);
      }
      System.out.println("User id received: " + id);

      // Get products and liked-items from db
      ArrayList<Product> products = _proxy.getProduct();
      ArrayList<Product> likedProducts = _proxy.getLiked(id);

      // Recommend
      RecommenderSystem recSys = new RecommenderSystem(products);
      List<String> recommendedProducts;
      if (likedProducts == null) { // Random recommendations
        recommendedProducts = recSys.generateDefaultExploreRecommendations(6);
      } else { // Preference based recommendations
        recommendedProducts = recSys.generateRandomizedExploreRecommendations(3, 20, likedProducts);
      }
      System.out.println("Recommendations are successfully sent! \n");

      return gson.toJson(ImmutableMap.of("result", recommendedProducts));
    }
  }

}
