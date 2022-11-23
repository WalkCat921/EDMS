package com.ed.edms.controller;

import com.ed.edms.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user/sub/")
@CrossOrigin(origins = "*", maxAge = 3600)
public class SubscriptionController {
    @Autowired
    SubscriptionService subscriptionService;

    @PostMapping("/add/{id}")
    public ResponseEntity<?> addOneSubscriptionAndSubscriber(@PathVariable Long id) {
        return new ResponseEntity<>(subscriptionService.addSubscription(id), HttpStatus.OK);
    }

    @GetMapping("/subscribers")
    public ResponseEntity<?> getAllSubscribers() {
        return new ResponseEntity<>(subscriptionService.getAllSubscribers(), HttpStatus.OK);
    }

    @GetMapping("/subscriptions")
    public ResponseEntity<?> getAllSubscriptions() {
        return new ResponseEntity<>(subscriptionService.getAllSubscriptions(), HttpStatus.OK);
    }

    @DeleteMapping("/delete/subscription/{id}")
    public ResponseEntity<?> deleteSubscriber(@PathVariable Long id) {
        return new ResponseEntity<>(subscriptionService.deleteSubscription(id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/subscriber/{id}")
    public ResponseEntity<?> deleteOneSubscriptionAndSubscriber(@PathVariable Long id) {
        return new ResponseEntity<>(subscriptionService.deleteSubscriber(id), HttpStatus.OK);
    }
}
