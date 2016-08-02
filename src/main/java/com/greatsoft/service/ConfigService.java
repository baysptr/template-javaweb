package com.greatsoft.service;

import com.greatsoft.domain.ApplicationConfig;
import com.greatsoft.domain.Menu;
import com.greatsoft.domain.Permission;
import com.greatsoft.domain.Role;
import com.greatsoft.domain.User;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ConfigService {
        // konfigurasi aplikasi
	void save(ApplicationConfig ac);
	void delete(ApplicationConfig ac);
	ApplicationConfig findApplicationConfigById(String id);
        Page<ApplicationConfig> findAllApplicationConfigs(Pageable pageable);
	Long countAllApplicationConfigs();
	Long countApplicationConfigs(String search);
	Page<ApplicationConfig> findApplicationConfigs(String search, Pageable pageable);

        // menu
        void save(Menu m);
        void delete(Menu m);
        Menu findMenuById(String id);
        List<Menu> findTopLevelMenu();
        Page<Menu> findAllMenu(Pageable pageable);
        Long countAllMenu();
//        List<Menu> findMenuByParent(Menu m);
        List<Menu> findMenuNotInRole(Role r);
        public Page<Menu> filterAllMenu(String search, Pageable pageable);

        // permission
        void save(Permission m);
        void delete(Permission m);
        Permission findPermissionById(String id);
        Page<Permission> findAllPermissions(Pageable pageable);
        Long countAllPermissions();
        List<Permission> findPermissionsNotInRole(Role r);
        
        // permission
//        void save(Relasi m);
//        void delete(Relasi m);
////        Relasi findSupplierById(String id);
//        @Query("from Relasi x where x.supplier = TRUE "
//            + "order by upper(x.nama)")
//        public Page<Relasi> findAllSupplier(Pageable pageable);
//        Long countAllSupplier();
//        List<Relasi> findSupplierNotInRole(Item r);

        // role
        void save(Role role);
        void delete(Role role);
        Role findRoleById(String id);
        Page<Role> findAllRoles(Pageable pageable);
        Long countAllRoles();

//        // item
//        void save(Item item);
//        void delete(Item item);
//        Item findItemById(String id);
//        Page<Item> findAllItems(Pageable pageable);
//        Long countAllItems();

        // user
        void save(User m);
        void delete(User m);
        User findUserById(String id);
        User findUserByUsername(String username);
        Page<User> findAllUsers(Pageable pageable);
        Long countAllUsers();


}
