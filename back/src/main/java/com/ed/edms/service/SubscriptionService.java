package com.ed.edms.service;

import com.ed.edms.entity.User;

import java.util.Set;

public interface SubscriptionService {
    User addSubscription(Long id);
    Set<User> getAllSubscribers();
    Set<User> getAllSubscriptions();
    User deleteSubscription(Long id);
    User deleteSubscriber(Long id);
}

