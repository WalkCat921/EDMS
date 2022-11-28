package com.ed.edms.service;

import com.ed.edms.entity.User;
import com.ed.edms.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {
    private final CurrentUserInfoService currentUserInfoService = new CurrentUserInfoService();
    private final UserRepository userRepository;

    public SubscriptionServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User addSubscription(Long id) {
        Set<User> subscriptions = getCurrentUser().getSubscriptions();
        subscriptions.add(userRepository.findById(id).get());
        getCurrentUser().setSubscriptions(subscriptions);
        return userRepository.save(getCurrentUser());
    }

    @Override
    public Set<User> getAllSubscribers() {
        if (getCurrentUser().getSubscribers() != null) {
            return getCurrentUser().getSubscribers();
        } else {
            System.out.println("Нет подписчиков");
            return null;
        }
    }

    @Override
    public Set<User> getAllSubscriptions() {
        if (getCurrentUser().getSubscriptions() != null) {
            return getCurrentUser().getSubscriptions();
        } else {
            System.out.println("Нет подписок");
            return null;
        }
    }

    @Override
    public User deleteSubscription(Long id) {
        Set<User> subscriptions = getCurrentUser().getSubscriptions();
        subscriptions.remove(userRepository.findById(id).get());
        getCurrentUser().setSubscriptions(subscriptions);
//        userRepository.
//                findById(id).
//                get().
//                getSubscribers()
//                .remove(getCurrentUser());
//        userRepository.save(userRepository.findById(id).get());
        return userRepository.save(getCurrentUser());
    }

    @Override
    public User deleteSubscriber(Long id) {
        Set<User> subscribers = getCurrentUser().getSubscribers();
        subscribers.remove(userRepository.findById(id).get());
        getCurrentUser().setSubscribers(subscribers);
//        userRepository.
//                findById(id).
//                get().
//                getSubscribers()
//                .remove(getCurrentUser());
//        userRepository.save(userRepository.findById(id).get());
        return userRepository.save(getCurrentUser());
    }

    private User getCurrentUser() {
        return userRepository.findByUsername(currentUserInfoService.getCurrentUsername()).get();
    }

}
