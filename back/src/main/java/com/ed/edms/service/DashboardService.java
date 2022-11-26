package com.ed.edms.service;

import java.util.Map;

public interface DashboardService {
    Map<String, Integer> getUserCountries();
    Map<String, Integer> getUserDocumentsCount();
    Map<String, Integer> getUserSubscribersCount();
    Map<String, Float> getUserDocumentsSizeCount();
}
