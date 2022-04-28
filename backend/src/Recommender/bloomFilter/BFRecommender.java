package Recommender.bloomFilter;

import java.security.NoSuchAlgorithmException;
import java.util.AbstractQueue;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.PriorityQueue;

/**
 * @param <T> generic type variable
 *            This class represents the Bloom Filter recommender system. It creates and stores all
 *            bloom filters for all students.
 */
public class BFRecommender<T extends BFInsertable> {
  private List<T> allStudents;
  private int studentID;
  private T targetStudent;
  private int numSimilarStudents;
  private final double falsePositiveRate = 0.1;
  private int maxNumElements;
  private AbstractQueue<T> sortedStudents;

  /**
   * This is the BF Recommender constructor. It creates a recommender that generates k similar
   * students based on their bloom filters.
   *
   * @param students a list of generic type variable T
   */
  public BFRecommender(List<T> students) {
    this.allStudents = students;
  }

  /**
   * This method calculates the maximum number of elements that will be inserted into the bloom
   * filter based on the largest number of attribute values possessed by a student.
   *
   * @return a integer that represents the maximum number of elements
   */
  public int calculateMaxNum() {
    //loop through all students and find the max number of attribute values
    int maxNum = 0;
    for (T s : this.allStudents) {
      int currNum = s.getAttributes().size();
      maxNum = Math.max(maxNum, currNum);
    }
    return maxNum;
  }

  /**
   * This method generates a bloom filter for every student and stores the bloom filters
   * in an arraylist.
   *
   * @param students a list of students for which to generate bloom filters
   * @return a list of bloom filters for all students
   * @throws NoSuchAlgorithmException thrown when a particular cryptographic algorithm is requested
   * but is not available in the environment
   */
  public List<BloomFilter> generateBF(List<T> students)
      throws NoSuchAlgorithmException {
    List<BloomFilter> filters = new ArrayList<>();
    this.maxNumElements = this.calculateMaxNum();
    for (T s : students) {
      //initialize bloom filter
      filters.add(s.generateBF(this.falsePositiveRate, this.maxNumElements));
    }
    return filters;
  }

  /**
   * This method finds the target student given the student ID.
   *
   * @return the target student
   */
  public T findTargetStudent() {
    for (T s : this.allStudents) {
      if (s.getId() == this.studentID) {
        return s;
      }
    }
    return null;
  }

  /**
   * This method generates recommendations of k similar students to a given student. It prints
   * out the IDs of the k recommended students to the terminal.
   *
   * @param iD  the student ID
   * @param k   the number of similar students to be recommended
   * @param com the comparator used to compare the students
   * @return a list of k similar students (declared generic type variable T)
   * @throws NoSuchAlgorithmException thrown when a particular cryptographic algorithm is requested
   * but is not available in the environment
   */
  public List<Integer> generateRecommendations(int iD, int k, Comparator com)
      throws NoSuchAlgorithmException {
    //set parameters
    this.studentID = iD;
    this.numSimilarStudents = k;
    this.targetStudent = this.findTargetStudent();
    this.sortedStudents = new PriorityQueue<T>(this.allStudents.size(), com);
    List<Integer> kSimilarStudents = new ArrayList<>();

    //remove target student from the list of students
    this.allStudents.remove(this.targetStudent);
    //add all students except for the target student to the priority queue
    for (T s : this.allStudents) {
      this.sortedStudents.add(s);
    }

    //get the k most similar students
    int count = 0;

    //check if k is greater than the number of students
    if (this.numSimilarStudents > this.allStudents.size()) {
      this.numSimilarStudents = this.allStudents.size();
    }

    //add k similar students to an array list
    while (count < this.numSimilarStudents) {
      T currStudent = this.sortedStudents.poll();
      kSimilarStudents.add(currStudent.getId());
      count++;
    }

    //add target student back to the list of students
    this.allStudents.add(this.targetStudent);
    return kSimilarStudents;
  }

  /**
   * This getter method returns the list of students for the REPL to use.
   * @return a list of students, declared generic type variable T.
   */
  public List<T> getAllStudents() {
    return this.allStudents;
  }
}
