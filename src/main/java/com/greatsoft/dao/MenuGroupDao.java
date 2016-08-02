/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.greatsoft.dao;

import com.greatsoft.domain.MenuGroup;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 *
 * @author cak-ust
 */
public interface MenuGroupDao extends PagingAndSortingRepository<MenuGroup, String>{

    public MenuGroup findByName(String value);
    
}
