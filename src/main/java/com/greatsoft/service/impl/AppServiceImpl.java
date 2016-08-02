/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.greatsoft.service.impl;

import com.greatsoft.dao.UserDao;
import com.greatsoft.dao.jdbc.MapResultSet;
import com.greatsoft.dao.jdbc.ReportDao;
import com.greatsoft.domain.User;
import com.greatsoft.service.AppService;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;

/**
 *
 * @author faheem
 */
@Service("appService")
@Transactional
public class AppServiceImpl implements AppService {

    @Autowired
    UserDao userDao;

    @Autowired
    DataSource dataSource;

    @Autowired
    MapResultSet mapResultSet;

    @Autowired
    ReportDao reportDao;

    public User getCurrentUser() {
        User hasil = null;

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            Object principal = auth.getPrincipal();
            if (principal != null && org.springframework.security.core.userdetails.User.class.isAssignableFrom(principal.getClass())) {
                org.springframework.security.core.userdetails.User u = (org.springframework.security.core.userdetails.User) principal;

                com.greatsoft.domain.User ux = userDao.findByUsername(u.getUsername());
                if (ux != null || ux.getRole() != null || ux.getRole().getName() != null) {
                    hasil = ux;
                } else {
                    hasil = null;
                }
            }
        }
        return hasil;
    }

    @Override
    public String getSessionId() {
        return RequestContextHolder.currentRequestAttributes().getSessionId();
    }


}
