/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.greatsoft.model;

import java.util.Date;

/**
 *
 * @author aziz
 */
public class HistoriRequest {
    private String search;
    private String jenisJurnal;
    private Date tanggal1;
    private Date tanggal2;
    private String kategori;
    private String cabang;

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }

    public String getJenisJurnal() {
        return jenisJurnal;
    }

    public void setJenisJurnal(String jenisJurnal) {
        this.jenisJurnal = jenisJurnal;
    }

    public String getKategori() {
        return kategori;
    }

    public void setKategori(String kategori) {
        this.kategori = kategori;
    }

    public String getCabang() {
        return cabang;
    }

    public void setCabang(String cabang) {
        this.cabang = cabang;
    }

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

}
