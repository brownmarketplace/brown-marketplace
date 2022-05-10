package edu.brown.cs.student.Recommender.bloomFilter;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

/**
 * This class is a generic bloom filter. It has three java.main functionalities: creating, adding and
 * querying. It uses an array of binary numbers as its underlying data structure.
 */
public class BloomFilter {
  private int[] bitArray;
  private double falsePosRate;
  private int maxNum;
  private int bitNum;
  private int numHash;

  /**
   * The constructor for a generic bloom filter.
   */
  public BloomFilter() {
  }

  /**
   * This method instantiates a bloom filter with the desired size m.
   *
   * @param r desired false positive rate
   * @param n maximum number of elements that will be inserted into the bloom filter
   * @return an array of integers representing the bit array
   */
  public int[] create(double r, int n) {
    this.falsePosRate = r;
    this.maxNum = n;
    this.calculateRates();
    this.bitArray = new int[this.bitNum];
    for (int i = 0; i < this.bitArray.length; i++) {
      this.bitArray[i] = 0;
    }

    return this.bitArray;
  }

  /**
   * This method uses r and n to calculate k and m, where k represents the number of hash functions
   * the user wishes to use, and m represents the size of the bit array.
   */
  private void calculateRates() {
    this.numHash = (int) Math.ceil((-1) * (Math.log(this.falsePosRate) / Math.log(2)));
    this.bitNum = (int) Math.ceil((this.numHash * this.maxNum) / (Math.log(2)));
  }

  /**
   * This method takes in a string as input data and adds it to the generic bloom filter.
   *
   * @param inputData a string to be added to the bloom filter
   * @return an array of integers representing the bit array
   * @throws NoSuchAlgorithmException thrown when a particular cryptographic algorithm is requested
   * but is not available in the environment
   */
  public int[] add(String inputData) throws NoSuchAlgorithmException {
    byte[] data = inputData.getBytes(StandardCharsets.UTF_8);
    List<Integer> indices = this.mapHashToIndex(data);

    //set the bits at the k indices to be 1
    for (int i = 0; i < this.bitArray.length; i++) {
      if (indices.contains(i)) {
        this.bitArray[i] = 1;
      }
    }

    return this.bitArray;
  }

  /**
   * This method takes in a string as input data and checks if it's in the bloom filter. If the
   * string is definitely not in the set, it returns false; otherwise, it returns true.
   *
   * @param inputData the string to be queried in the bloom filter
   * @return a boolean representing if the string is in the bloom filter
   * @throws NoSuchAlgorithmException thrown when a particular cryptographic algorithm is requested
   * but is not available in the environment
   */
  public boolean query(String inputData) throws NoSuchAlgorithmException {
    byte[] data = inputData.getBytes(StandardCharsets.UTF_8);
    List<Integer> indices = this.mapHashToIndex(data);

    //loop through the k indices to check if they're set to 1 in the bit array
    for (int index : indices) {
      if (this.bitArray[index] == 0) {
        return false;
      }
    }
    return true;
  }

  /**
   * Converts a byte array to a hex string.
   * Source: https://stackoverflow.com/a/9855338
   *
   * @param bytes the byte array to convert
   * @return the hex string
   */
  private static String bytesToHex(byte[] bytes) {
    byte[] hexArray = "0123456789ABCDEF".getBytes(StandardCharsets.UTF_8);
    byte[] hexChars = new byte[bytes.length * 2];
    for (int j = 0; j < bytes.length; j++) {
      int v = bytes[j] & 0xFF;
      hexChars[j * 2] = hexArray[v >>> 4];
      hexChars[j * 2 + 1] = hexArray[v & 0x0F];
    }
    return new String(hexChars, StandardCharsets.UTF_8);
  }

  /**
   * Generates hashes based on the contents of an array of bytes, converts the result into
   * BigIntegers, and stores them in an array. The hash function is called until the required number
   * of BigIntegers are produced.
   * For each call to the hash function a salt is prepended to the data. The salt is increased by 1
   * for each call.
   *
   * @param data      input data.
   * @param numHashes number of hashes/BigIntegers to produce.
   * @return array of BigInteger hashes
   * @throws NoSuchAlgorithmException thrown when a particular cryptographic algorithm is requested
   *    * but is not available in the environment
   */
  public static BigInteger[] createHashes(byte[] data, int numHashes)
      throws NoSuchAlgorithmException {
    BigInteger[] result = new BigInteger[numHashes];

    int k = 0;
    BigInteger salt = BigInteger.valueOf(0);
    while (k < numHashes) {
      MessageDigest md = MessageDigest.getInstance("SHA-1");
      md.update(salt.toByteArray());
      salt = salt.add(BigInteger.valueOf(1));
      byte[] hash = md.digest(data);
      md.reset();
      // convert hash byte array to hex string, then to BigInteger
      String hexHash = bytesToHex(hash);
      result[k] = new BigInteger(hexHash, 16);
      k++;
    }
    return result;
  }

  /**
   * This method takes in a byte array of data and uses it to generate k hashes in an array of
   * BigInteger. It then converts this array to k indices between 0 and m - 1.
   *
   * @param data a byte array used to generate hashes
   * @return a list of integers representing the indices
   * @throws NoSuchAlgorithmException thrown when a particular cryptographic algorithm is requested
   *    * but is not available in the environment
   */
  public List<Integer> mapHashToIndex(byte[] data) throws NoSuchAlgorithmException {
    BigInteger[] result = this.createHashes(data, this.numHash);
    List<Integer> indices = new ArrayList<>();

    for (int i = 0; i < result.length; i++) {
      BigInteger curr = result[i].mod(BigInteger.valueOf(this.bitNum));
      indices.add(curr.intValue());
    }
    return indices;
  }

  /**
   * This is a getter method that returns the bit array, the underlying data structure of a Bloom
   * filter.
   *
   * @return an array of integers
   */
  public int[] getBitArray() {
    return this.bitArray;
  }
}
