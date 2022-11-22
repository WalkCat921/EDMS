package com.ed.edms.service;

import org.springframework.core.io.Resource;

public interface DocumentService {
    Resource downloadFile(String filename);
}
