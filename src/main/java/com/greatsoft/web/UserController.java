package com.greatsoft.web;

import com.greatsoft.app.HashCode;
import com.greatsoft.dao.RoleDao;
import com.greatsoft.dao.UserDao;
import com.greatsoft.dao.jdbc.MenuDaoJdbc;
import com.greatsoft.domain.User;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriTemplate;

@Controller
public class UserController {

    @Autowired
    private UserDao dao;

    @Autowired
    RoleDao roleDao;

    @Autowired
    MenuDaoJdbc menuDaoJdbc;

    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private final List<String> FILE_EXTENSION = Arrays.asList("png", "jpg", "jpeg");
    private final String SESSION_KEY_IMAGE = "sessionKeyPathImage";

    @RequestMapping("/user/{id}")
    @ResponseBody
    public User cariBerdasarkanId(@PathVariable String id) {
        User x = dao.findOne(id);
        if (x == null) {
            throw new IllegalStateException();
        }
        fixLie(x);
        return x;
    }

    @RequestMapping("/user-menu/{id}")
    @ResponseBody
    public User cariMenuBerdasarkanId(@PathVariable String id) {
        User x = dao.findOne(id);
        if (x == null) {
            throw new IllegalStateException();
        }
        fixLie(x);
        x.getRole().setMenuSet(roleDao.findMenuSetRole(x.getRole().getId()));
        return x;
    }

    @RequestMapping(value = "/user/photo", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Map<String, Object> unggah(@RequestParam(value = "photo", required = true) MultipartFile multipartFile,
            HttpServletRequest request, HttpSession session) {
        Map<String, Object> result = new HashMap();

        if (multipartFile.isEmpty() || multipartFile == null) {
            result.put("msg", "No file uploaded");
            result.put("status", "400");
        } else {
            String extension = tokenizer(multipartFile.getOriginalFilename(), ".");
            if (FILE_EXTENSION.contains(extension.toLowerCase())) {
                try {
                    String filename = multipartFile.getOriginalFilename();
                    String targetFile = File.separator + "tmp" + File.separator + filename;
                    multipartFile.transferTo(new File(targetFile));
                    session.setAttribute(SESSION_KEY_IMAGE, targetFile);
                    result.put("msg", "Upload Succeded");
                    result.put("status", "200");
                } catch (IOException ex) {
                    result.put("msg", ex.getMessage());
                    result.put("status", "500");
                } catch (IllegalStateException ex) {
                    result.put("msg", ex.getMessage());
                    result.put("status", "500");
                }
            } else {
                result.put("msg", "File extensions not permitted");
                result.put("status", "400");
            }
        }
        return result;
    }

    @RequestMapping(value = "/user", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void buat(@RequestBody @Valid User x, HttpServletRequest request, HttpServletResponse response, HttpSession session) {
        String defaultPhoto = "img/user/no_photo.jpg";
        // ganti ke img/user/pic_endy.png
        x.setPhoto(defaultPhoto);
        x.setPassword(new HashCode().getHashPassword(x.getPassword()));
        dao.save(x);
        String requestUrl = request.getRequestURL().toString();
        URI uri = new UriTemplate("{requestUrl}/{id}").expand(requestUrl, x.getId());
        response.setHeader("Location", uri.toASCIIString());
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/user/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void perbarui(@PathVariable String id, @RequestBody @Valid User x, HttpServletRequest request, HttpSession session) {
        User a = dao.findOne(id);
        if (a == null) {
            logger.warn("User dengan id [{}] tidak ditemukan", id);
            throw new IllegalStateException();
        }
        x.setId(a.getId());
        x.setPassword(new HashCode().getHashPassword(x.getPassword()));
        String defaultPhoto = "img/user/no_photo.jpg";
        x.setPhoto(defaultPhoto);
        dao.save(x);
        session.removeAttribute(SESSION_KEY_IMAGE);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/user/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void hapus(@PathVariable String id) {
        User a = dao.findOne(id);
        if (a == null) {
            logger.warn("User dengan id [{}] tidak ditemukan", id);
            throw new IllegalStateException();
        }
        dao.delete(a);
    }

    @RequestMapping("/user/cek-pwd/{user}/{password}")
    @ResponseBody
    public Boolean cekPassword(@PathVariable("user") String user, @PathVariable String password) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        Boolean valid = false;
        User u = dao.findByUsername(user);
        if (u != null) {
            valid = passwordEncoder.matches(password, u.getPassword());
        }
        return valid;
    }

    @RequestMapping(value = "/user/ch-pass/{user}/{password}", method = RequestMethod.PUT)
    public void chPassword(@PathVariable("user") String user, @PathVariable String password) {
        User u = dao.findByUsername(user);
        u.setPassword(new HashCode().getHashPassword(password));
        dao.save(u);
    }

    @RequestMapping(value = "/user/filter", method = RequestMethod.GET)
    @ResponseBody
    public Page<User> cariSemua(Pageable pageable,
            HttpServletResponse respons) {
        PageRequest pr = new PageRequest(pageable.getPageNumber(), pageable.getPageSize(),
                Sort.Direction.ASC, "username");
        Page<User> hasil = dao.findAll(pr);
        for (User u : hasil) {
            fixLie(u);
        }
        return hasil;
    }

    @RequestMapping(value = "/user/filter/{search}", method = RequestMethod.GET)
    @ResponseBody
    public Page<User> cariBerdasarkanNama(@PathVariable("search") String search,
            Pageable pageable,
            HttpServletResponse response) {
        PageRequest pr = new PageRequest(pageable.getPageNumber(), pageable.getPageSize(),
                Sort.Direction.ASC, "username");
        logger.warn("filter [{}]", search);
        Page<User> hasil = dao.filter("%" + search.toUpperCase() + "%", pr);
        for (User u : hasil) {
            fixLie(u);
        }
        return hasil;
    }

    @RequestMapping(value = "/user/menu-access/{idUser}", method = RequestMethod.GET)
    @ResponseBody
    public Object daftarMenu(@PathVariable("idUser") String idUser,
            HttpServletResponse response) {
        Object hasil = menuDaoJdbc.daftarMenu(idUser);
        return hasil;
    }

//    @RequestMapping(value = "/user/sub-menu-access/{idParent}", method = RequestMethod.GET)
//    @ResponseBody
//    public Object subMenu(@PathVariable("idParent") String idParent,
//            HttpServletResponse response) {
//        Object hasil = menuDaoJdbc.subMenu(idParent);
//        return hasil;
//    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler({IllegalStateException.class})
    public void handle() {
        logger.debug("Resource dengan URI tersebut tidak ditemukan");
    }

    private void fixLie(User x) {
        x.getRole().setPermissionSet(null);
        x.getRole().setMenuSet(null);
    }

    private String tokenizer(String filename, String token) {
        StringTokenizer st = new StringTokenizer(filename, token);
        String result = "";
        while (st.hasMoreTokens()) {
            result = st.nextToken();
        }
        return result;
    }
}
