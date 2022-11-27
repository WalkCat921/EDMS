package com.ed.edms.service;

import com.ed.edms.pojo.DocumentsForCountAnalyse;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface DashboardService {
    Map<String, Integer> getUserCountries();
    ArrayList<DocumentsForCountAnalyse> getUserDocumentsCount();
    List<Map.Entry<String, Integer>> getUserSubscribersCount();
    Map<String, Float> getUserDocumentsSizeCount();
}
