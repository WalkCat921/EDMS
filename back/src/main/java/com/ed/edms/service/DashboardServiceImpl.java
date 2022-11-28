package com.ed.edms.service;

import com.ed.edms.entity.Document;
import com.ed.edms.entity.User;
import com.ed.edms.pojo.DocumentsForCountAnalyse;
import com.ed.edms.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

@Service
public class DashboardServiceImpl implements DashboardService {
    private final UserRepository userRepository;

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
    public ArrayList<DocumentsForCountAnalyse> getUserDocumentsCount() {
        List<User> userList = userRepository.findAll();
        Map<String, Integer> documentsCount = new HashMap<>();
        ArrayList<DocumentsForCountAnalyse> documentsForCountAnalyses = new ArrayList<>();
        int allDocsCount = 0;
        for (User user : userList) {
            if (user.getDocuments() != null) {
                documentsCount.put(user.getUsername(), user.getDocuments().size());
                allDocsCount += user.getDocuments().size();
            } else {
                documentsCount.put(user.getUsername(), 0);
            }
        }
        final Float all = (float) allDocsCount;
        if (documentsCount.size() > 5) {
            List<Map.Entry<String, Integer>> list = documentsCount.entrySet().stream()
                    .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                    .limit(5)
                    .collect(Collectors.toList());
            list
                    .forEach(document -> {
                        Float percent = document.getValue() / all * 100;
                        documentsForCountAnalyses
                                .add(new DocumentsForCountAnalyse(
                                        document.getKey(), document.getValue(), percent));
                    });
        } else {
            documentsCount.entrySet().stream()
                    .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                    .collect(Collectors.toList())
                    .forEach(document -> {
                                Float percent = document.getValue() / all * 100;
                                documentsForCountAnalyses
                                        .add(new DocumentsForCountAnalyse(
                                                document.getKey(), document.getValue(), percent));
                            }
                    );
        }
        return documentsForCountAnalyses;
    }

    @Override
    public Map<String, Integer> getUserSubscribersCount() {
        List<User> userList = userRepository.findAll();
        Map<String, Integer> subscribersCount = new TreeMap<>();
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
                for (Document document : user.getDocuments()) {
                    userDocsSize += document.getSize();
                }
                if (userDocsSize != 0) {
                    documentsCount.put(user.getUsername(), userDocsSize);
                }
            }
            if (documentsCount.size() == 5) {
                return documentsCount;
            }
        }
        return documentsCount;
    }
}
