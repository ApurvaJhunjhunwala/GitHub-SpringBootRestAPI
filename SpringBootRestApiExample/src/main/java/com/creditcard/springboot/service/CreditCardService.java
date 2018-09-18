package com.creditcard.springboot.service;


import java.util.List;

import com.creditcard.springboot.model.CreditCard;

public interface CreditCardService {
	
	CreditCard findById(long id);
	
	CreditCard findByName(String name);
	
	void saveCard(CreditCard user);
	
	void updateCard(CreditCard user);
	
	void deleteCardById(long id);

	List<CreditCard> findAllCards();
	
	void deleteAllCards();
	
	boolean isCardExist(CreditCard user);
	
}
