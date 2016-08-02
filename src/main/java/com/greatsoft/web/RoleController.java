package com.greatsoft.web;


import com.greatsoft.dao.jdbc.SystemDaoJdbc;
import com.greatsoft.domain.Menu;
import com.greatsoft.domain.Permission;
import com.greatsoft.domain.Role;
import com.greatsoft.domain.User;
import com.greatsoft.service.AppService;
import com.greatsoft.service.ConfigService;
import java.net.URI;
import java.security.InvalidParameterException;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriTemplate;

@Controller
@RestController
@RequestMapping("/role")
public class RoleController {
    
    @Autowired
    private ConfigService configService;
    
    @Autowired
    private SystemDaoJdbc systemDaoJdbc;
    
    @Autowired
    private AppService appService;
    
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    
    @RequestMapping("/{id}")
    @ResponseBody
    public Role cariBerdasarkanId(@PathVariable("id") String id) {
        Role x = configService.findRoleById(id);
        if (x == null) {
            throw new IllegalStateException();
        }
        return x;
    }

    @RequestMapping("/{id}/unselected-permission")
    @ResponseBody
    public List<Permission> cariPermissionTidakAdaDalamRole(@PathVariable String id) {
        return configService.findPermissionsNotInRole(configService.findRoleById(id));
    }

    @RequestMapping("/{id}/unselected-menu")
    @ResponseBody
    public List<Menu> cariMenuTidakAdaDalamRole(@PathVariable String id) {
        return configService.findMenuNotInRole(configService.findRoleById(id));
    }
    
    @RequestMapping("/role-cek/{m}")
    @ResponseBody
    public ModelMap cekRole(@PathVariable String m) {
        User u = appService.getCurrentUser();
        Boolean b=systemDaoJdbc.cekMenuAuth(u.getId(), m).size() > 0;
        return new ModelMap().addAttribute("status", b);
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void buat(@RequestBody @Valid Role x, HttpServletRequest request, HttpServletResponse response) {
        configService.save(x);
        String requestUrl = request.getRequestURL().toString();
        URI uri = new UriTemplate("{requestUrl}/{id}").expand(requestUrl, x.getId());
        response.setHeader("Location", uri.toASCIIString());
    }
    
//    @RequestMapping(method = RequestMethod.PUT, value = "/update/{id}")
//    @ResponseStatus(HttpStatus.OK)
//    public void perbarui(@PathVariable String id, @RequestBody Role x) {
//        Role a = configService.findRoleById(id);
//        if (a == null) {
//            logger.warn("Role dengan id [{}] tidak ditemukan", id);
//            throw new IllegalStateException();
//        }
//        x.setId(a.getId());
//        configService.save(x);
//    }
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
//    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public void perbarui(@PathVariable String id, @RequestBody Role x) {
        Role r = configService.findRoleById(id);
        if (r == null) {
            throw new InvalidParameterException("Role dengan id '" + x.getId() + "' tidak ditemukan!");
        }
        x.setId(r.getId());
        configService.save(x);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void hapus(@PathVariable String id) {
        Role a = configService.findRoleById(id);
        if (a == null) {
            logger.warn("Role dengan id [{}] tidak ditemukan", id);
            throw new IllegalStateException();
        }
        configService.delete(a);
    }

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public List<Role> cariSemua(
            Pageable pageable,
            HttpServletResponse response) {
        List<Role> hasil = configService.findAllRoles(pageable).getContent();
        for (Role r : hasil) {
            r.setPermissionSet(null);
            r.setMenuSet(null);
        }
        return hasil;

    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler({IllegalStateException.class})
    public void handle() {
        logger.debug("Resource dengan URI tersebut tidak ditemukan");
    }
}
