package edu.brown.cs.student.main.server;

import com.google.common.collect.ImmutableMap;
import com.google.gson.Gson;
import edu.brown.cs.student.main.dbProxy.dbProxy;
import spark.Request;
import spark.Response;
import spark.Route;
import spark.Spark;

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
    Spark.get("/explore", new ExploreHandler());
    Spark.init();
  }



  /**
   * This Route handles the /tables GET request. It expects no req body and no URL parameters.
   */
  private class ExploreHandler implements Route {

    /**
     * Attempt to return a JSON object containing a list of names of the tables in the currently
     * loaded database.
     * @param req the request object, not used
     * @param res the response object, not used
     * @return Stringified JSON containing a "names" key corresponding to a list of strings,
     *  or an error code if the database is not loaded.
     */
    @Override
    public String handle(Request req, Response res) {

      Gson gson = new Gson();
      // if create_dp is null, then the database proxy has not yet been loaded, so we just
      // return an error status.
      if (_proxy == null) {
        res.status(500);
        return gson.toJson(ImmutableMap.of("error", "database not loaded into backend"));
      }
//
//      // Will hold all of the table names
//      List<String> tableNames = new ArrayList<>();
//      ResultSet tables = proxy.executeSQLStatement(
//          "SELECT name FROM sqlite_master WHERE type='table'");
//      while (tables.next()) {
//        tableNames.add(tables.getString(1));
//      }

      Map<String, Object> resBody = ImmutableMap.of("names", "recommendation info placeholding");
      return gson.toJson(resBody);
    }
  }
}
