package com.ed.edms.pojo;

public class DocumentsForCountAnalyse {
    private String username;
    private Integer countOfDocuments;
    private Float percentFromAll;

    public DocumentsForCountAnalyse() {
    }

    public DocumentsForCountAnalyse(String name, Integer countOfDocuments, Float percentFromAll) {
        this.username = name;
        this.countOfDocuments = countOfDocuments;
        this.percentFromAll = percentFromAll;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getCountOfDocuments() {
        return countOfDocuments;
    }

    public void setCountOfDocuments(Integer countOfDocuments) {
        this.countOfDocuments = countOfDocuments;
    }

    public Float getPercentFromAll() {
        return percentFromAll;
    }

    public void setPercentFromAll(Float percentFromAll) {
        this.percentFromAll = percentFromAll;
    }
}
