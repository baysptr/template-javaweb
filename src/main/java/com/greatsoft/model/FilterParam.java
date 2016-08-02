/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.greatsoft.model;

import java.util.Date;

/**
 *
 * @author cak-ust
 */
public class FilterParam {
    private Date tanggal1;
    private Date tanggal2;
    private String cari;
    private Integer idCabang;
    private String pt; //Kode produk template, dll

    public Date getTanggal1() {
        return tanggal1;
    }

    public void setTanggal1(Date tanggal1) {
        this.tanggal1 = tanggal1;
    }

    public Date getTanggal2() {
        return tanggal2;
    }

    public void setTanggal2(Date tanggal2) {
        this.tanggal2 = tanggal2;
    }

    public String getCari() {
        return cari;
    }

    public void setCari(String cari) {
        this.cari = cari;
    }

    public Integer getIdCabang() {
        return idCabang;
    }

    public void setIdCabang(Integer idCabang) {
        this.idCabang = idCabang;
    }

    public String getPt() {
        return pt;
    }

    public void setPt(String pt) {
        this.pt = pt;
    }
    
    
}
