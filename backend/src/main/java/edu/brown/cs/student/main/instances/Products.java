package edu.brown.cs.student.main.instances;

import java.util.Map;
import java.util.Set;

public class Products {

  private Map<String, Map<String, Object>> _products;

  public Products(){

  }

  public void setProducts(Map<String, Map<String, Object>> products){
    _products = products;
  }

  public Map<String, Map<String, Object>> getProducts(){
    return _products;
  }
}
