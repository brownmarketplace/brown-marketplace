package Recommender.bloomFilter;

import java.util.List;

/**
 * This interface specifies the necessary features of objects that can be inserted in a Bloom
 * filter.
 */
public interface BFInsertable {
  /**
   * This method gets the attributes of the BF Insertable object.
   * @return a list of strings
   */
  List<String> getAttributes();

  /**
   * This method generates a bloom filter for the BF Insertable object.
   * @param falsePositiveRate the desired false positive rate
   * @param maxNum the max number of elements to be inserted into the bf
   * @return a bloom filter
   */
  BloomFilter generateBF(double falsePositiveRate, int maxNum);

  /**
   * This method gets the ID of the BF Insertable object.
   * @return an integer
   */
  int getId();

  /**
   * This method gets the bloom filter of the BF Insertable object.
   * @return a bloom filter
   */
  BloomFilter getBf();
}
