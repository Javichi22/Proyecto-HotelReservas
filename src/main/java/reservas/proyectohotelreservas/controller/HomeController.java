package reservas.proyectohotelreservas.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5174")
public class HomeController {

    @GetMapping("/randomuser")
    public Map<String, Object> getRandomUser() {
        String apiUrl = "https://randomuser.me/api/";
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(apiUrl, Map.class);
    }
}