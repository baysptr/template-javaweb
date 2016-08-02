package com.greatsoft.web;


import com.greatsoft.dao.MenuGroupDao;
import com.greatsoft.dao.jdbc.SystemDaoJdbc;
import com.greatsoft.domain.MenuGroup;
import com.greatsoft.domain.User;
import com.greatsoft.service.AppService;
import java.security.InvalidParameterException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ustadho
 */
@RestController
@Transactional
@RequestMapping("/menu-group")
public class MenuGroupController {

    @Autowired
    MenuGroupDao dao;

    @Autowired
    SystemDaoJdbc systemDaoJdbc;

    @Autowired
    AppService appService;

    private final Logger logger = LoggerFactory.getLogger(MenuGroupController.class);

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public Iterable<MenuGroup> cariSemua() {
        return dao.findAll();
    }

    @RequestMapping(method = RequestMethod.GET)
    public Page<MenuGroup> saringSemua(
            @RequestParam(required = false) String search,
            Pageable pageable,
            HttpServletResponse respons) {
        PageRequest pr = new PageRequest(pageable.getPageNumber(), pageable.getPageSize(),
                Sort.Direction.ASC, "nama");
        return dao.findAll(pr);
    }

    @RequestMapping(value = "{column}/{value}", method = RequestMethod.GET)
    public MenuGroup cariSatu(@PathVariable String column, @PathVariable String value) {
        if (column.equalsIgnoreCase("id")) {
            return dao.findOne(value);
        } else if (column.equalsIgnoreCase("nama")) {
            return dao.findByName(value);
        } else {
            throw new InvalidParameterException("column '" + column + "' not available");
        }
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void hapus(@PathVariable String id) {
        MenuGroup x = dao.findOne(id);
        if (x == null) {
            throw new InvalidParameterException("Menu Group '" + id + "' tidak ditemukan!");
        }
        dao.delete(x);
    }

    @RequestMapping(method = RequestMethod.POST)
    public void simpan(@RequestBody MenuGroup x) {
        dao.save(x);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public void perbarui(@PathVariable String id, @RequestBody MenuGroup x) {
        MenuGroup r = dao.findOne(id);
        if (r == null) {
            throw new InvalidParameterException("MenuGroup dengan nama '" + x.getName() + "' tidak ditemukan!");
        }
        x.setId(r.getId());
        dao.save(x);
    }

    @RequestMapping(value = "/count", method = RequestMethod.GET)
    public Long countAll() {
        return dao.count();
    }

    @RequestMapping(value = "/mg-by-current-user", method = RequestMethod.GET)
    public Object listMenuGroupByCurrentUser() {
        List<ModelMap> mm = new ArrayList<ModelMap>();
        User u = appService.getCurrentUser();

        List<Map<String, Object>> mg = systemDaoJdbc.listMenuGroupByUsername(u.getUsername());
        for (Map<String, Object> x : mg) {
            ModelMap m = new ModelMap();
            m.addAttribute("grup", x);
            m.addAttribute("menu", systemDaoJdbc.listMenuGroupByUsername(u.getUsername(), x.get("id_group").toString()));

            mm.add(m);
        }
        return mm;
    }

    @RequestMapping(value = "/mn-by-group-user/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Object listMenuByGroup(@PathVariable("id") String id) {
        User u = appService.getCurrentUser();
        return systemDaoJdbc.listMenuGroupByUsername(u.getUsername(), id);
    }

}
