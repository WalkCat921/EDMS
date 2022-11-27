package com.ed.edms.pojo;

public class DocumentsForCountAnalyse {
    private String mame;
    private Integer countOfDocuments;
    private Float percentFromAll;

    public DocumentsForCountAnalyse() {
    }

    public DocumentsForCountAnalyse(String mame, Integer countOfDocuments, Float percentFromAll) {
        this.mame = mame;
        this.countOfDocuments = countOfDocuments;
        this.percentFromAll = percentFromAll;
    }

    public String getMame() {
        return mame;
    }

    public void setMame(String mame) {
        this.mame = mame;
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
