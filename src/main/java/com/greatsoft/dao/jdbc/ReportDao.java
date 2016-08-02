/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.greatsoft.dao.jdbc;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

/**
 *
 * @author faheem
 */
@Repository
public class ReportDao {

    @Autowired
    MapResultSet mr;

    @Autowired
    DataSource dataSource;

    public Object historyTicketNominalByJamaah(Integer id) {
        return mr.mapList("select r.*, r.jml_tgh - r.terbayar as terhutang, 0 as pembayaran from history_tiket_nominal() as r (nama varchar, id_tiket_tmp int, no_invoice varchar, tgl_trx timestamp, dom_int varchar, tgl_jatuh_tempo date, id_marketing int, id_petugas int, id_pelanggan int, total numeric, kode_mata_uang varchar, jml_tgh double precision, terbayar numeric) where id_pelanggan = " + id + " order by id_tiket_tmp");
    }

    public Object historyTicketNominalBySupp(Integer id) {
        return mr.mapList("select r.*, r.jml_tgh - r.terbayar as terhutang, 0 as pembayaran from history_tiket_nominal_supp() as r (nama varchar, id_tiket_tmp int, no_invoice varchar, tgl_trx timestamp, dom_int varchar, tgl_jatuh_tempo date, id_marketing int, id_petugas int, id_supplier int, id_rute int, total numeric, kode_mata_uang varchar, jml_tgh double precision, terbayar numeric) where id_supplier = " + id + " order by id_tiket_tmp");
    }

    public Object historyTransaksiTiket(String strSearch, Pageable page) {
        System.out.println("limit " + page.getPageSize() + " offset " + page.getOffset());
        return mr.mapList("select * from history_trx_tiket('" + strSearch + "') as (id_tiket_tmp int, no_invoice varchar, tgl_trx timestamp without time zone, id_pelanggan int, dom_int varchar, tgl_jatuh_tempo date, id_marketing int, id_petugas int, nama_pelanggan varchar, nama_marketing varchar, nama_petugas varchar, jml_a bigint, jml_c bigint, jml_i bigint, jml_a_i bigint) order by id_tiket_tmp limit " + page.getPageSize() + " offset " + page.getOffset());
    }

