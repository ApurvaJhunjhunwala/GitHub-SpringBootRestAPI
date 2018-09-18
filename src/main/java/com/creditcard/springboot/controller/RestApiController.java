package com.creditcard.springboot.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.creditcard.springboot.model.CreditCard;
import com.creditcard.springboot.service.CreditCardService;
import com.creditcard.springboot.util.CustomErrorType;

@RestController
@RequestMapping("/api")
public class RestApiController {

	public static final Logger logger = LoggerFactory.getLogger(RestApiController.class);

	@Autowired
	CreditCardService creditCardService; //Service which will do all data retrieval/manipulation work

	// -------------------Retrieve All CreditCards---------------------------------------------

	@RequestMapping(value = "/creditCard/", method = RequestMethod.GET)
	public ResponseEntity<List<CreditCard>> listAllCreditCards() {
		List<CreditCard> creditCards = creditCardService.findAllCards();
		if (creditCards.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		return new ResponseEntity<List<CreditCard>>(creditCards, HttpStatus.OK);
	}

	// -------------------Retrieve Single CreditCard------------------------------------------

	@RequestMapping(value = "/creditCard/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getCreditCard(@PathVariable("id") long id) {
		logger.info("Fetching CreditCard with id {}", id);
		CreditCard creditCard = creditCardService.findById(id);
		if (creditCard == null) {
			logger.error("CreditCard with id {} not found.", id);
			return new ResponseEntity(new CustomErrorType("CreditCard with id " + id 
					+ " not found"), HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<CreditCard>(creditCard, HttpStatus.OK);
	}

	// -------------------Create a CreditCard-------------------------------------------

	@RequestMapping(value = "/creditCard/", method = RequestMethod.POST)
	public ResponseEntity<?> createCreditCard(@RequestBody CreditCard creditCard, UriComponentsBuilder ucBuilder) {
		logger.info("Creating CreditCard : {}", creditCard);

		if (creditCardService.isCardExist(creditCard)) {
			logger.error("Unable to create. A CreditCard with name {} already exist", creditCard.getName());
			return new ResponseEntity(new CustomErrorType("Unable to create. A CreditCard with name " + 
			creditCard.getName() + " already exist."),HttpStatus.CONFLICT);
		}
		creditCardService.saveCard(creditCard);

		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(ucBuilder.path("/api/creditCard/{id}").buildAndExpand(creditCard.getId()).toUri());
		return new ResponseEntity<String>(headers, HttpStatus.CREATED);
	}

	// ------------------- Update a CreditCard ------------------------------------------------

	@RequestMapping(value = "/creditCard/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateCreditCard(@PathVariable("id") long id, @RequestBody CreditCard creditCard) {
		logger.info("Updating CreditCard with id {}", id);

		CreditCard currentCreditCard = creditCardService.findById(id);

		if (currentCreditCard == null) {
			logger.error("Unable to update. CreditCard with id {} not found.", id);
			return new ResponseEntity(new CustomErrorType("Unable to upate. CreditCard with id " + id + " not found."),
					HttpStatus.NOT_FOUND);
		}

		currentCreditCard.setName(creditCard.getName());
		currentCreditCard.setLimit(creditCard.getLimit());;
		currentCreditCard.setBalance(creditCard.getBalance());

		creditCardService.updateCard(currentCreditCard);
		return new ResponseEntity<CreditCard>(currentCreditCard, HttpStatus.OK);
	}

	// ------------------- Delete a CreditCard-----------------------------------------

	@RequestMapping(value = "/creditCard/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteCreditCard(@PathVariable("id") long id) {
		logger.info("Fetching & Deleting CreditCard with id {}", id);

		CreditCard creditCard = creditCardService.findById(id);
		if (creditCard == null) {
			logger.error("Unable to delete. CreditCard with id {} not found.", id);
			return new ResponseEntity(new CustomErrorType("Unable to delete. CreditCard with id " + id + " not found."),
					HttpStatus.NOT_FOUND);
		}
		creditCardService.deleteCardById(id);
		return new ResponseEntity<CreditCard>(HttpStatus.NO_CONTENT);
	}

	// ------------------- Delete All CreditCards-----------------------------

	@RequestMapping(value = "/creditCard/", method = RequestMethod.DELETE)
	public ResponseEntity<CreditCard> deleteAllCreditCards() {
		logger.info("Deleting All CreditCards");

		creditCardService.deleteAllCards();
		return new ResponseEntity<CreditCard>(HttpStatus.NO_CONTENT);
	}

}