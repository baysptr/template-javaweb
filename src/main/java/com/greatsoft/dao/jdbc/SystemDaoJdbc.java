/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.greatsoft.dao.jdbc;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author faheem
 */
@Repository
public class SystemDaoJdbc {
    @Autowired
    MapResultSet mr;
    
    public Object listMenuByGroup(String idGroup){
        return mr.mapList("select menu_action, label from c_security_menu  where id_group  ='"+idGroup+"'\n" +
                          "order by menu_order");
        
    }
    public List<Map<String, Object>> listMenuGroupByUsername(String username){
        String query="select distinct m.id_group, mg.name, mg.urut\n" +
                    "from c_security_user u \n" +
                    "left join c_security_role r on r.id=u.id_role\n" +
                    "left join c_security_role_menu rm on rm.id_role=r.id\n" +
                    "left join c_security_menu m on m.id=rm.id_menu\n" +
                    "left join c_security_menu_group mg on mg.id=m.id_group\n" +
                    "where u.username='"+username+"'\n" +
                    "order by mg.urut";
        
        return mr.mapList(query);
        
    }
    public Object listMenuGroupByUsername(String username, String idGroup){
        String query="select distinct m.id, m.label, m.menu_action, m.menu_order\n" +
                    "from c_security_user u \n" +
                    "left join c_security_role r on r.id=u.id_role\n" +
                    "left join c_security_role_menu rm on rm.id_role=r.id\n" +
                    "left join c_security_menu m on m.id=rm.id_menu\n" +
                    "left join c_security_menu_group mg on mg.id=m.id_group\n" +
                    "where u.username='"+username+"'\n" +
                    "and m.id_group='"+idGroup+"'\n" +
                    "order by m.menu_order";
        return mr.mapList(query);
        
    }
    
    public List<Map<String, Object>> cekMenuAuth(String userid, String role){
        String query="select rp.* from c_security_role_permission rp\n" +
                    "inner join c_security_permission p on p.id=rp.id_permission\n" +
                    "inner join c_security_role r on r.id=rp.id_role\n" +
                    "inner join c_security_user u on u.id_role=r.id\n" +
                    "where p.permission_value='"+role+"'\n" +
                    "and u.id='"+userid+"'";
        return mr.mapList(query);
        
    }
}