    public Integer countTransaksiTiket(String strSearch) {
        String query = "select count(*) as jml from history_trx_tiket('" + strSearch + "') as (id_tiket_tmp int, no_invoice varchar, tgl_trx timestamp without time zone, id_pelanggan int, dom_int varchar, tgl_jatuh_tempo date, id_marketing int, id_petugas int, nama_pelanggan varchar, nama_marketing varchar, nama_petugas varchar, jml_a bigint, jml_c bigint, jml_i bigint, jml_a_i bigint)";
        Integer jmlRecord = 0;
        try {
            Connection conn = dataSource.getConnection();
            ResultSet rs = conn.createStatement().executeQuery(query);
            if (rs.next()) {
                jmlRecord = rs.getInt(1);
            }
            rs.close();
            conn.close();
        } catch (SQLException ex) {
            Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, null, ex);
        }
        return jmlRecord;
    }

    public Object masterItem() {
        return mr.mapList("select kode, nama_item, tipe from m_item  ");
    }

    public Object masterJamaah() {
        return mr.mapList("select nama, alamat, telp from jamaah");
    }

    public Object penerimaanSupplierDetail(String tanggal1, String tanggal2) {
        return mr.mapList("select * from fn_rpt_penerimaan_supplier('" + tanggal1 + "', '" + tanggal2 + "') as (id integer, no_invoice varchar, keterangan text, tanggal date, \n"
                + "user_ins varchar, supplier_id int, nama_supplier varchar, nama_gudang varchar, kode_item varchar, nama_item varchar, qty numeric, \n"
                + "satuan varchar, harga numeric, diskon numeric, sub_total numeric)");
    }

    public Object printArTiketPesawat(Integer id) {
        String sql = "select * from fn_tiket_print_invoice(" + id + ") as (tanggal date, no_faktur varchar, kepada1 varchar, kepada2 varchar, jenis_transaksi varchar, \n"
                + "nama_item varchar, tgl_berangkat date, no_tiket varchar, no_penerbangan varchar, keterangan text, amount numeric, penerima varchar, \n"
                + "penjual varchar, total numeric, airport_tax numeric, diskon numeric, biaya_cc numeric, grand_total numeric, jml_item integer)";
        return mr.mapList(sql);
    }

    public Object laporanPenjualanTiket(String tanggal1, String tanggal2, String produkTemplate) {
        String sql = "select * from fn_rpt_tiket_penjualan_by_product_template('" + tanggal1 + "', '" + tanggal2 + "', '" + produkTemplate + "') as (nama_item varchar, tanggal date, no_tiket varchar, keterangan varchar,\n"
                + "no_faktur varchar, amount numeric, diskon numeric, pelanggan varchar)";
        return mr.mapList(sql);
    }

    public Object printArInvoice(Integer id) {
        String query = "select a.tanggal, a.no_faktur, coalesce(a.kepada1, '') as kepada1, coalesce(a.kepada2,'') as kepada2, coalesce(a.jenis_transaksi,'') as jenis_transaksi,\n"
                + "coalesce(d.keterangan1,'') as keterangan1, coalesce(d.keterangan2,'') as keterangan2, coalesce(d.keterangan, '') as keterangan, coalesce(d.jumlah,0) as qty, coalesce(d.harga,0) as harga,  \n"
                + "coalesce(d.harga,0) as amount, coalesce(a.penerima,'') as penerima, coalesce(a.penjual,'') as penjual, coalesce(a.total,0) as total,\n"
                + "d.tgl_pakai, d.tgl_sampai,\n"
                + "coalesce(a.tax,0) as airport_tax, coalesce(a.diskon,0) as diskon, coalesce(a.biaya_cc,0) as biaya_cc, coalesce(a.grand_total,0) as grand_total,\n"
                + "1 as jml_item\n"
                + "from ar_invoice a\n"
                + "inner join ar_invoice_detail d on d.id_invoice=a.id\n"
                + "where a.id=" + id + "\n"
                + "order by d.urut";
        return mr.mapList(query);
    }

    public Object printTagihan(Integer id) {
        String query = "select * from fn_print_tagihan(" + id + ") as (tanggal text, no_tagihan varchar, nama_pelanggan varchar, kepada1 varchar, kepada2 varchar, periode1 date, periode2 date, tgl_pakai date,\n"
                + "nip varchar, penumpang varchar, no_faktur varchar, kode_anggaran varchar, rute text, no_penerbangan varchar, no_tiket varchar, jumlah numeric)";
        return mr.mapList(query);
    }

    public Object arReceiptRekap(String t1, String t2, Integer idCabang) {
        String query = "select coalesce(r.deposit_to,'') as acc_no, coalesce(coa.acc_name,'') as acc_name, \n"
                + "r.tanggal,  coalesce(cust.nama,'') as nama_relasi, r.no_faktur, r.total \n"
                + "from ar_receipt r\n"
                + "inner join ar_receipt_detail d on d.id_receipt=r.id\n"
                + "left join acc_coa coa on coa.acc_no=r.deposit_to\n"
                + "left join m_Relasi cust on cust.id=r.id_Relasi\n"
                + "where r.tanggal::date>='" + t1 + "'::date\n"
                + "and r.tanggal::date<='" + t2 + "'::date\n"
                + (idCabang == null ? "" : "and r.id_cabang=" + idCabang + " ")
                + "order by coalesce(r.deposit_to,'') ";
        return mr.mapList(query);
    }

    public Object lppPrint(Integer id) {
        String query = "select lpp.tanggal, lpp.no_faktur as no_lpp, coalesce(rc.deposit_to,'') as deposit_to, coalesce(coa.acc_name,'') as acc_name, rc.no_faktur, coalesce(r.nama,'') as nama_relasi, coalesce(ar.grand_total,0) as grand_total, \n"
                + "coalesce(tp.nama,'') as produk_Template\n"
                + "from ar_lpp lpp\n"
                + "inner join ar_receipt rc on rc.id_lpp=lpp.id\n"
                + "left join m_relasi r on rc.id_relasi=r.id\n"
                + "left join ar_receipt_detail rcd on rcd.id_receipt=rc.id\n"
                + "left join ar_invoice ar on ar.id=rcd.id_ar_invoice \n"
                + "left join m_produk_template tp on tp.kode=ar.kode_produk_Template\n"
                + "left join acc_coa coa on coa.acc_no=rc.deposit_to\n"
                + "where lpp.id=" + id + "\n"
                + "order by coalesce(rc.deposit_to,''), coalesce(r.nama,''), rc.no_faktur";
        return mr.mapList(query);
    }

    public Object rkpPrint(Integer tahun) {
        String query = "select nama_relasi, nama_item, bulan.bln as bulan, sum(coalesce(jml_tiket,0)) as jml_tiket, kode_produk,  nama_template,  nama_kategori, m_cabang.kode as nama_cabang\n"
                + "  from\n"
                + "  (select m_item.id, m_item.nama as nama_item, m_produk_template.kode as kode_produk, m_produk_template.nama as nama_template from\n"
                + "  public.m_item JOIN public.m_produk_template ON m_item.kode_produk_template = m_produk_template.kode \n"
                + "  where m_produk_template.kode = '001') item \n"
                + "  cross join  \n"
                + "  (select m_relasi.id, m_relasi.nama AS nama_relasi, m_kategori_pelanggan.nama as nama_kategori from public.m_relasi \n"
                + "  JOIN public.m_kategori_pelanggan ON coalesce(m_relasi.id_kategori_pelanggan,3) = m_kategori_pelanggan.id) relasi \n"
                + "  cross join \n"
                + "  (select generate_series(1,12) as bln) bulan \n"
                + "  cross JOIN public.m_cabang \n"
                + "  left join \n"
                + "  (select ar_invoice.id_relasi, ar_invoice.tanggal, extract('month' from ar_invoice.tanggal) as int_bulan, to_char(ar_invoice.tanggal,'month') as bulan, \n"
                + "  ar_invoice_detail.id_item, array_length(string_to_array(ar_invoice_detail.rute,'-'),1)-1 as jml_tiket, ar_invoice.id_cabang\n"
                + "  from public.ar_invoice_detail JOIN public.ar_invoice ON ar_invoice_detail.id_invoice = ar_invoice.id \n"
                + "  where \n"
                + "  extract('year' from ar_invoice.tanggal) =  " + tahun + " ) inv \n"
                + "  on inv.id_item = item.id AND inv.id_relasi = relasi.id AND m_cabang.id = inv.id_cabang AND inv.int_bulan = bulan.bln  \n"
                + "GROUP BY \n"
                + "   nama_relasi, nama_item, bulan.bln, kode_produk, nama_template, nama_kategori, m_cabang.kode\n"
                + "ORDER BY \n"
                + "   bulan.bln, nama_item, nama_template, m_cabang.kode";
        return mr.mapList(query);
    }

    public Object agingPiutang(String tgl) {
        String query = "SELECT id_pel, nama_pel, urut, sum(case when sisa_hari <= 0 then jml_sisa else 0 end) as _0hari,\n"
                + "	sum(case when sisa_hari between 1 and 7 then jml_sisa else 0 end) as _let7hari,\n"
                + "	sum(case when sisa_hari between 8 and 14 then jml_sisa else 0 end) as _let14hari,\n"
                + "	sum(case when sisa_hari between 15 and 30 then jml_sisa else 0 end) as _let30hari,\n"
                + "	sum(case when sisa_hari > 30 then jml_sisa else 0 end) as _gt30hari from (\n"
                + "	SELECT distinct\n"
                + "	  ar_tagihan.tgl_jt_tempo, \n"
                + "	  now()::date - ar_tagihan.tgl_jt_tempo  as sisa_hari,\n"
                + "	  coalesce(ar_invoice.total,0) as jml_tagihan, \n"
                + "	  coalesce(byr.jml_terbayar,0), \n"
                + "	  coalesce(ar_invoice.total,0) - coalesce(byr.jml_terbayar,0) as jml_sisa, \n"
                + "	  ar_invoice.id as id_invoice, \n"
                + "	  ar_invoice.id_relasi as id_pel, \n"
                + "	  m_relasi.nama as nama_pel,\n"
                + "	  coalesce(m_relasi.urut,1000) urut\n"
                + "	FROM \n"
                + "	  public.ar_tagihan \n"
                + "	  join public.ar_tagihan_detail ON ar_tagihan_detail.id_tagihan = ar_tagihan.id  \n"
                + "	  join public.ar_invoice ON ar_tagihan_detail.id_ar = ar_invoice.id \n"
                + "	  join public.m_relasi ON ar_invoice.id_relasi = m_relasi.id \n"
                + "	  left join \n"
                + "	  (\n"
                + "		select id_ar_invoice, sum(ar_receipt_detail.amount) as jml_terbayar \n"
                + "		from public.ar_receipt_detail group by id_ar_invoice\n"
                + "	  ) byr ON byr.id_ar_invoice = ar_invoice.id \n"
                + "\n"
                + "	WHERE \n"
                + "	  coalesce(ar_invoice.total,0) - coalesce(byr.jml_terbayar,0) > 0\n"
                + ") aging \n"
                + "\n"
                + "GROUP BY id_pel, nama_pel, urut\n"
                + "ORDER BY urut, nama_pel";
        return mr.mapList(query);
    }

    public Object jurnalPrint(Integer id) {
        return mr.mapList("select * from fn_acc_jurnal_print(" + id + ") as (periode text, nomor varchar, tgl_cetak timestamp with time zone, urut integer,\n"
                + "acc_no varchar, kode_sub_rek varchar, uraian text, dk varchar, debet numeric, kredit numeric)");
    }

    public Object bukuJurnal(String tahun, String bulan, String tanggal1, String tanggal2, String kdJenis) {
        return mr.mapList("select * from fn_acc_rpt_buku_jurnal('" + tahun + "', '" + bulan + "', '" + tanggal1 + "', '" + tanggal2 + "', '" + kdJenis + "') "
                + "as (id integer, nomor varchar, tanggal date, keterangan text, urut integer, acc_no varchar, kode_sub_rek varchar, \n"
                + "dk varchar, uraian text, debet numeric, kredit numeric)");
    }

    public Object bukuBesar(String tahun, String bulan, String noRek1, String noRek2) {
        return mr.mapList("select * from fn_acc_rpt_bb('" + bulan + "', '" + tahun + "', '" + noRek1 + "', '" + noRek2 + "') as (acc_no varchar, acc_name varchar,\n"
                + "saldo_aw numeric, tanggal date, nomor varchar, urut integer, kode_sub_rek varchar, no_bukti varchar, uraian text, debet numeric, kredit numeric)");
    }

    public Object NeracaLajur(String tahun, String bulan) {
        return mr.mapList("select * from fn_acc_rpt_neraca_lajur('" + bulan + "', '" + tahun + "') as (type_id varchar, type_name varchar, group2 text, acc_no varchar, \n"
                + "acc_name varchar, sd numeric, sk numeric, mutasi_d numeric, mutasi_k numeric, akhir_d numeric, akhir_k numeric)");
    }

    public Object LabaRugi(String tahun, String bulan, String cabang) {
        return mr.mapList("select * from fn_acc_rpt_laba_rugi('" + bulan + "', '" + tahun + "', " + cabang + ") as (group2 varchar, group1 varchar, group1foot varchar, type_id varchar, type_name varchar, \n"
                + "lalu numeric, ini numeric, akhir numeric)");
    }

    public Object neraca(String tahun, String bulan, String cabang) {
        return mr.mapList("select * from fn_acc_rpt_neraca('" + bulan + "', '" + tahun + "', " + cabang + ") as (group2 text, group1 varchar, group1foot varchar, type_id varchar, type_name varchar, \n"
                + "lalu numeric, ini numeric, akhir numeric)");
    }

    public Object tahunArInv() {
        return mr.mapList("SELECT DISTINCT extract('year' from ar_invoice.tanggal) as tahun FROM public.ar_invoice ORDER BY extract('year' from ar_invoice.tanggal) desc;");
    }
}
