/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.greatsoft.web;

import com.greatsoft.dao.AgamaDao;
import com.greatsoft.domain.Agama;
import com.greatsoft.domain.User;
import com.greatsoft.service.AppService;
import java.security.InvalidParameterException;
import java.util.Date;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author faheem
 */
@RestController
@RequestMapping("/api/master/agama")
public class AgamaController {
    @Autowired
    AgamaDao dao;
    @Autowired
    AppService appService;
    
    private final Logger logger = LoggerFactory.getLogger(AgamaController.class);

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public Iterable<Agama> cariSemua() {
        return dao.findAll();
    }

    @RequestMapping(method = RequestMethod.GET)
    public Page<Agama> saringSemua(
            @RequestParam(required = false) String search,
            Pageable pageable,
            HttpServletResponse respons) {
        PageRequest pr = new PageRequest(pageable.getPageNumber(), pageable.getPageSize(),
                Sort.Direction.ASC, "nama");
        return dao.findAll(pr);
    }

    @RequestMapping(value = "{column}/{value}", method = RequestMethod.GET)
    public Agama cariSatu(@PathVariable String column, @PathVariable String value) {
        if (column.equalsIgnoreCase("kode")) {
            return dao.findOne(value);
        } else if (column.equalsIgnoreCase("nama")) {
            return dao.findByNama(value);
        } else {
            throw new InvalidParameterException("column '" + column + "' not available");
        }
    }

    @RequestMapping(value = "/{nama}", method = RequestMethod.GET)
    @ResponseBody
    public Page<Agama> cariBerdasarkanNama(@PathVariable("nama") String nama,
            Pageable pageable,
            HttpServletResponse response) {
        PageRequest pr = new PageRequest(pageable.getPageNumber(), pageable.getPageSize(),
                Sort.Direction.ASC, "nama");
        return dao.filter("%" + nama.toUpperCase() + "%", pr);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void hapus(@PathVariable String id) {
        Agama x = dao.findOne(id);
        if (x == null) {
            throw new InvalidParameterException("Cabang '" + id + "' tidak ditemukan!");
        }
        dao.delete(x);
    }

    @RequestMapping(method = RequestMethod.POST)
    public void simpan(@RequestBody Agama x) {
        User u=appService.getCurrentUser();
        dao.save(x);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public void perbarui(@PathVariable String id, @RequestBody Agama x) {
        Agama r = dao.findOne(id);
        if (r == null) {
            throw new InvalidParameterException("Agama dengan nama '" + x.getNama() + "' tidak ditemukan!");
        }
        x.setKode(r.getKode());
        dao.save(x);
    }

    @RequestMapping(value = "/count", method = RequestMethod.GET)
    public Long countAll() {
        return dao.count();
    }
    
}
