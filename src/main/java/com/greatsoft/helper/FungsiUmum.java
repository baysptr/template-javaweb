package com.greatsoft.helper;

/**
 *
 * @author cak-ust
 */
public class FungsiUmum {

    public String bulanAngkaInd(String bulan) {
        switch (bulan) {
            case "Jan":
                return "01";
            case "Feb":
                return "02";
            case "Mar":
                return "03";
            case "Apr":
                return "04";
            case "Mei":
                return "05";
            case "Jun":
                return "06";
            case "Jul":
                return "07";
            case "Agt":
                return "08";
            case "Aug":
                return "08";
            case "Agust":
                return "08";
            case "Sep":
                return "09";
            case "Okt":
                return "10";
            case "Nov":
                return "11";
            case "Des":
                return "12";
            default:
                return "";
        }
    }

    public String bulanAngkaEng(String bulan) {
        switch (bulan.toUpperCase()) {
            case "JAN":
                return "01";
            case "FEB":
                return "02";
            case "MAR":
                return "03";
            case "APR":
                return "04";
            case "MAY":
                return "05";
            case "JUN":
                return "06";
            case "JUL":
                return "07";
            case "AUG":
                return "08";
            case "SEP":
                return "09";
            case "OCT":
                return "10";
            case "NOV":
                return "11";
            case "DEC":
                return "12";
            default:
                return "";
        }
    }

    public String bulanAngkaEngLengkap(String bulan) {
        switch (bulan.toUpperCase()) {
            case "JANUARY":
                return "01";
            case "FEBRUARY":
                return "02";
            case "MARCH":
                return "03";
            case "APRIL":
                return "04";
            case "MAY":
                return "05";
            case "JUNE":
                return "06";
            case "JULY":
                return "07";
            case "AUGUST":
                return "08";
            case "SEPTEMBER":
                return "09";
            case "OCTOBER":
                return "10";
            case "NOVEMBER":
                return "11";
            case "DECEMBER":
                return "12";
            default:
                return "";
        }
    }

    public String bulanNamaLengkap(String bulan) {
        switch (bulan.toUpperCase()) {
            case "01":
                return "JANUARI";
            case "02":
                return "FEBUARI";
            case "03":
                return "MARET";
            case "04":
                return "APRIL";
            case "05":
                return "MEI";
            case "06":
                return "JUNI";
            case "07":
                return "JULI";
            case "08":
                return "AGUSTUS";
            case "09":
                return "SEPTEMBER";
            case "10":
                return "OKTOBER";
            case "11":
                return "NOVEMBER";
            case "12":
                return "DESEMBER";
            default:
                return "";
        }
    }
}
