package edu.brown.cs.student.main.Recommender.bloomFilter;

import edu.brown.cs.student.main.Structures.Product;
import java.util.Comparator;

/**
 * This class uses XNOR Similarity to compare the bloom filters of two students. It implements
 * the Comparator interface.
 */
public class XNORSimilarity implements Comparator {
  private BFInsertable targetStudent;

  /**
   * This is the XNOR Similarity constructor. It takes in a target object and sets the targetStudent
   * field to be the input.
   * @param target the target object
   */
  public XNORSimilarity(BFInsertable target) {
    this.targetStudent = target;
  }

  /**
   * This method compares two students' bloom filter similarity to the target product's
   * bloom filter. It returns -1, 0 or 1 depending on the result of the comparison.
   *
   * @param o1 product one
   * @param o2 product two
   * @return an int representing the result of the comparison
   */
  @Override
  public int compare(Object o1, Object o2) {
    // check if o1 and o2 are two students
    if (!(o1 instanceof Product) || !(o2 instanceof Product)) {
      System.out.println("ERROR: Must compare two bloom filters");
      return 0;
    }

    int[] targetBitArray = this.targetStudent.getBf().getBitArray();
    int[] bitArrayOne = ((Product) o1).getBf().getBitArray();
    int[] bitArrayTwo = ((Product) o2).getBf().getBitArray();

    // perform XNOR similarity with both bit arrays and the target student
    int countOne = this.computeXNOR(targetBitArray, bitArrayOne);
    ((Product) o1).setXNORSimilarity(countOne);
    int countTwo = this.computeXNOR(targetBitArray, bitArrayTwo);
    ((Product) o2).setXNORSimilarity(countTwo);

    // compare the number of bits set to 1 in the two result bit arrays
    if (countOne > countTwo) { //sort in descending order
      return -1;
    } else if (countOne < countTwo) {
      return 1;
    } else {
      return 0;
    }
  }

  /**
   * This is a helper method that takes in two bit arrays, performs XNOR operation on them, and
   * return the number of bits set to 1 in the result.
   *
   * @param bitOne the first bit array
   * @param bitTwo the second bit array
   * @return the number of bits set to one in the result array
   */
  private int computeXNOR(int[] bitOne, int[] bitTwo) {
    // perform XNOR operation between bitOne and bitTwo
    int[] result = new int[bitOne.length];
    for (int i = 0; i < result.length; i++) {
      if ((bitOne[i] == 1 && bitTwo[i] == 1) || (bitOne[i] == 0
          && bitTwo[i] == 0)) {
        result[i] = 1;
      } else {
        result[i] = 0;
      }
    }

    // count the number of bits set to 1 in the result
    int count = 0;
    for (int i = 0; i < result.length; i++) {
      if (result[i] == 1) {
        count++;
      }
    }
    return count;
  }
}
