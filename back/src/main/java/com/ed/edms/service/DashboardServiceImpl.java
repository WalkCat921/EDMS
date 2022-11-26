package com.ed.edms.service;

import com.ed.edms.entity.Document;
import com.ed.edms.entity.User;
import com.ed.edms.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardServiceImpl implements DashboardService {
    final
    UserRepository userRepository;

    public DashboardServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Map<String, Integer> getUserCountries() {
        List<User> userList = userRepository.findAll();
        Map<String, Integer> countriesCount = new HashMap<>();
        for (User user : userList) {
            if (user.getPerson() != null) {
                String country = user.getPerson().getAddress().getCountry();
                if (countriesCount.get(country) != null) {
                    Integer countOfCountries = countriesCount.get(country);
                    countriesCount.put(country, ++countOfCountries);
                } else {
                    countriesCount.put(country, 1);
                }
            }
        }
        return countriesCount;
    }

    @Override
    public Map<String, Integer> getUserDocumentsCount() {
        List<User> userList = userRepository.findAll();
        Map<String, Integer> documentsCount = new HashMap<>();
        for (User user : userList) {
            if (user.getDocuments() != null) {
                documentsCount.put(user.getUsername(), user.getDocuments().size());
            } else {
                documentsCount.put(user.getUsername(), 0);
            }
        }
        return documentsCount;
    }

    @Override
    public Map<String, Integer> getUserSubscribersCount() {
        List<User> userList = userRepository.findAll();
        Map<String, Integer> subscribersCount = new HashMap<>();
        for (User user : userList) {
            if (user.getSubscribers() != null) {
                subscribersCount.put(user.getUsername(), user.getSubscribers().size());
            } else {
                subscribersCount.put(user.getUsername(), 0);
            }
        }
        return subscribersCount;
    }

    @Override
    public Map<String, Float> getUserDocumentsSizeCount() {
        List<User> userList = userRepository.findAll();
        Map<String, Float> documentsCount = new HashMap<>();
        for (User user : userList) {
            if (user.getDocuments() != null) {
                float userDocsSize = 0;
                for (Document document : user.getDocuments()){
                    userDocsSize += document.getSize();
                }
                documentsCount.put(user.getUsername(), userDocsSize);
            } else {
                documentsCount.put(user.getUsername(), 0f);
            }
        }
        return documentsCount;
    }
}
