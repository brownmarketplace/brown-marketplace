package java.edu.brown.cs.student.main;

//import edu.brown.cs.student.REPL.REPL;
//import edu.brown.cs.student.commands.Runners.APIRunner;
//import edu.brown.cs.student.commands.Runners.BloomFilterRunner;
//import edu.brown.cs.student.commands.Runners.DBRunner;
//import edu.brown.cs.student.commands.Runners.KDTreeRunner;
//import edu.brown.cs.student.commands.Runners.RecommenderRunner;
//import edu.brown.cs.student.commands.Runners.StarsRunner;
//import joptsimple.OptionParser;
//import joptsimple.OptionSet;

/**
 * The Main class of our project. This is where execution begins.
 */
public final class Main {

  // use port 4567 by default when running server
  private static final int DEFAULT_PORT = 4567;

  /**
   * The initial method called when execution begins.
   *
   * @param args An array of command line arguments
   */
  public static void main(String[] args) {
    new Main(args).run();
  }

  private String[] args;

  private Main(String[] args) {
    this.args = args;
  }

  /**
   * The java.main method of the program, this method
   * creates a new CSVReader object which
   * initializes the REPL.
   */
  private void run() {
    // set up parsing of command line flags
//    OptionParser parser = new OptionParser();
//
//    // "./run --gui" will start a web server
//    parser.accepts("gui");
//
//    // use "--port <n>" to specify what port on which the server runs
//    parser.accepts("port").withRequiredArg().ofType(Integer.class)
//        .defaultsTo(DEFAULT_PORT);
//
//    OptionSet options = parser.parse(args);
//    if (options.has("gui")) {
//      runSparkServer((int) options.valueOf("port"));
//    }

    System.out.println("Hello world");

    // instantiate REPL
//    REPL repl = new REPL();
//    // add commands
//    repl.addRunner(new StarsRunner());
//    repl.addRunner(new BloomFilterRunner());
//    repl.addRunner(new KDTreeRunner());
//    repl.addRunner(new DBRunner());
//    repl.addRunner(new APIRunner());
//    repl.addRunner(new RecommenderRunner());
//    // start REPL
//    repl.run();
  }

//  /**
//   * Starts a web server on the specified port.
//   *
//   * @param port the port on which the server will run
//   */
//  private void runSparkServer(int port) {
//    // set port to run the server on
//    Spark.port(port);
//
//    // specify location of static resources (HTML, CSS, JS, images, etc.)
//    Spark.externalStaticFileLocation("src/java.main/resources/static");
//  }
}
