package com.ed.edms.service;

import com.ed.edms.pojo.DocumentsForCountAnalyse;

import java.util.ArrayList;
import java.util.Map;

public interface DashboardService {
    Map<String, Integer> getUserCountries();
    ArrayList<DocumentsForCountAnalyse> getUserDocumentsCount();
    Map<String, Integer> getUserSubscribersCount();
    Map<String, Float> getUserDocumentsSizeCount();
}
