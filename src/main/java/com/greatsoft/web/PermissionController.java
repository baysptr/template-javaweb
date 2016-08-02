package com.greatsoft.web;


import com.greatsoft.domain.Permission;
import com.greatsoft.service.ConfigService;
import java.net.URI;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.util.UriTemplate;

@Controller
public class PermissionController {
    
    @Autowired
    private ConfigService configService;
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @RequestMapping("/permission/{id}")
    @ResponseBody
    public Permission cariBerdasarkanId(@PathVariable String id) {
        Permission x = configService.findPermissionById(id);
        if (x == null) {
            throw new IllegalStateException();
        }
        return x;
    }

    @RequestMapping(value = "/permission", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void buat(@RequestBody @Valid Permission x, HttpServletRequest request, HttpServletResponse response) {
        configService.save(x);
        String requestUrl = request.getRequestURL().toString();
        URI uri = new UriTemplate("{requestUrl}/{id}").expand(requestUrl, x.getId());
        response.setHeader("Location", uri.toASCIIString());
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/permission/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void perbarui(@PathVariable String id, @RequestBody @Valid Permission x) {
        Permission a = configService.findPermissionById(id);
        if (a == null) {
            logger.warn("Permission dengan id [{}] tidak ditemukan", id);
            throw new IllegalStateException();
        }
        x.setId(a.getId());
        configService.save(x);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/permission/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void hapus(@PathVariable String id) {
        Permission a = configService.findPermissionById(id);
        if (a == null) {
            logger.warn("Permission dengan id [{}] tidak ditemukan", id);
            throw new IllegalStateException();
        }
        configService.delete(a);
    }

    @RequestMapping(value = "/permission", method = RequestMethod.GET)
    @ResponseBody
    public Page<Permission> cariSemua(
            Pageable pageable,
            HttpServletResponse response) {

        return configService.findAllPermissions(pageable);

    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler({IllegalStateException.class})
    public void handle() {
        logger.debug("Resource dengan URI tersebut tidak ditemukan");
    }
}
