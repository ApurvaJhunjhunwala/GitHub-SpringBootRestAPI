package com.creditcard.springboot.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Service;

import com.creditcard.springboot.model.CreditCard;



@Service("cardService")
public class CreditCardServiceImpl implements CreditCardService{
	
	private static final AtomicLong counter = new AtomicLong();
	
	private static List<CreditCard> cards;
	
	static{
		cards= populateDummyCards();
	}

	public List<CreditCard> findAllCards() {
		return cards;
	}
	
	public CreditCard findById(long id) {
		for(CreditCard card : cards){
			if(card.getId() == id){
				return card;
			}
		}
		return null;
	}
	
	public CreditCard findByName(String name) {
		for(CreditCard card : cards){
			if(card.getName().equalsIgnoreCase(name)){
				return card;
			}
		}
		return null;
	}
	
	public void saveCard(CreditCard card) {
		card.setId(counter.incrementAndGet());
		cards.add(card);
	}

	public void updateCard(CreditCard card) {
		int index = cards.indexOf(card);
		cards.set(index, card);
	}

	public void deleteCardById(long id) {
		
		for (Iterator<CreditCard> iterator = cards.iterator(); iterator.hasNext(); ) {
		    CreditCard card = iterator.next();
		    if (card.getId() == id) {
		        iterator.remove();
		    }
		}
	}

	public boolean isCardExist(CreditCard card) {
		return findByName(card.getName())!=null;
	}
	
	public void deleteAllCards(){
		cards.clear();
	}

	private static List<CreditCard> populateDummyCards(){
		List<CreditCard> cards = new ArrayList<CreditCard>();
		cards.add(new CreditCard(counter.incrementAndGet(),"Sam",30, 70000));
		cards.add(new CreditCard(counter.incrementAndGet(),"Tom",40, 50000));
		cards.add(new CreditCard(counter.incrementAndGet(),"Jerome",45, 30000));
		cards.add(new CreditCard(counter.incrementAndGet(),"Silvia",50, 40000));
		return cards;
	}



}
