package edu.brown.cs.student.main.server;

import com.google.common.collect.ImmutableMap;
import com.google.gson.Gson;
import edu.brown.cs.student.main.proxy.DbProxy;
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

  private DbProxy proxy;
  private RecommenderSystem recSys;
  private static final int RAND_FACTOR = 20;

  /**
   * Initialize the Server with database proxy.
   *
   * @param proxy the Firebase database proxy that performs query
   */
  public Server(DbProxy proxy) {
    this.proxy = proxy;
    ArrayList<Product> products = proxy.getProduct();
    this.recSys = new RecommenderSystem(products);
  }

  /**
   * Run the Server with given routes.
   *
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
    Spark.post("/userReq", new UserHandler());
    Spark.post("/recommend", new RecommendHandler());

    Spark.init();
  }

  /**
   * This handler uses post request to receive a JsonObject of user id, and performs the user liked
   * object query.
   */
  private class UserHandler implements Route {
    /**
     * This method loads the given user into the backend cache.
     *
     * @param req the request user id
     * @param res the response object
     * @return success message or an error code if the user id cannot be parsed
     */
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

      // Query for user id
      proxy.queryUser(id);
      System.out.println("User id received: " + id);

      return gson.toJson(ImmutableMap.of("result", "user id successfully read"));
    }
  }

  /**
   * This handler performs the recommendation and sends the results to the front end.
   */
  private class RecommendHandler implements Route {
    /**
     * Attempt to return a JSON object containing a list of recommended product ids.
     * Returns randomized recommended objects if the user liked information is not found.
     *
     * @param req the request object, not used
     * @param res the response object
     * @return list of product ids or an error code if the products are not loaded.
     */
    @Override
    public String handle(Request req, Response res) {
      Gson gson = new Gson();

      // Get products and liked-items from db
      ArrayList<Product> likedProducts = proxy.getLiked();

      // Recommend
      List<String> recommendedProducts;
      if (likedProducts == null) { // Random recommendations
        recommendedProducts = recSys.generateDefaultExploreRecommendations(6);
      } else { // Preference based recommendations
        recommendedProducts =
            recSys.generateRandomizedExploreRecommendations(3, RAND_FACTOR, likedProducts);
      }
      System.out.println("Recommendations are successfully sent!");

      return gson.toJson(ImmutableMap.of("result", recommendedProducts));
    }
  }
}
