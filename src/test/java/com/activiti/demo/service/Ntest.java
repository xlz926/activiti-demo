package com.activiti.demo.service;

public class Ntest {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Integer k = new Integer(10);
		change(k);
		System.out.println(k);

	}
    
	public static void change(Integer i){
		i = 9;
	}
}
