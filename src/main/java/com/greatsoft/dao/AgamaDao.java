/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.greatsoft.dao;

import com.greatsoft.domain.Agama;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 *
 * @author faheem
 */
public interface AgamaDao extends PagingAndSortingRepository<Agama, String>{

    public Agama findByNama(String value);

    @Query("from Agama a where nama like '%:search%' or kode=:search")
    public Page<Agama> filter(String search, Pageable pageable);
    
}
