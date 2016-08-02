/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.greatsoft.dao;

import com.greatsoft.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author cak-ust
 */
public interface UserDao extends PagingAndSortingRepository<User, String>{
    public User findByUsername(String username);

    @Query("from User u where upper(u.username) like upper(:search) or upper(u.fullname) like upper(:search) ")
    public Page<User> filter(@Param("search") String search, Pageable p);
    
}
